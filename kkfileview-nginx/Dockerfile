FROM --platform=linux/amd64 openresty/openresty:alpine

COPY lualib /usr/local/openresty/lualib
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf

RUN mkdir -p /data/upload
RUN rm -rf /usr/local/openresty/nginx/html/*

EXPOSE 80

CMD ["/usr/local/openresty/bin/openresty", "-g", "daemon off;"]

