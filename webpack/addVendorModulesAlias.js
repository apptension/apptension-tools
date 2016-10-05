import {evolve, assoc} from 'ramda';

export default ({paths}) => evolve({
  resolve: {
    alias: assoc('vendor_modules', paths.vendorModules)
  }
});
