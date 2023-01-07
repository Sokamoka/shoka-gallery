import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src/index',
      name: 'index',
    },
  ],
  externals: ['vue'],
  declaration: true,

  rollup: {
    emitCJS: true,
  },
})
