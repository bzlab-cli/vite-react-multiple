import type { UserConfig, ConfigEnv } from 'vite'
import react from '@vitejs/plugin-react'
import fs from 'fs'
import path from 'path'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
// import { loadEnv } from 'vite'
import shell from 'shelljs'
import mpa from '@bzlab/bz-react-vite-mpa'
import { Vite } from './src/config/settings'

const dynamicProxy = require('./build/proxy/index.ts')
const resolve = (p: string) => path.resolve(__dirname, p)
const mpaOptions = {
  open: false,
  openFirstPage: '/',
  scanPub: 'public',
  scanDir: 'src/views',
  scanFile: 'main.{js,ts,jsx,tsx}',
  defaultEntries: '',
  defaultPage: 'admin',
  filename: 'index.html'
}

function mpaPlugin(mode) {
  return ({ pages, dest, options }) => {
    if (mode !== 'development') {
      Object.keys(pages).map(key => {
        shell.rm('-rf', resolve(`${dest}/${key}`))
        shell.mv(resolve(`${dest}/${options.scanPub}/${key}`), resolve(dest))
      })
      shell.rm('-rf', resolve(`${dest}/public`))
    }
  }
}

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
      sourcemap: false,
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
      eslintPlugin({
        cache: false
      }),
      mpa(mpaOptions, options => {
        mpaPlugin(mode)(options)
      }),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 102400,
        algorithm: 'gzip',
        ext: '.gz'
      }),
      createSvgIconsPlugin({
        iconDirs: [resolve('src/assets/svg')],
        symbolId: 'icon-[name]'
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
      port: Vite.port,
      open: false,
      https: false,
      cors: true,
      proxy: dynamicProxy.proxy
    }
  }
}
