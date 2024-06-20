import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
// 引入vue自动导入
import AutoImport from 'unplugin-auto-import/vite'
// 引入组件
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    // 自动导入组件
    Components({
      // dirs 指定组件所在位置，默认为 src/components
      // 可以让我们使用自己定义组件的时候免去 import 的麻烦
      dirs: ['src/components/', 'src/layout/'],
      // 配置需要将哪些后缀类型的文件进行自动按需引入，'vue'为默认值
      extensions: ['vue'],
      // 解析组件，这里以 Element Plus 为例
      resolvers: [ElementPlusResolver()],
      // 生成components.d.ts
      dts: true,
      // 遍历子目录
      deep: true
    }),
    // 自动导入vue相关的Api
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        '@vueuse/core',
        /* 自定义 */
        {
          // onBeforeRouteLeave 'vue-router’的这个Api未被自动导入，在这里补充
          'vue-router': ['onBeforeRouteLeave'],
          'lodash/isUndefined': [['default', 'isUndefined']],
          /* 自定义模块 */
          api: [['default', 'api']],
          hooks: [['default', 'hooks']],
          store: [['default', 'store']]
        }
      ],
      // 生成auto-import.d.ts声明文件
      dts: 'src/auto-import.d.ts',
      // 解析Api
      resolvers: [ElementPlusResolver()]
    })
  ],

  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://api-hmzs.itheima.net/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
