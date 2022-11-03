const webpack = require("webpack");

module.exports = function override(config, env) {
    return {
        ...config,
        resolve: {
            ...config.resolve,
            extensions: [...config.resolve.extensions, ".ts", ".js", ".mjs"],
            fallback: {
                ...config.resolve.fallback,
                os: false,
                https: false,
                http: false,
                crypto: false,
                assert: false,
                url: false,
                stream: require.resolve("stream-browserify"),
                buffer: require.resolve("buffer"),
            },
        },
        plugins: [
            ...config.plugins,
            new webpack.ProvidePlugin({
                process: "process/browser",
                Buffer: ["buffer", "Buffer"],
            }),
        ],
        module: {
            ...config.module,
            rules: [
                ...(config.module.rules || []),
                {
                    test: /\.m?js$/,
                    enforce: "pre",
                    resolve: {
                        fullySpecified: false,
                    },
                    use: [
                        {
                            loader: "source-map-loader",
                            options: {
                                filterSourceMappingUrl: (url, resourcePath) => {
                                    if (
                                        /.*\/node_modules\/.*/.test(
                                            resourcePath
                                        )
                                    ) {
                                        return false;
                                    }
                                    return true;
                                },
                            },
                        },
                    ],
                },
            ],
        },
    };
};
