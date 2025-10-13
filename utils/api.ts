import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import envConfig from './env'

// 环境配置中的基础URL
const { baseUrl } = envConfig
const X_USER_TOKEN = 'x-user-token'

const userToken = () => getCookie(X_USER_TOKEN) || ''

const combineUrl = (uri: string): string => {
  // 如果URI已经是完整的URL，直接返回
  if (uri.startsWith('http://') || uri.startsWith('https://')) {
    return uri
  }
  
  // 合并基础URL和URI，处理斜杠
  const base = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  const path = uri.startsWith('/') ? uri : `/${uri}`
  return `${base}${path}`
}

// 创建router实例用于路由跳转
const router = useRouter()

// 从cookie中获取token的辅助函数
export const getCookie = (name: string): string | null => {
  const cookieArr = document.cookie.split(';')
  for (let i = 0; i < cookieArr.length; i++) {
    const cookiePair = cookieArr[i].split('=')
    if (name === cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1])
    }
  }
  return null
}

// 设置cookie的辅助函数
export const setCookie = (name: string, value: string, days: number = 7): void => {
  const date = new Date()
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
  const expires = `expires=${date.toUTCString()}`
  document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`
}

// 清除cookie的辅助函数
export const clearCookie = (name: string): void => {
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`
}

// 请求拦截器
const requestInterceptor = (config: RequestInit, customHeaders?: Record<string, string>): RequestInit => {
  // 基础headers
  const headers: Record<string, string> = {
    ...(config.headers as Record<string, string> || {}),
    ...(customHeaders || {}),
  }
  
  // 只有当使用POST/PUT方法且未指定Content-Type时才设置默认值
  const method = (config.method || 'GET').toUpperCase();
  if (['POST', 'PUT'].includes(method) && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }
  
  // 添加认证token
  const token = userToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`
  }
  
  return {
    ...config,
    headers,
  }
}

// 响应拦截器
const responseInterceptor = async (response: Response): Promise<any> => {
  // 检查HTTP状态码
  if (!response.ok) {
    throw new Error(`HTTP错误! 状态码: ${response.status}`)
  }
  
  // 解析JSON响应
  try {
    const data = await response.json()
    
    // 检查业务状态码
    if (data.code !== undefined && data.code !== '0' && data.code !== 0) {
      const errorMsg = data.message || data.msg || '请求失败'
      ElMessage.error(errorMsg)
      throw new Error(errorMsg)
    }
    
    return data
  } catch (error) {
    if (error instanceof SyntaxError) {
      throw new Error('无效的响应格式')
    }
    throw error
  }
}

// 处理请求错误
const handleRequestError = (error: any): never => {
  // 处理网络错误
  if (!error.message) {
    ElMessage.error('网络错误，请检查网络连接')
    throw new Error('网络错误')
  }
  
  // 处理认证失败或过期
  if (error.message.includes('401') || error.message.includes('未授权')) {
    ElMessage.error('登录已过期，请重新登录')
    // 清除token
    clearCookie(X_USER_TOKEN)
    // 跳转到登录页
    router.push('/login')
    throw new Error('认证失败')
  }
  
  // 处理权限不足
  if (error.message.includes('403') || error.message.includes('禁止访问')) {
    ElMessage.error('没有权限执行此操作')
    throw new Error('权限不足')
  }
  
  // 其他错误保持原样抛出
  throw error
}

// 通用请求方法
export const request = async (uri: string, options: {
  queries?: Record<string, any>;
  headers?: Record<string, string>;
  data?: any;
  [key: string]: any;
} = {}): Promise<any> => {
  try {
    // 构建查询参数
    let queryString = '';
    if (options.queries) {
      const searchParams = new URLSearchParams();
      Object.keys(options.queries).forEach(key => {
        if (options.queries![key] !== undefined && options.queries![key] !== null) {
          searchParams.append(key, options.queries![key]);
        }
      });
      const paramsString = searchParams.toString();
      if (paramsString) {
        // 检查uri是否已经包含查询参数
        const separator = uri.includes('?') ? '&' : '?';
        queryString = `${separator}${paramsString}`;
      }
    }
    
    // 构建完整URL
    const url = combineUrl(uri) + queryString;
    
    // 构建请求配置
    const requestConfig: RequestInit = {
      credentials: 'include',
      ...options,
    };
    
    // 如果有data参数且是POST/PUT请求，设置请求体
    if (options.data && ['POST', 'PUT'].includes(requestConfig.method as string)) {
      // 智能处理不同类型的数据
      if (options.data instanceof FormData || 
          options.data instanceof URLSearchParams || 
          typeof options.data === 'string') {
        // 对于FormData、URLSearchParams或已序列化的字符串，直接使用
        requestConfig.body = options.data as BodyInit;
      } else {
        // 其他情况进行JSON序列化
        requestConfig.body = JSON.stringify(options.data);
      }
    }
    
    // 移除options中不属于RequestInit的属性
    delete (requestConfig as any).queries;
    delete (requestConfig as any).headers;
    delete (requestConfig as any).data;
    
    // 应用请求拦截器
    const config = requestInterceptor(requestConfig, options.headers);
    
    // 发送请求
    const response = await fetch(url, config);
    
    // 应用响应拦截器
    return await responseInterceptor(response);
  } catch (error) {
    // 处理请求错误
    return handleRequestError(error);
  }
}

// 封装GET请求
export const get = async (uri: string, queries?: Record<string, any>, headers?: Record<string, string>): Promise<any> => {
  return request(uri, {
    method: 'GET',
    queries,
    headers,
  })
}

// 封装POST请求
export const post = async (uri: string, data?: any, queries?: Record<string, any>, headers?: Record<string, string>): Promise<any> => {
  return request(uri, {
    method: 'POST',
    data,
    queries,
    headers,
  })
}

// 封装PUT请求
export const put = async (uri: string, data?: any, queries?: Record<string, any>, headers?: Record<string, string>): Promise<any> => {
  return request(uri, {
    method: 'PUT',
    data,
    queries,
    headers,
  })
}

// 封装DELETE请求
export const del = async (uri: string, queries?: Record<string, any>, headers?: Record<string, string>): Promise<any> => {
  return request(uri, {
    method: 'DELETE',
    queries,
    headers,
  })
}

// 登录方法
export const login = async (uri: string, credentials: any, customHeaders?: Record<string, string>): Promise<any> => {
  // 合并自定义headers和默认headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...customHeaders,
  }
  
  // 发送请求
  const response = await request(uri, {
    method: 'POST',
    headers,
    body: JSON.stringify(credentials),
  })
  
  // 存储token - 根据响应示例，token在response.data字段中
  if (response.data) {
    setCookie(X_USER_TOKEN, response.data, 365)
  }
  
  return response
}

// 注册方法
export const register = async (uri: string, userData: any): Promise<any> => {
  return post(uri, userData)
}

// 登出方法
export const logout = async (): Promise<void> => {
  try {
    const token = userToken();
    await del('/api/open/user/auth/logout', { token })
  } finally {
    // 无论成功失败都清除token和x-user-token
    clearCookie(X_USER_TOKEN)
    // 跳转到门户页面
    window.location.href = '/'  // 假设门户页面是根路径，可根据实际情况修改
  }
}

// 检查系统初始化状态
export const checkSystemInitialized = async (): Promise<boolean> => {
  try {
    const response = await get('/api/open/admin/system/initialized')
    return response.data?.initialized || response.initialized || false
  } catch (error) {
    // 默认假设系统未初始化
    return false
  }
}

export const userHadLoggedIn = (): boolean => {
  return userToken() !== undefined
}

// 获取应用列表
export const getAppList = async (page: number = 1, size: number = 10): Promise<any> => {
  return get('/api/rest/admin/app/app/list', { page, size })
}

// 创建应用
export const createApp = async (appData: {
  name: string;
  orgId: string;
  status: string;
}): Promise<any> => {
  return post('/api/rest/admin/app/app', appData)
}

// 更新应用
export const updateApp = async (appData: {
  id: string;
  name: string;
  orgId: string;
  status: string;
}): Promise<any> => {
  return put('/api/rest/admin/app/app', appData)
}

// 获取渠道应用列表
export const getChannelAppList = async (appId: string): Promise<any> => {
  return get(`/api/rest/admin/app/chl-app/list/${appId}`)
}

// 统一导出API对象
export const api = {
  request,
  get,
  post,
  put,
  delete: del,
  login,
  register,
  logout,
  checkSystemInitialized,
  userToken,
  userHadLoggedIn,
  getAppList,
  createApp,
  updateApp,
  getChannelAppList
}