import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import envConfig from './env'

// 环境配置中的基础URL
const { baseUrl } = envConfig

// 合并基础URL和接口URI
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
const requestInterceptor = (config: RequestInit): RequestInit => {
  // 添加默认headers
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(config.headers as Record<string, string> || {}),
  }
  
  // 添加认证token
  const token = getCookie('token')
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
    clearCookie('token')
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
export const request = async (uri: string, options: RequestInit = {}): Promise<any> => {
  try {
    // 构建完整URL
    const url = combineUrl(uri)
    
    // 应用请求拦截器
    const config = requestInterceptor({
      ...options,
      credentials: 'include',
    })
    
    // 发送请求
    const response = await fetch(url, config)
    
    // 应用响应拦截器
    return await responseInterceptor(response)
  } catch (error) {
    // 处理请求错误
    return handleRequestError(error)
  }
}

// 封装GET请求
export const get = async (uri: string, params?: any): Promise<any> => {
  // 构建查询参数
  let queryString = ''
  if (params) {
    const searchParams = new URLSearchParams()
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== null) {
        searchParams.append(key, params[key])
      }
    })
    const paramsString = searchParams.toString()
    if (paramsString) {
      queryString = `?${paramsString}`
    }
  }
  
  return request(`${uri}${queryString}`, {
    method: 'GET',
  })
}

// 封装POST请求
export const post = async (uri: string, data?: any): Promise<any> => {
  return request(uri, {
    method: 'POST',
    body: JSON.stringify(data),
  })
}

// 封装PUT请求
export const put = async (uri: string, data?: any): Promise<any> => {
  return request(uri, {
    method: 'PUT',
    body: JSON.stringify(data),
  })
}

// 封装DELETE请求
export const del = async (uri: string): Promise<any> => {
  return request(uri, {
    method: 'DELETE',
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
    setCookie('token', response.data, 365)
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
    await post('/api/auth/logout')
  } finally {
    // 无论成功失败都清除token
    clearCookie('token')
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
  getCookie,
  setCookie,
  clearCookie,
}