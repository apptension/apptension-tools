import applyEvolutions from './internal/applyEvolutions';
import initialize from './internal/initialize';

export default (...evolutions) => (env) => applyEvolutions(...evolutions, initialize)(env)({});
