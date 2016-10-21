import {evolve, assoc} from 'ramda';

export default ({name, path}) => () => evolve({
  resolve: {
    alias: assoc(name, path)
  }
});
