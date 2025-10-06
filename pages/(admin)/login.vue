<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-6">
    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 class="text-2xl font-semibold text-gray-800 mb-6 text-center">Đăng nhập</h2>

      <form @submit.prevent="onSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="you@example.com"
            class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <p v-if="errors.email" class="text-sm text-red-600 mt-1">{{ errors.email }}</p>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
          <div class="relative">
            <input
              :type="showPassword ? 'text' : 'password'"
              v-model="form.password"
              placeholder="Mật khẩu của bạn"
              class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
            />
            <button type="button" class="absolute right-2 top-2 text-sm" @click="showPassword = !showPassword">
              <span v-if="showPassword">Ẩn</span>
              <span v-else>Hiện</span>
            </button>
          </div>
          <p v-if="errors.password" class="text-sm text-red-600 mt-1">{{ errors.password }}</p>
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center">
            <input type="checkbox" v-model="form.remember" class="h-4 w-4 text-indigo-600 rounded border-gray-300" />
            <span class="ml-2 text-gray-700">Ghi nhớ đăng nhập</span>
          </label>
          <NuxtLink to="/forgot" class="text-indigo-600 hover:underline">Quên mật khẩu?</NuxtLink>
        </div>

        <div>
          <button
            :disabled="loading"
            class="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-60"
          >
            <span v-if="!loading">Đăng nhập</span>
            <span v-else>Đang xử lý...</span>
          </button>
        </div>

        <div class="flex items-center gap-3 justify-center">
          <span class="h-px flex-1 bg-gray-200"></span>
          <span class="text-sm text-gray-500">Hoặc đăng nhập với</span>
          <span class="h-px flex-1 bg-gray-200"></span>
        </div>

        <div class="grid grid-cols-2 gap-3">
          <button type="button" @click="socialSign('google')" class="py-2 px-3 border rounded-lg text-sm">
            Google
          </button>
          <button type="button" @click="socialSign('facebook')" class="py-2 px-3 border rounded-lg text-sm">
            Facebook
          </button>
        </div>

        <p class="text-center text-sm text-gray-600">Chưa có tài khoản? <NuxtLink to="/register" class="text-indigo-600">Đăng ký</NuxtLink></p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const loading = ref(false)
const showPassword = ref(false)

const form = reactive({
  email: '',
  password: '',
  remember: false,
})

const errors = reactive<{ email?: string; password?: string }>({})

function validate() {
  errors.email = undefined
  errors.password = undefined

  if (!form.email) errors.email = 'Vui lòng nhập email.'
  else {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\\.,;:\s@\"]+\.)+[^<>()[\]\\.,;:\s@\"]{2,})$/i
    if (!re.test(form.email)) errors.email = 'Email không hợp lệ.'
  }

  if (!form.password) errors.password = 'Vui lòng nhập mật khẩu.'
  else if (form.password.length < 6) errors.password = 'Mật khẩu phải có ít nhất 6 ký tự.'

  return !errors.email && !errors.password
}

async function onSubmit() {
  if (!validate()) return

  loading.value = true
  try {
    // TODO: Thay bằng call API thực tế của bạn.
    // ví dụ: await $fetch('/api/auth/login', { method: 'POST', body: { ...form } })

    // Giả lập delay
    await new Promise((r) => setTimeout(r, 700))

    // Sau khi đăng nhập thành công, chuyển hướng (ví dụ đến dashboard)
    router.push({ name: 'index' })
  } catch (err) {
    // Xử lý lỗi trả về từ API
    // errors.email = '...'
    // hoặc show toast
    console.error(err)
  } finally {
    loading.value = false
  }
}

function socialSign(provider: string) {
  // TODO: gắn với OAuth/SSO provider thực tế
  alert(`Social sign-in: ${provider}`)
}
</script>

<style scoped>
/* Nếu muốn tuỳ chỉnh thêm ngoài Tailwind, đặt ở đây */
</style>
