import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {dts} from "rollup-plugin-dts";

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/index.cjs',
      format: 'cjs'
    },
    {
      file: 'dist/index.esm.js',
      format: 'esm'
    },
  ],
  plugins: [
    json(),
    typescript({tsconfig: './tsconfig.json'}),
    resolve(),
    commonjs(),
    dts(), // This will generate .d.ts files
  ]
}
