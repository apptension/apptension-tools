import {merge} from 'ramda';

export default (env) => (config) => {
  return merge({
    resolve: {
      extensions: ['', '.js'],
      alias: {}
    },
    plugins: [],
    module: {
      loaders: []
    },
    node: {
      __dirname: true,
      fs: "empty",
      net: "empty",
      tls: "empty",
      dns: "empty"
    },
    browser: {
      __dirname: true,
      fs: "empty",
      net: "empty",
      tls: "empty",
      dns: "empty"
    }
  }, config);
};
