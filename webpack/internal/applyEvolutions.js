import {compose} from 'ramda';
import createPaths from '../../general/createPaths';

export default function applyEvolutions(...evolutions) {
  return (env) => {
    const evolutionAPI = {env, ...createPaths(env)};
    const chain = evolutions.map(evolution => evolution(evolutionAPI));
    return compose(...chain);
  };
};
