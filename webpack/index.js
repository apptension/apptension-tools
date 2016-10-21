import {when} from 'ramda';
import {isProd} from '../env';

export {default as addBabelSupport} from './addBabelSupport';

export {default as addCommonStaticFilesLoader} from './addCommonStaticFilesLoader';

export {default as addExtractedSassSupport} from './addExtractedSassSupport';

export {default as addExtractedVendorStylesSupport} from './addExtractedVendorStylesSupport';

export {default as addIndexTemplateLoader} from './addIndexTemplateLoader';

export {default as addInlineSassSupport} from './addInlineSassSupport';

export {default as addInlineVendorStylesSupport} from './addInlineVendorStylesSupport';

export {default as addJSONLoader} from './addJSONLoader';

export {default as addMainEntryPoint} from './addMainEntryPoint';

export {default as addVendorModulesAlias} from './addVendorModulesAlias';

export {default as addTypescriptSupport} from './addTypescriptSupport';

export {default as addUglifyJS} from './addUglifyJS';

export {default as configPostcss} from './configPostcss';

export createConfiguration from './createConfiguration';

export const defaultEvolutions = [
  when(isProd, addUglifyJS),
  addMainEntryPoint,
  addIndexTemplateLoader,
  addJSONLoader,
  addCommonStaticFilesLoader,
  configPostcss,
  addInlineVendorStylesSupport,
  addInlineSassSupport,
  addBabelSupport,
  addVendorModulesAlias
];
