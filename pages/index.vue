<template>
  <div class="portal-container">
    <div class="portal-content">
      <h1 class="portal-title">微应用管理系统</h1>
      <p class="portal-subtitle">欢迎使用企业级应用管理平台</p>
      <div class="portal-actions">
        <el-button type="primary" size="large" @click="goToLogin" class="action-btn">登录</el-button>
        <el-button size="large" @click="goToRegister" class="action-btn">注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<style scoped>
.portal-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
}

.portal-content {
  text-align: center;
  color: white;
  max-width: 500px;
  padding: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}

.portal-title {
  font-size: 3rem;
  margin-bottom: 20px;
  font-weight: 700;
}

.portal-subtitle {
  font-size: 1.2rem;
  margin-bottom: 40px;
  opacity: 0.9;
}

.portal-actions {
  display: flex;
  gap: 20px;
  justify-content: center;
}

.action-btn {
  min-width: 120px;
  padding: 12px 24px;
  font-size: 1rem;
}
</style>