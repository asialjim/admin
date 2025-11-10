/**
 * 环境配置文件
 * 根据不同环境提供对应的配置参数
 */

// 环境类型定义
export interface EnvConfig {
  baseUrl: string;
  // 可以根据需要添加其他环境相关配置
  apiPrefix?: string;
  timeout?: number;
  debug?: boolean;
}

// 不同环境的配置
const configs: Record<string, EnvConfig> = {
  // 开发环境
  development: {
    baseUrl: 'https://dev.gateway.api.asialjim.cn',
    apiPrefix: '/api',
    debug: true,
  },
  // 测试环境
  test: {
    baseUrl: 'https://test.gateway.api.asialjim.cn',
    apiPrefix: '/api',
    debug: true,
  },
  // 生产环境
  production: {
    baseUrl: 'https://prod.gateway.api.asialjim.cn',
    apiPrefix: '/api',
    debug: false,
  },
};

// 获取当前环境
// 在Nuxt环境中，使用process.env.NODE_ENV或import.meta.env.MODE
const getCurrentEnv = (): string => {
  // 优先使用import.meta.env.MODE (Vite/Nuxt 3)
  if (import.meta && import.meta.env && import.meta.env.MODE) {
    return import.meta.env.MODE;
  }
  // 其次使用process.env.NODE_ENV
  if (process && process.env && process.env.NODE_ENV) {
    return process.env.NODE_ENV;
  }
  // 默认开发环境
  return 'development';
};

// 获取当前环境配置
export const env = (): EnvConfig => {
  const currentEnv = getCurrentEnv();
  return configs[currentEnv] || configs.development;
};

// 导出当前环境的配置作为默认值
export default env();