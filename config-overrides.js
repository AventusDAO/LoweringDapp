const webpack = require("webpack");
const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const WebpackObfuscator = require('webpack-obfuscator');


module.exports = function override(config, env) {
    let overrideConfig = {
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
    if (env == "production") {
        overrideConfig = {
            ...overrideConfig,
            plugins:[
                ...overrideConfig.plugins,
                new WebpackObfuscator ({
                    rotateStringArray: true
                }, ['excluded_bundle_name.js'])
            ],
            module: {
                ...config.module,
            },
            devtool: false,
            optimization: {
                minimize: true,
                minimizer: [
                  // This is only used in production mode
                  new TerserPlugin({
                    terserOptions: {
                      parse: {
                        ecma: 8,
                      },
                      compress: {
                        ecma: 5,
                        warnings: false,
                        comparisons: false,
                        inline: 2,
                      },
                      mangle: {
                        safari10: true,
                      },
                      // Added for profiling in devtools
                      keep_classnames: false,
                      keep_fnames: false,
                      output: {
                        ecma: 5,
                        comments: false,
                        // Turned on because emoji and regex is not minified properly using default
                        // https://github.com/facebook/create-react-app/issues/2488
                        ascii_only: true,
                      },
                    },
                  }),
                  // This is only used in production mode
                  new CssMinimizerPlugin(),
                ],
              },
           
        }

        
        
        console.log("HELP !!!!!!!", overrideConfig.optimization)
        return overrideConfig;
    }
    return overrideConfig
};
