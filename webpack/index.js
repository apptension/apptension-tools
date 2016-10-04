export {default as addVendorModulesAlias} from './addVendorModulesAlias';
export {default as addBabelSupport} from './addBabelSupport';
export {default as addCommonStaticFilesLoader} from './addCommonStaticFilesLoader';

export createConfiguration from './createConfiguration';

export const defaultEvolutions = [
  addCommonStaticFilesLoader,
  addBabelSupport,
  addVendorModulesAlias
];
