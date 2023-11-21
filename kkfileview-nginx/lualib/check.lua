local resty_sha256 = require "resty.sha256"
local str = require "resty.string"

local secret = "7A2D9854-CFA8-9FA1-8B69-E00EEC936D17/5A7502EC-511D-3154-2EF5-CB40882FECD3"

local function generate_token()
    local current_time = os.time() + 3600
    local sha256 = resty_sha256:new()
    sha256:update(tostring(current_time) .. "-" .. secret)
    local digest = sha256:final()
    return tostring(current_time) .. "-" .. str.to_hex(digest)
end

local function validate_token(token)
    -- Split the token into timestamp and hash parts
    local separator_index = string.find(token, "-")
    if not separator_index then
        return false, "Invalid token format."
    end

    local token_timestamp = tonumber(string.sub(token, 1, separator_index - 1))
    local token_hash = string.sub(token, separator_index + 1)

    -- Check if the timestamp is valid (not expired)
    local current_time = os.time()
    if current_time > token_timestamp then
        return false, "Token expired."
    end

    -- Recreate the hash
    local sha256 = resty_sha256:new()
    sha256:update(tostring(token_timestamp) .. "-" .. secret)
    local digest = sha256:final()
    local calculated_hash = str.to_hex(digest)

    -- Compare the hashes
    if calculated_hash == token_hash then
        return true, "Token is valid."
    else
        return false, "Invalid token."
    end
end


local function extract_token_from_cookie(cookie)
    -- Assuming your token key in the cookie is 'token', adjust if different
    for pair in string.gmatch(cookie, "[^;]+") do
        local key, value = string.match(pair, "(%S+)=([%S ]+)")
        if key and key == "token" then
            return value
        end
    end
    return nil
end


local function set_token_in_cookie(token)
    -- Set expiration time for the cookie, e.g., 1 hour from now
    local expiry = os.time() + 3600

    -- Format the cookie string
    local cookie_str = string.format("token=%s; Expires=%s; Path=/; HttpOnly",
        token, os.date("!%a, %d-%b-%Y %H:%M:%S GMT", expiry))

    -- Set the cookie in the response header
    ngx.header["Set-Cookie"] = cookie_str
end



-- 获取当前请求路径
local uri = ngx.var.uri

-- 获取请求方法
local method = ngx.req.get_method()
if method ~= "GET" then
    ngx.status = 405
    ngx.exit(ngx.HTTP_METHOD_NOT_IMPLEMENTED)
    return
end

-- 获取请求参数
local args = ngx.req.get_uri_args()

if uri == '/onlinePreview' then
    local officePreviewType = args["officePreviewType"]
    if officePreviewType ~= nil and officePreviewType ~= "image" then
        ngx.status = 400
        ngx.exit(ngx.HTTP_BAD_REQUEST)
        return
    end

    local url = args["url"]

    if url == nil then
        ngx.status = 400
        ngx.exit(ngx.HTTP_BAD_REQUEST)
        return
    end

    local exp = args["exp"]

    if exp == nil then
        ngx.status = 400
        ngx.exit(ngx.HTTP_BAD_REQUEST)
        return
    end

    local sign = args["sign"]

    if sign == nil then
        ngx.status = 400
        ngx.exit(ngx.HTTP_BAD_REQUEST)
        return
    end


    -- 获取当前时间
    local current_time = os.time()

    -- 将exp转换为数字
    local exp_time = tonumber(exp)

    -- 判断是否过期
    if current_time > exp_time then
        ngx.status = 403
        ngx.exit(ngx.HTTP_FORBIDDEN)
        return
    end


    -- 获取签名

    local sha256 = resty_sha256:new()
    local combined = url .. exp .. secret
    sha256:update(combined)
    local digest = sha256:final()
    local sign_check = str.to_hex(digest)

    -- 判断签名是否正确

    if sign ~= sign_check then
        ngx.status = 403
        ngx.exit(ngx.HTTP_FORBIDDEN)
        return
    end

    -- Generate the token
    local token = generate_token()
    -- Set the token in the cookie
    set_token_in_cookie(token)

    return
end


if uri == "/picturesPreview" then
    ngx.status = 404
    ngx.exit(ngx.HTTP_NOT_FOUND)
    return
end

if uri == "/index" then
    ngx.status = 404
    ngx.exit(ngx.HTTP_NOT_FOUND)
    return
end

if uri == "/" then
    ngx.status = 404
    ngx.exit(ngx.HTTP_NOT_FOUND)
    return
end


-- 从Cookie中获取token

local cookie = ngx.var.http_cookie

if cookie == nil then
    ngx.status = 401
    ngx.exit(ngx.HTTP_UNAUTHORIZED)
    return
end

local token = extract_token_from_cookie(cookie)

if not token then
    ngx.status = 401
    ngx.exit(ngx.HTTP_UNAUTHORIZED)
    return
end

-- Validate the token
local is_valid, message = validate_token(token)
if not is_valid then
    ngx.status = 403
    ngx.exit(ngx.HTTP_FORBIDDEN)
    return
end
