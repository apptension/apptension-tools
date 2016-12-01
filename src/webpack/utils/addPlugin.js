import {evolve, append} from 'ramda';

export default (plugin) => () => evolve({
  plugins: append(plugin)
});
