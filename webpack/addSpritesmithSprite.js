import {evolve, append} from 'ramda';
import SpritesmithPlugin from 'webpack-spritesmith';
import path from 'path';

export default ({name}) => ({paths}) => evolve({
  plugins: append(new SpritesmithPlugin({
    retina: '-2x',
    src: {
      cwd: path.join(paths.sprites, name),
      glob: '*.png'
    },
    target: {
      image: path.join(paths.app, 'images', 'generated', `${name}-sprite.png`),
      css: path.join(paths.src, 'generated', `_${name}-sprites.scss`)
    },
    apiOptions: {
      cssImageRef: `~images/generated/${name}-sprite.png`
    },
    spritesmithOptions: {
      // default binary-tree algorithm has order issues
      algorithm: 'top-down',
      // fix problem with icons overlapping each other when using top-down algorithm
      padding: 1
    }
  }))
});
