import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    {
      input: './src/index',
      name: 'index',
    },
  ],
  declaration: true,

  rollup: {
    emitCJS: true,
  },
})
