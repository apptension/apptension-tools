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
    }
  }, config);
};
