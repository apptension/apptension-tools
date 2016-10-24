import {evolve, append} from 'ramda';

export default (loader) => () => evolve({
  module: {loaders: append(loader)}
});
