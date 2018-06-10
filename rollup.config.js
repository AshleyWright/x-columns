//@ts-ignore (No typings found)
import resolve from 'rollup-plugin-node-resolve';
//@ts-ignore (No typings found)
import typescript from 'rollup-plugin-typescript2';

let pkg = require('./package.json');

const config = {
  input: 'src/main.ts',
  output: [{
    file: pkg.main,
    format: 'umd',
    sourcemap: true,
    name: 'xColumns'
  }, {
    file: pkg.module,
    format: 'es',
    sourcemap: true
  }],
  plugins: [
    typescript(),
    resolve({
      browser: true
    })
  ]
};

export default config;