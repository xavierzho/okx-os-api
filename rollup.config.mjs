import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';
import {dts} from "rollup-plugin-dts";

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.cjs',
      format: 'cjs',
      sourcemap: true
    },
    external: ['axios'],
    plugins: [typescript({tsconfig: './tsconfig.json'}), commonjs(), resolve(), json()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es'
    },
    external: ['axios', 'node:crypto'],
    plugins: [typescript({tsconfig: './tsconfig.json'}), json()]
  }
]
