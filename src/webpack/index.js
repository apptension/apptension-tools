import {isProd} from '../env';

export {default as addBabelSupport} from './addBabelSupport';

export {default as addCommonStaticFilesLoader} from './addCommonStaticFilesLoader';

export {default as addDevtool} from './addDevtool';

export {default as addEnvConfigScriptAlias} from './addEnvConfigScriptAlias';

export {default as addEslint} from './addEslint';

export {default as addExtractedSassSupport} from './addExtractedSassSupport';

export {default as addExtractedVendorStylesSupport} from './addExtractedVendorStylesSupport';

export {default as addHMRSupport} from './addHMRSupport';

export {default as addHTMLWebpackPlugin} from './addHTMLWebpackPlugin';

export {default as addIndexTemplateLoader} from './addIndexTemplateLoader';

export {default as addInlineSassSupport} from './addInlineSassSupport';

export {default as addInlineVendorStylesSupport} from './addInlineVendorStylesSupport';

export {default as addJSONLoader} from './addJSONLoader';

export {default as addLoader} from './addLoader';

export {default as addPlugin} from './addPlugin';

export {default as addMainEntryPoint} from './addMainEntryPoint';

export {default as addManifestPlugin} from './addManifestPlugin';

export {default as addSpritesmithSprite} from './addSpritesmithSprite';

export {default as addVendorModulesAlias} from './addVendorModulesAlias';

export {default as addTypescriptSupport} from './addTypescriptSupport';

export {default as addUglifyJS} from './addUglifyJS';

export {default as configOutputPath} from './configOutputPath';

export {default as configPostcss} from './configPostcss';

export {default as copyDirectory} from './copyDirectory';

export {default as defineAlias} from './defineAlias';

export {default as defineGlobalEnvConstants} from './defineGlobalEnvConstants';

export {default as createConfiguration} from './createConfiguration';

export {default as whenEnv} from './whenEnv';

export const createDefaultEvolutions = () => [
  copyDirectory('public'),
  addDevtool(),
  addEnvConfigScriptAlias,
  addHTMLWebpackPlugin(),
  addSpritesmithSprite({name: 'default'}),
  defineGlobalEnvConstants,
  whenEnv(isProd, addUglifyJS),
  configOutputPath(),
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
