import {evolve, assoc} from 'ramda';
import path from 'path';

export default ({paths, filePatterns}) => evolve({
  entry: assoc('main', [
    path.join(paths.app, filePatterns.mainScript)
  ])
});
