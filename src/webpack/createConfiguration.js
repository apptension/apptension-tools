import applyEvolutions from './internal/applyEvolutions';
import initialize from './internal/initialize';

export default (...evolutions) => applyEvolutions(...evolutions, initialize)({});
