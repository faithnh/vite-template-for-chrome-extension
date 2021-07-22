import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import copy from 'rollup-plugin-copy'

const { resolve } = require('path')

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    // src上にあるts, tsxファイルを一つのjsにまとめて、dist配下へ配置
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/main/main.tsx'),
        background: resolve(__dirname, 'src/background/background.ts'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },

  plugins: [
    reactRefresh(),
    copy({
      verbose: true,
      hook: 'writeBundle',
      targets: [
        // publicファイル(アイコンなど) を dist/public へコピー
        {
          src: 'public/*',
          dest: 'dist/public'
        },
        // manifest.json を distへコピー
        {
          src: 'manifest.json',
          dest: 'dist',
        },
        // index.htmlなどchrome extensionで使用するhtmlファイルをdistへコピー
        {
          src: '*.html',
          dest: 'dist'
        }
      ],
    }),
  ]
})
