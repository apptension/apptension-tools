import {evolve, merge} from 'ramda';

export default ({paths}) => evolve({
  resolve: {
    alias: merge({
      vendor_modules: paths.vendorModules
    })
  }
});
