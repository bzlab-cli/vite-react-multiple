import type { UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import { loadEnv } from 'vite'
const dynamicProxy = require('./build/proxy/index.ts')
const resolve = (p: string) => path.resolve(__dirname, p)

if (process.env.NODE_ENV == 'production') {
  fs.writeFileSync(path.join(__dirname, './public/version.json'), JSON.stringify({ version: `${Date.now()}` }))
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  // const env = loadEnv(mode, process.cwd());
  console.log('command', command, mode)

  return {
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    },
    build: {
      minify: 'terser',
      chunkSizeWarningLimit: 1500,
      terserOptions: {
        compress: {
          drop_console: true, //打包时删除console
          drop_debugger: true, //打包时删除 debugger
          pure_funcs: ['console.log']
        }
      },
      rollupOptions: {
        output: {
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    plugins: [
      react(),
      createSvgIconsPlugin({
        iconDirs: [resolve('./src/assets/icons')],
        symbolId: 'icon-[dir]-[name]'
      }),
      eslintPlugin({
        cache: false
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 102400,
        algorithm: 'gzip',
        ext: '.gz'
      })
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/mixins.scss";`
        }
      }
    },
    server: {
      host: '0.0.0.0',
      port: 8445,
      open: false,
      https: false,
      cors: true,
      proxy: dynamicProxy.proxy
    }
  }
}
