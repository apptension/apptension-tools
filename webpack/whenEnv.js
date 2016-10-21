import {when, propSatisfies} from 'ramda';

export default (check, fn) => when(propSatisfies(check, 'env'), fn);
