<template>
  <div class="create-admin-container">
    <div class="create-admin-form-wrapper">
      <h2>创建超级管理员账户</h2>
      <el-form
        ref="adminFormRef"
        :model="adminForm"
        :rules="adminRules"
        class="create-admin-form"
        label-position="top"
      >
        <el-form-item label="密码" prop="password">
          <el-input
            v-model="adminForm.password"
            type="password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
          <div class="form-tip">密码将用于超级管理员账户认证</div>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input
            v-model="adminForm.confirmPassword"
            type="password"
            placeholder="请再次输入密码"
            prefix-icon="el-icon-lock"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            class="create-button"
            :loading="loading"
            @click="handleCreateAdmin"
          >
            创建账户
          </el-button>
        </el-form-item>
        <div v-if="created" class="success-message">
          <el-icon><success-filled /></el-icon>
          超级管理员账户创建成功！
        </div>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { SuccessFilled } from '@element-plus/icons-vue'
import type { FormInstance, FormRules } from 'element-plus'
import { api } from '../utils/api'

const router = useRouter()
const adminFormRef = ref<FormInstance>()
const loading = ref(false)
const created = ref(false)

// 检查超级管理员是否已存在
onMounted(async () => {
  try {
    // 发送GET请求检查超管是否存在
    const response = await api.get('/api/open/admin/user/user/registrar/root')
    
    // 如果接口返回200，说明超管已存在，直接跳转到门户页面
    if (response && response.status === 200) {
      ElMessage.info('超级管理员已存在，正在跳转到门户页面...')
      setTimeout(() => {
        router.push('/dashboard')
      }, 1000)
    }
  } catch (error) {
    // 如果接口返回非200或其他错误，继续显示创建表单
    // 错误不需要提示，因为这可能是预期行为（超管不存在）
  }
})

// 超级管理员表单数据
const adminForm = reactive({
  password: '',
  confirmPassword: '',
})

// 表单验证规则
const adminRules = reactive<FormRules>({
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 32, message: '密码长度在 6 到 32 个字符', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== adminForm.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur',
    },
  ],
})

// 处理创建超级管理员
const handleCreateAdmin = async () => {
  try {
    // 表单验证
    await adminFormRef.value?.validate()
    
    loading.value = true
    
    // 准备符合接口要求的注册数据
    const registerData = {
      userid: 'root', // 注册超管时写死 root
      appid: 'root', // 注册超管时写死 root
      chlType: 'PC', // 注册超管时写死为PC
      chlAppId: 'root', // 注册超管时写死 root
      chlAppType: 'CMS', // 注册超管时写死 CMS
      chlUserId: 'root', // 注册超管时写死root
      chlUnionId: '', // 暂时为空
      chlUserCode: adminForm.password, // 用户密码字段
      chlUserToken: '' // 保留字段，暂时不使用
    }
    
    // 调用注册接口
    await api.register('/api/open/admin/user/user/registrar/register', registerData)
    
    ElMessage.success('超级管理员账户创建成功！')
    created.value = true
    
    // 2秒后跳转到登录页
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } catch (error) {
    // 错误已在api工具中处理
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.create-admin-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.create-admin-form-wrapper {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.create-admin-form-wrapper h2 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
}

.create-admin-form {
  width: 100%;
}

.create-button {
  width: 100%;
  padding: 12px;
  font-size: 16px;
}

.form-tip {
  margin-top: 8px;
  font-size: 12px;
  color: #909399;
}

.success-message {
  margin-top: 20px;
  padding: 15px;
  background-color: #f0f9ff;
  border: 1px solid #e1f3d8;
  border-radius: 4px;
  color: #67c23a;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}
</style>