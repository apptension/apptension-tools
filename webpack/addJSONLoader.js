import {evolve, append} from 'ramda';

export default () => evolve({
  module: {
    loaders: append({
      test: /\.json$/,
      loader: "json"
    })
  }
});
