import {assoc} from 'ramda';
import autoprefixer from 'autoprefixer';

export default () => assoc('postcss', () => [
  autoprefixer({
    browsers: ['last 2 versions', 'last 3 iOS versions', 'not ie <= 8']
  })
]);
