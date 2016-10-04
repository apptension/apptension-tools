import {evolve, merge} from 'ramda';

export default ({paths}) => config => {
  const transformations = {
    resolve: {
      alias: (alias) => merge({
        vendor_modules: paths.vendorModules
      }, alias)
    }
  };
  return evolve(transformations, config);
};
