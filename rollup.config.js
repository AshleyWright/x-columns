import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript2';

export default {
  input: 'src/main.ts',
  output: [{
    file: 'dist/x-columns.cjs.js',
    format: 'cjs',
    sourcemap: true
  }, {
    file: 'dist/x-columns.es6.js',
    format: 'es',
    sourcemap: true
  }, {
    file: 'dist/x-columns.umd.js',
    format: 'umd',
    sourcemap: true,
    name: 'xColumns'
  }],
  plugins: [
    typescript(),
    resolve({
      browser: true
    })
  ]
}