const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: [
    /*"../stories/!**!/!*.stories.mdx",
    "../stories/!**!/!*.stories.@(js|jsx|ts|tsx)",*/
    "../component/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials"
  ],
  webpackFinal: (config, { configType }) => {

    config.plugins.push(new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }));

    config.module.rules.push({
      test: /\.scss|css$/,
      use: [
        //"style-loader",
        MiniCssExtractPlugin.loader,
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: 'local',
              exportGlobals: true,
              localIdentName: '[name]__[local]__[hash:base64:5]'
            },
            sourceMap: true,
          },
        },
        { loader: "sass-loader", options: { sourceMap: true }},
      ],
      include: path.resolve(__dirname, '../'),
      exclude: /node_modules/
    });

    config.module.rules.push({
      test: /\.(ico|png|jpe?g|gif|svg)$/,
      loader: 'url-loader',
      options: {
        limit: 5000,
        fallback: {
          loader: 'file-loader',
          options: {
            name: '[name].[hash].[ext]',
            outputPath: './resource/img',
            publicPath: '/resource/img'
          }
        }
      }
    });

    config.module.rules.push({
      test: /\.(woff|woff2|ttf|eot)$/,
      loader: 'file-loader',
      options: {
        name: '[name].[ext]',
        outputPath: './resource/css/font',
        publicPath: '/resource/css/font'
      }
    });

    // Return the altered config
    return config;
  }
};