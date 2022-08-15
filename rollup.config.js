import typescript from '@rollup/plugin-typescript';
export default {
  input: './src/index.ts',
  output: [
    {
      format: 'cjs',
      file: 'lib/custom-vue-cjs.js'
    },
    {
      format: 'es',
      file: 'lib/custom-vue-esm.js'
    }
  ],
  plugins: [typescript()]
}
