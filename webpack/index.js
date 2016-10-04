export {default as configure} from './configure';

const applyMiddleware = configure({
  resolve: {
    extensions: ['', '.js'],
    alias: {
      vendor_modules: pathsConfig.paths.vendorModules
    }
  },
});

export default (env, middleware) => applyMiddleware([
  ...middleware
])(env);
