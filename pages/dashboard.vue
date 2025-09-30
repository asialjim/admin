<template>
  <div class="dashboard-container">
    <div class="dashboard-header">
      <h1>欢迎使用微应用管理系统</h1>
      <el-button type="primary" @click="handleLogout">退出登录</el-button>
    </div>
    
    <div class="dashboard-content">
      <el-card class="dashboard-card">
        <template #header>
          <div class="card-header">
            <span>系统信息</span>
          </div>
        </template>
        
        <div class="dashboard-welcome">
          <el-empty description="您已成功登录系统" image-size="200" />
          <p>这是一个示例仪表盘页面，后续可以根据需求进行功能扩展。</p>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { api, getCookie } from '../utils/api'

const router = useRouter()

// 组件挂载时检查是否已登录
onMounted(() => {
  const token = getCookie('token') // 修改为正确的cookie名称
  if (!token) {
    ElMessage.warning('请先登录')
    router.push('/login')
  }
})

const handleLogout = () => {
  api.logout()
}
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
  overflow: auto;
}

.dashboard-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #ebeef5;
}

.dashboard-header h1 {
  font-size: 24px;
  color: #303133;
  margin: 0;
}

.dashboard-content {
  max-width: 800px;
  margin: 0 auto;
}

.dashboard-card {
  margin-bottom: 20px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dashboard-welcome {
  text-align: center;
  padding: 40px 0;
}

.dashboard-welcome p {
  margin-top: 20px;
  color: #606266;
}
</style>