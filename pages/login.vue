<template>
  <div class="login-container">
    <div class="login-form-wrapper">
      <div class="form-header">
        <h2 class="form-title">用户登录</h2>
        <p class="form-subtitle">请输入您的账号信息</p>
      </div>
      
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
        class="login-form"
      >
        <el-form-item label="应用编号" prop="appId">
          <el-input
            v-model="loginForm.appId"
            placeholder="请输入应用编号"
            prefix-icon="el-icon-office-building"
          />
        </el-form-item>
        
        <el-form-item label="用户名" prop="username">
          <el-input
            v-model="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        
        <el-form-item>
          <el-button
            type="primary"
            size="large"
            class="login-btn"
            @click="handleLogin"
            :loading="loading"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
      
      <div class="form-footer">
        <router-link to="/register" class="register-link">没有账号？立即注册</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { api } from '../utils/api'

const router = useRouter()
const loginFormRef = ref<FormInstance>()
const loading = ref(false)

const loginForm = reactive({
  appId: '',
  username: '',
  password: ''
})

const loginRules = reactive<FormRules>({
  appId: [
    { required: true, message: '请输入应用编号', trigger: 'blur' }
  ],
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
  ]
})

const handleLogin = async () => {
  if (!loginFormRef.value) return
  
  try {
    await loginFormRef.value.validate()
    loading.value = true
    
    // 构建登录请求参数，包含保留字段
    const loginData = {
      username: loginForm.username,
      password: loginForm.password,
      code: '', // 保留字段
      state: '' // 保留字段
    }
    
    // 构建自定义请求头
    const customHeaders = {
      'x-app-id': loginForm.appId,     // 应用编号，从表单获取
      'x-app-chl': 'PC',               // 登录渠道，后管页面固定为PC
      'x-app-chl-app-type': 'CMS'         // 渠道应用，后管页面固定为CMS
    }
    
    // 使用统一API工具发送登录请求，只传入接口URI
    const response = await api.login('/api/open/auth/login', loginData, customHeaders)
    
    // 检查响应状态和数据
    if (response && response.status === 200 && response.code === '0') {
      ElMessage.success('登录成功')
      // 登录成功后跳转到门户页面
      router.push('/dashboard')
    } else {
      ElMessage.error(response?.msg || '登录失败，请重试')
    }
  } catch (error) {
    console.error('登录失败:', error)
    // 已经在api工具中处理了错误提示，这里不需要重复处理
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  margin: 0;
  padding: 0;
}

.login-form-wrapper {
  width: 400px;
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.37);
}

.form-header {
  text-align: center;
  margin-bottom: 30px;
}

.form-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 10px;
}

.form-subtitle {
  font-size: 14px;
  color: #909399;
}

.login-form {
  /* 可以添加额外的表单样式 */
}

.login-btn {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

.form-footer {
  text-align: center;
  font-size: 14px;
  margin-top: 20px;
}

.register-link {
  color: #409eff;
  text-decoration: none;
}

.register-link:hover {
  text-decoration: underline;
}
</style>