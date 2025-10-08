<script lang="ts" setup>
import { reactive, ref } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import type { LoginForm } from '~/types/authType'
import { API_LoginInternalPlatform } from '~/api/authAPI'
import { useUserStore } from '~/stores/useUserStore'

const userStore = useUserStore()
const loginFormRef = ref<FormInstance>()

const loginForm = reactive<LoginForm>({
  username: '',
  password: '',
})

const rules = reactive<FormRules<LoginForm>>({
  username: [
    { required: true, message: 'Vui lòng nhập tên đăng nhập', trigger: 'blur' },
  ],
  password: [
    { required: true, message: 'Vui lòng nhập mật khẩu', trigger: 'blur' },
    { min: 6, message: 'Mật khẩu phải có ít nhất 6 ký tự', trigger: 'blur' },
  ],
})
const cookie_access_token = useCookie('platform_access_token')
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate(async (valid) => {
    if (valid) {
      try {
        console.log('Đăng nhập với:', loginForm)
        const response = await API_LoginInternalPlatform(loginForm)
        if (response.success && response.result) {
          cookie_access_token.value = response.result.access_token
          userStore.setUserInfo(response.result)
          ElMessage.success('Đăng nhập thành công!')
          navigateTo('/admin/dashboard')
        } else {
          ElMessage.error(response.message || 'Đăng nhập thất bại!')
        }
        
      } catch (error) {
        console.error('Lỗi đăng nhập:', error)
        ElMessage.error('Lỗi đăng nhập!')
      }
    } else {
      ElMessage.warning('Vui lòng điền đầy đủ thông tin!')
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <el-form
      ref="loginFormRef"
      :model="loginForm"
      :rules="rules"
      label-width="auto"
      class="p-6 bg-white rounded-2xl shadow-md"
    >
      <h2 class="text-2xl font-semibold text-center mb-6">Đăng nhập</h2>

      <el-form-item label="Tên đăng nhập" prop="username" label-position="top">
        <el-input
          v-model="loginForm.username"
          placeholder="Nhập tên đăng nhập"
          clearable
        />
      </el-form-item>

      <el-form-item label="Mật khẩu" prop="password" label-position="top">
        <el-input
          v-model="loginForm.password"
          type="password"
          placeholder="Nhập mật khẩu"
          show-password
        />
      </el-form-item>

      <el-form-item class="flex justify-between mt-6">
        <el-button type="primary" @click="submitForm(loginFormRef)">
          Đăng nhập
        </el-button>
        <el-button @click="resetForm(loginFormRef)">Làm mới</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped>
.el-form-item {
  margin-bottom: 20px;
}
</style>
