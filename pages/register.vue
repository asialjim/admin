<template>
  <div class="register-container">
    <div class="register-form-wrapper">
      <h2>注册账号</h2>
      <el-form
        ref="registerFormRef"
        :model="registerForm"
        :rules="registerRules"
        class="register-form"
        label-position="top"
      >
        <el-form-item label="应用ID" prop="appid">
          <el-input
            v-model="registerForm.appid"
            placeholder="请输入应用ID"
            prefix-icon="el-icon-setting"
          />
        </el-form-item>
        <el-form-item label="用户名" prop="chlUserId">
          <el-input
            v-model="registerForm.chlUserId"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
          />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="registerForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="registerForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="register-button"
            :loading="loading"
            @click="handleRegister"
          >
            注册
          </el-button>
        </el-form-item>
        <div class="login-link">
          已有账号？<router-link to="/login">返回登录</router-link>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { api } from '../utils/api'

const router = useRouter()
const registerFormRef = ref<FormInstance>()
const loading = ref(false)

// 注册表单数据
const registerForm = reactive({
  appid: '', // 修改为接口要求的字段名
  chlUserId: '', // 修改为接口要求的字段名
  password: '',
  confirmPassword: '',
})

// 表单验证规则
const registerRules = reactive<FormRules>({
  appid: [
    { required: true, message: '请输入应用ID', trigger: 'blur' },
    { min: 1, max: 50, message: '应用ID长度在 1 到 50 个字符', trigger: 'blur' },
  ],
  chlUserId: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度在 6 到 32 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== registerForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

// 处理注册
const handleRegister = async () => {
  try {
    // 表单验证
    await registerFormRef.value?.validate()
    
    loading.value = true
    
    // 准备符合接口要求的数据格式
    const registerData = {
      appid: registerForm.appid,
      chlType: 'PC', // 普通用户注册也使用PC渠道
      chlAppId: 'CMS', // 普通用户注册渠道应用ID
      chlAppType: 'CMS', // 普通用户注册渠道应用类型
      chlUserId: registerForm.chlUserId,
      chlUnionId: '', // 暂时为空
      chlUserCode: registerForm.password, // 密码字段
      chlUserToken: '' // 保留字段，暂时不使用
    }
    
    // 使用统一API工具发送注册请求
    await api.register('/api/open/admin/user/user/registrar/register', registerData)
    
    ElMessage.success('注册成功')
    // 注册成功后跳转到登录页
    router.push('/login')
  } catch (error) {
    // 错误已在api工具中处理
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.register-form-wrapper {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.register-form-wrapper h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.register-form {
  width: 100%;
}

.register-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

.login-link {
  text-align: center;
  margin-top: 16px;
  color: #606266;
}

.login-link a {
  color: #409eff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>