import {evolve, append} from 'ramda';

export default () => evolve({
  module: {
    loaders: append({
      test: /\.ejs$/i,
      loader: 'underscore-template-loader',
      query: {
        parseDynamicRoutes: true,
        attributes: [
          'img:src',
          'link:href'
        ]
      }
    })
  }
});
