export type EnvName = 'development' | 'beta' | 'production' | 'preview'

interface BaseConfig {
  cdn?: string
  apiBaseUrl?: string
}

type Config = {
  [key in EnvName]?: BaseConfig
}

const config: Config = {
  // 开发环境配置
  development: {
    cdn: './',
    apiBaseUrl: 'http://localhost:5001',
  },
  // 测试环境配置
  beta: {
    cdn: './',
    apiBaseUrl: 'http://nestjs.cms.visionwu.top',
  },
  // 生产环境配置
  production: {
    cdn: './',
    apiBaseUrl: 'http://nestjs.cms.visionwu.top',
  },
  // 预览环境配置
  preview: {
    cdn: './',
    apiBaseUrl: 'http://nestjs.cms.visionwu.top',
  },
}

export default config
