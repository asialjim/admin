<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getCookie } from './utils/api'
import { api } from './utils/api'

const router = useRouter()

onMounted(async () => {
  // 检查是否已经创建过超级管理员
  // 这里可以通过一个API调用来检查系统初始化状态
  // 为了简化，我们假设如果没有token，并且系统未初始化，则显示创建管理员页面
  const token = getCookie('x-user-token')
  
  if (!token) {
    try {
      // 检查系统初始化状态的API（这里是模拟，实际应该调用真实的API）
      // 由于可能没有真实的API，我们先默认重定向到创建管理员页面
      // 实际实现时应该调用一个检查API，根据返回结果决定是否显示创建管理员页面
      const initialized = await checkSystemInitialized()
      
      // 如果系统未初始化且当前不在创建管理员页面，则重定向到创建管理员页面
      if (!initialized && router.currentRoute.value.path !== '/create-admin') {
        router.push('/create-admin')
      }
    } catch (error) {
      // 如果API调用失败，暂时不做处理
      console.log('系统初始化状态检查失败，继续正常流程')
    }
  }
})

// 检查系统是否已经初始化
const checkSystemInitialized = async (): Promise<boolean> => {
  try {
    // 这里应该调用一个真实的API来检查系统是否已经初始化
    // 由于是模拟，我们默认返回false，表示系统未初始化
    // 实际实现时应该替换为真实的API调用
    // const response = await api.get('/api/system/initialized')
    // return response.data.initialized || false
    
    // 模拟API调用延迟
    await new Promise(resolve => setTimeout(resolve, 300))
    
    // 默认返回false，表示系统未初始化，需要创建管理员
    // 在实际使用中，这里应该根据真实的API响应来判断
    return false
  } catch (error) {
    console.error('检查系统初始化状态失败:', error)
    // 如果API调用失败，默认返回true，避免无限循环
    return true
  }
}
</script>

<template>
  <div style="width: 100%; height: 100%;">
    <NuxtPage />
  </div>
</template>

<style>
/* 全局重置样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#__nuxt, #__layout {
  width: 100%;
  height: 100%;
}
</style>