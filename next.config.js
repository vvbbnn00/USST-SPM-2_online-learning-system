/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "standalone",
    webpack: (config) => {
        config.resolve.alias.canvas = false;

        return config;
    },
}

module.exports = nextConfig
