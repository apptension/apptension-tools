export {default as addVendorModulesAlias} from './addVendorModulesAlias';
export {default as addBabelSupport} from './addBabelSupport';

export createConfiguration from './createConfiguration';

export const defaultEvolutions = [
  addBabelSupport,
  addVendorModulesAlias
];
