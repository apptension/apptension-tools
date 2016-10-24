import {evolve, append} from 'ramda';
import ManifestPlugin from 'webpack-manifest-plugin';

export default () => evolve({
  plugins: append(new ManifestPlugin({fileName: 'rev-manifest.json'}))
});
