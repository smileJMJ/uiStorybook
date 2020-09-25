const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
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
      include: path.resolve(__dirname, '../component'),
      exclude: /node_modules/
    });

    // Return the altered config
    return config;
  }
};