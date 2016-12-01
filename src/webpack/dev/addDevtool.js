import {assoc} from 'ramda';

export default (value = 'eval') => () => assoc('devtool', value);
