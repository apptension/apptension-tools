import {compose} from 'ramda';

export default function applyEvolutions(...evolutions) {
  return (env) => compose(...evolutions.map(evolution => evolution(env)));
}
