import typescript from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

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
    typescript({tsconfig: './tsconfig.json', useTsconfigDeclarationDir: true}),
    resolve(),
    commonjs()
  ]
}
