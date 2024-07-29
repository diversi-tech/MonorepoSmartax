const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../dist/api-gateway'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      assets: [{ input: './src/assets', glob: '**/*', output: './assets', noErrorOnMissing: true }],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
