import babel from '@rollup/plugin-babel';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  plugins: [babel()],
  external: ['@rollup/pluginutils', 'istanbul-lib-instrument'],
  output: [
    {
      format: 'cjs',
      file: pkg.main
    },
    {
      format: 'es',
      file: pkg.module
    }
  ]
};
