const path = require("path");

module.exports = (baseConfig, env, config) => {

  config.module.rules.push(
    {
      test: /\.(ts|tsx)$/,
      loader: [
        require.resolve("awesome-typescript-loader"),
        require.resolve("react-docgen-typescript-loader")
      ]
    },
  );

  config.resolve.extensions.push(".ts", ".tsx");

  config.resolve.alias = {
    ...baseConfig.resolve.alias,
    '@src': path.resolve(__dirname, '../src'),
  }

  return config;
};