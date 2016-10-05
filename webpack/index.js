export {default as addBabelSupport} from './addBabelSupport';

export {default as addCommonStaticFilesLoader} from './addCommonStaticFilesLoader';

export {default as addExtractedSassSupport} from './addExtractedSassSupport';

export {default as addExtractedVendorStylesSupport} from './addExtractedVendorStylesSupport';

export {default as addInlineSassSupport} from './addInlineSassSupport';

export {default as addInlineVendorStylesSupport} from './addInlineVendorStylesSupport';

export {default as addVendorModulesAlias} from './addVendorModulesAlias';

export {default as addTypescriptSupport} from './addTypescriptSupport';


export createConfiguration from './createConfiguration';

export const defaultEvolutions = [
  addInlineVendorStylesSupport,
  addInlineSassSupport,
  addCommonStaticFilesLoader,
  addBabelSupport,
  addVendorModulesAlias
];
