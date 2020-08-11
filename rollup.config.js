import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  plugins: [babel({ babelHelpers: 'bundled' })],
  external: ['@rollup/pluginutils', 'istanbul-lib-instrument'],
  output: [
    {
      format: 'cjs',
      file: pkg.main,
      exports: 'default'
    },
    {
      format: 'es',
      file: pkg.module
    }
  ]
};
