//@ts-ignore (No typings found)
import resolve from 'rollup-plugin-node-resolve';
//@ts-ignore (No typings found)
import typescript from 'rollup-plugin-typescript2';

const config = {
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
};

export default config;