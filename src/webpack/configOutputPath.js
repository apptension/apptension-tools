import {evolve, merge} from 'ramda';

export default ({paths, output}) => {
  return evolve({
    output: merge(merge({
      path: paths.dist,
      filename: '[name].js',
      publicPath: '/'
    }, output))
  });
};
