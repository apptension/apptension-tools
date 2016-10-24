import {ifElse, propSatisfies} from 'ramda';

import pass from './pass';

export default (check, fn) => ifElse(propSatisfies(check, 'env'), fn, pass);
