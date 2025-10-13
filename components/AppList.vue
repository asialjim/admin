<template>
  <div class="applications-content">
    <el-card class="applications-card">
      <template #header>
        <div class="card-header">
          <span>应用列表</span>
        </div>
      </template>
      
      <div class="applications-filter">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索应用名称"
          prefix-icon="el-icon-search"
          class="search-input"
          @keyup.enter="fetchApplications"
        />
        <el-button type="primary" @click="showCreateDialog" class="create-button">
          <el-icon><Plus /></el-icon>
          新增应用
        </el-button>
      </div>
      
      <el-table
        v-loading="loading"
        :data="applicationsList"
        style="width: 100%"
        empty-text="暂无数据"
      >
        <el-table-column prop="id" label="应用编号" width="180">
          <template #default="scope">
            <el-link type="primary" @click="showAppDetail(scope.row.id)">{{ scope.row.id }}</el-link>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="应用名称" width="200" />
        <el-table-column prop="orgId" label="所属组织机构" width="180" />
        <el-table-column prop="status" label="应用状态" width="100">
          <template #default="scope">
            <el-tag :type="getStatusType(scope.row.status) as any">
              {{ scope.row.status }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" width="180" />
        <el-table-column prop="updateTime" label="更新时间" width="180" />
        <el-table-column label="操作" width="180" fixed="right">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              @click="showAppDetail(scope.row.id)"
              style="margin-right: 10px"
            >
              详情
            </el-button>
            <el-button
              type="primary"
              size="small"
              @click="showUpdateDialog(scope.row)"
              :disabled="scope.row.status === 'DELETED'"
            >
              修改
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    
    <!-- 新增应用对话框 -->
    <el-dialog
      v-model="createDialogVisible"
      title="新增应用"
      width="500px"
      @close="resetForm"
    >
      <el-form
        ref="createAppFormRef"
        :model="createAppForm"
        :rules="createAppRules"
        label-width="120px"
      >
        <el-form-item label="应用名称" prop="name">
          <el-input
            v-model="createAppForm.name"
            placeholder="请输入应用名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="所属组织机构编号" prop="orgId">
          <el-input
            v-model="createAppForm.orgId"
            placeholder="请输入所属组织机构编号"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="应用状态" prop="status">
          <el-select
            v-model="createAppForm.status"
            placeholder="请选择应用状态"
          >
            <el-option label="活跃" value="ACTIVE" />
            <el-option label="非活跃" value="INACTIVE" />
            <el-option label="维护中" value="MAINTENANCE" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeCreateDialog">取消</el-button>
          <el-button type="primary" :loading="submitLoading" @click="submitForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 修改应用对话框 -->
    <el-dialog
      v-model="updateDialogVisible"
      title="修改应用"
      width="500px"
      @close="resetUpdateForm"
    >
      <el-form
        ref="updateAppFormRef"
        :model="updateAppForm"
        :rules="updateAppRules"
        label-width="120px"
      >
        <el-form-item label="应用编号" prop="id">
          <el-input
            v-model="updateAppForm.id"
            disabled
          />
        </el-form-item>
        <el-form-item label="应用名称" prop="name">
          <el-input
            v-model="updateAppForm.name"
            placeholder="请输入应用名称"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="所属组织机构编号" prop="orgId">
          <el-input
            v-model="updateAppForm.orgId"
            placeholder="请输入所属组织机构编号"
            maxlength="50"
            show-word-limit
          />
        </el-form-item>
        <el-form-item label="应用状态" prop="status">
          <el-select
            v-model="updateAppForm.status"
            placeholder="请选择应用状态"
          >
            <el-option label="活跃" value="ACTIVE" />
            <el-option label="非活跃" value="INACTIVE" />
            <el-option label="维护中" value="MAINTENANCE" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="closeUpdateDialog">取消</el-button>
          <el-button type="primary" :loading="updateLoading" @click="submitUpdateForm">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
    
    <!-- 应用详情子页面 -->
    <div v-if="showDetailPage" class="detail-overlay">
      <div class="detail-container">
        <div class="detail-header">
          <h3>应用详情 - 渠道应用列表</h3>
          <el-button type="danger" circle @click="closeAppDetail">
            <el-icon><Close /></el-icon>
          </el-button>
        </div>
        <div class="detail-content">
          <div class="current-app-info">
            <p>当前应用编号: <strong>{{ currentAppId }}</strong></p>
          </div>
          <el-table
            v-loading="channelAppLoading"
            :data="channelAppList"
            style="width: 100%"
            empty-text="暂无渠道应用数据"
          >
            <el-table-column prop="id" label="渠道应用主键" width="180" />
            <el-table-column prop="chlType" label="渠道类型" width="120" />
            <el-table-column prop="chlAppId" label="渠道应用编号" width="150" />
            <el-table-column prop="chlAppType" label="渠道应用类型" width="150" />
            <el-table-column prop="chlAppName" label="渠道应用名称" width="200" />
            <el-table-column prop="orgId" label="所属组织机构编号" width="180" />
            <el-table-column prop="chlSubjectId" label="渠道号码" width="180" />
            <el-table-column prop="description" label="描述" min-width="200" />
            <el-table-column prop="createTime" label="创建时间" width="180" />
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage, ElForm } from 'element-plus'
import { Plus, Close } from '@element-plus/icons-vue'
import { api } from '../utils/api'

// 响应式数据
const loading = ref(false)
const submitLoading = ref(false)
const updateLoading = ref(false)
const applicationsList = ref<any[]>([])
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const searchKeyword = ref('')

// 新增应用相关
const createDialogVisible = ref(false)
const createAppFormRef = ref<InstanceType<typeof ElForm>>()
const createAppForm = ref({
  name: '',
  orgId: '',
  status: 'ACTIVE' // 默认活跃状态
})

// 修改应用相关
const updateDialogVisible = ref(false)
const updateAppFormRef = ref<InstanceType<typeof ElForm>>()
const updateAppForm = ref({
  id: '',
  name: '',
  orgId: '',
  status: ''
})

// 应用详情相关
const showDetailPage = ref(false)
const currentAppId = ref('')
const channelAppLoading = ref(false)
const channelAppList = ref<any[]>([])

// 表单验证规则
const createAppRules = ref({
  name: [
    { required: true, message: '请输入应用名称', trigger: 'blur' },
    { min: 1, max: 50, message: '应用名称长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  orgId: [
    { required: true, message: '请输入所属组织机构编号', trigger: 'blur' },
    { min: 1, max: 50, message: '组织机构编号长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择应用状态', trigger: 'change' }
  ]
})

// 修改应用表单验证规则
const updateAppRules = ref({
  id: [
    { required: true, message: '应用编号不能为空', trigger: 'blur' }
  ],
  name: [
    { required: true, message: '请输入应用名称', trigger: 'blur' },
    { min: 1, max: 50, message: '应用名称长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  orgId: [
    { required: true, message: '请输入所属组织机构编号', trigger: 'blur' },
    { min: 1, max: 50, message: '组织机构编号长度在 1 到 50 个字符', trigger: 'blur' }
  ],
  status: [
    { required: true, message: '请选择应用状态', trigger: 'change' }
  ]
})

// 组件挂载时获取应用列表
onMounted(() => {
  fetchApplications()
})

// 获取应用列表
const fetchApplications = async () => {
  loading.value = true
  try {
    const response = await api.getAppList(currentPage.value, pageSize.value)
    
    if (response.status === 200 && response.data) {
      applicationsList.value = response.data
      total.value = response.total || 0
    } else {
      ElMessage.error('获取应用列表失败')
      applicationsList.value = []
      total.value = 0
    }
  } catch (error) {
    console.error('获取应用列表错误:', error)
    ElMessage.error('获取应用列表时发生错误')
    applicationsList.value = []
    total.value = 0
  } finally {
    loading.value = false
  }
}

// 显示应用详情
const showAppDetail = async (appId: string) => {
  currentAppId.value = appId
  showDetailPage.value = true
  await fetchChannelAppList(appId)
}

// 关闭应用详情
const closeAppDetail = () => {
  showDetailPage.value = false
  currentAppId.value = ''
  channelAppList.value = []
}

// 获取渠道应用列表
const fetchChannelAppList = async (appId: string) => {
  channelAppLoading.value = true
  try {
    const response = await api.getChannelAppList(appId)
    
    if (response.status === 200 && response.data) {
      channelAppList.value = response.data
    } else {
      ElMessage.error('获取渠道应用列表失败')
      channelAppList.value = []
    }
  } catch (error) {
    console.error('获取渠道应用列表错误:', error)
    ElMessage.error('获取渠道应用列表时发生错误')
    channelAppList.value = []
  } finally {
    channelAppLoading.value = false
  }
}

// 根据状态获取标签类型
const getStatusType = (status: string): string => {
  switch (status) {
    case 'ACTIVE':
      return 'success'
    case 'INACTIVE':
      return 'info'
    case 'MAINTENANCE':
      return 'warning'
    case 'DELETED':
      return 'danger'
    default:
      return 'primary'
  }
}

// 处理分页大小变化
const handleSizeChange = (size: number) => {
  pageSize.value = size
  currentPage.value = 1
  fetchApplications()
}

// 处理当前页码变化
const handleCurrentChange = (current: number) => {
  currentPage.value = current
  fetchApplications()
}

// 显示新增应用对话框
const showCreateDialog = () => {
  createDialogVisible.value = true
}

// 关闭新增应用对话框
const closeCreateDialog = () => {
  createDialogVisible.value = false
  resetForm()
}

// 重置新增表单
const resetForm = () => {
  if (createAppFormRef.value) {
    createAppFormRef.value.resetFields()
  }
  createAppForm.value = {
    name: '',
    orgId: '',
    status: 'ACTIVE'
  }
}

// 提交新增表单
const submitForm = async () => {
  if (!createAppFormRef.value) return
  
  try {
    await createAppFormRef.value.validate()
    submitLoading.value = true
    
    const response = await api.createApp({
      name: createAppForm.value.name,
      orgId: createAppForm.value.orgId,
      status: createAppForm.value.status
    })
    
    if (response.status === 200 && response.code === '0') {
      ElMessage.success('创建应用成功')
      createDialogVisible.value = false
      resetForm()
      // 刷新应用列表
      fetchApplications()
    } else {
      ElMessage.error(response.msg || '创建应用失败')
    }
  } catch (error: any) {
    console.error('创建应用错误:', error)
    ElMessage.error(error.message || '创建应用时发生错误')
  } finally {
    submitLoading.value = false
  }
}

// 显示修改应用对话框
const showUpdateDialog = (row: any) => {
  // 复制行数据到修改表单
  updateAppForm.value = {
    id: row.id,
    name: row.name,
    orgId: row.orgId,
    status: row.status
  }
  updateDialogVisible.value = true
}

// 关闭修改应用对话框
const closeUpdateDialog = () => {
  updateDialogVisible.value = false
  resetUpdateForm()
}

// 重置修改表单
const resetUpdateForm = () => {
  if (updateAppFormRef.value) {
    updateAppFormRef.value.resetFields()
  }
  updateAppForm.value = {
    id: '',
    name: '',
    orgId: '',
    status: ''
  }
}

// 提交修改表单
const submitUpdateForm = async () => {
  if (!updateAppFormRef.value) return
  
  try {
    await updateAppFormRef.value.validate()
    updateLoading.value = true
    
    const response = await api.updateApp({
      id: updateAppForm.value.id,
      name: updateAppForm.value.name,
      orgId: updateAppForm.value.orgId,
      status: updateAppForm.value.status
    })
    
    if (response.status === 200 && response.code === '0') {
      ElMessage.success('修改应用成功')
      updateDialogVisible.value = false
      resetUpdateForm()
      // 刷新应用列表
      fetchApplications()
    } else {
      ElMessage.error(response.msg || '修改应用失败')
    }
  } catch (error: any) {
    console.error('修改应用错误:', error)
    ElMessage.error(error.message || '修改应用时发生错误')
  } finally {
    updateLoading.value = false
  }
}
</script>

<style scoped>
.applications-content {
  width: 100%;
}

.applications-card {
  margin-bottom: 20px;
}

.applications-filter {
  margin-bottom: 20px;
  display: flex;
  gap: 15px;
  align-items: center;
}

.search-input {
  width: 300px;
}

.create-button {
  white-space: nowrap;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
}

/* 应用详情页面样式 */
.detail-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 20px;
}

.detail-container {
  background-color: white;
  border-radius: 8px;
  width: 100%;
  max-width: 1400px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

.detail-header h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 500;
}

.detail-content {
  padding: 20px;
  overflow-y: auto;
  flex: 1;
}

.current-app-info {
  margin-bottom: 20px;
  padding: 10px 0;
  border-bottom: 1px solid #ebeef5;
}
</style>