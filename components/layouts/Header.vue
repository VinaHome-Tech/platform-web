<template>
  <header class="bg-white/95 backdrop-blur-md shadow-xl border-b border-gray-100 sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-20">
        <!-- Logo/Brand -->
        <div class="flex items-center">
          <div class="flex-shrink-0">
            <img src="~/assets/image/logo-4.png" alt="Brand Logo" class="h-12 w-auto transition-transform duration-300 hover:scale-105" />
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="hidden lg:block">
          <div class="flex items-center space-x-1">
            <a href="#" class="relative text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-blue-50 group">
              <span>Khuyến mãi</span>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </a>
            
            <!-- Support Dropdown -->
            <div class="relative group">
              <button 
                @click="toggleSupportDropdown"
                @mouseenter="showSupportDropdown"
                @mouseleave="hideSupportDropdown"
                class="relative text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-blue-50 flex items-center space-x-1"
                :class="supportDropdownOpen ? 'text-blue-600 bg-blue-50' : ''"
              >
                <span>Hỗ trợ</span>
                <svg 
                  class="w-4 h-4 transition-transform duration-300" 
                  :class="supportDropdownOpen ? 'rotate-180' : ''"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              <!-- Animated underline for dropdown -->
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
              
              <!-- Dropdown Menu -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 transform scale-95 translate-y-1"
                enter-to-class="opacity-100 transform scale-100 translate-y-0"
                leave-active-class="transition duration-150 ease-in"
                leave-from-class="opacity-100 transform scale-100 translate-y-0"
                leave-to-class="opacity-0 transform scale-95 translate-y-1"
              >
                <div 
                  v-if="supportDropdownOpen"
                  @mouseenter="showSupportDropdown"
                  @mouseleave="hideSupportDropdown"
                  class="absolute top-full left-0 mt-2 w-64 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl shadow-blue-500/10 border border-gray-100 overflow-hidden z-50"
                >
                  <div class="py-2">
                    <a href="#" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
                      <div class="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-200 transition-colors duration-200">
                        <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold">Câu hỏi thường gặp</div>
                        <div class="text-xs text-gray-500">Tìm câu trả lời nhanh chóng</div>
                      </div>
                    </a>
                    
                    <a href="#" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
                      <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-green-200 transition-colors duration-200">
                        <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold">Chat trực tiếp</div>
                        <div class="text-xs text-gray-500">Hỗ trợ 24/7</div>
                      </div>
                    </a>
                    
                    <a href="#" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
                      <div class="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-orange-200 transition-colors duration-200">
                        <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold">Hotline hỗ trợ</div>
                        <div class="text-xs text-gray-500">1900-1234</div>
                      </div>
                    </a>
                    
                    <a href="#" class="flex items-center px-4 py-3 text-sm text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 group">
                      <div class="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center mr-3 group-hover:bg-purple-200 transition-colors duration-200">
                        <svg class="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                        </svg>
                      </div>
                      <div>
                        <div class="font-semibold">Gửi email</div>
                        <div class="text-xs text-gray-500">support@company.com</div>
                      </div>
                    </a>
                  </div>
                </div>
              </transition>
            </div>
            
            <a href="#" class="relative text-gray-700 hover:text-blue-600 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-300 hover:bg-blue-50 group">
              <span>Hợp tác với chúng tôi</span>
              <div class="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 group-hover:w-full group-hover:left-0"></div>
            </a>
          </div>
        </nav>

        <!-- Auth Buttons and App Download -->
        <div class="hidden lg:flex items-center space-x-3">
          <!-- App Download Select -->
          <div class="relative group">
            <select 
              v-model="selectedPlatform"
              @change="handlePlatformChange"
              class="appearance-none bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 border border-gray-200 hover:border-blue-300 rounded-xl px-5 py-2.5 pr-10 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md"
            >
              <option value="" disabled selected>📱 Tải ứng dụng</option>
              <option value="ios">🍎 iOS App Store</option>
              <option value="android">🤖 Google Play</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-400 group-hover:text-blue-500 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l5 5 5-5"></path>
              </svg>
            </div>
          </div>
          
          <button 
            @click="showLogin"
            class="relative text-blue-600 hover:text-white px-6 py-2.5 rounded-xl text-sm font-semibold border-2 border-blue-600 hover:border-blue-700 hover:bg-blue-600 transition-all duration-300 overflow-hidden group"
          >
            <span class="relative z-10">Đăng nhập</span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
          
          <button 
            @click="showRegister"
            class="relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-2.5 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 transition-all duration-300 transform hover:scale-105"
          >
            <span class="relative z-10">Đăng ký</span>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="lg:hidden">
          <button 
            @click="toggleMobileMenu"
            class="relative text-gray-700 hover:text-blue-600 focus:outline-none focus:text-blue-600 p-2 rounded-lg hover:bg-blue-50 transition-all duration-300"
          >
            <svg 
              class="h-6 w-6 transition-transform duration-300" 
              :class="mobileMenuOpen ? 'rotate-90' : ''" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <transition 
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0 transform -translate-y-2"
        enter-to-class="opacity-100 transform translate-y-0"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100 transform translate-y-0"
        leave-to-class="opacity-0 transform -translate-y-2"
      >
        <div v-if="mobileMenuOpen" class="lg:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
          <div class="px-4 pt-4 pb-6 space-y-3">
            <a href="#" class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300">
              Khuyến mãi
            </a>
            
            <!-- Support Dropdown for Mobile -->
            <div class="space-y-2">
              <button 
                @click="toggleMobileSupportDropdown"
                class="w-full text-left text-gray-700 hover:text-blue-600 hover:bg-blue-50 px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300 flex items-center justify-between"
                :class="mobileSupportDropdownOpen ? 'text-blue-600 bg-blue-50' : ''"
              >
                <span>Hỗ trợ</span>
                <svg 
                  class="w-4 h-4 transition-transform duration-300" 
                  :class="mobileSupportDropdownOpen ? 'rotate-180' : ''"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              <!-- Mobile Support Dropdown Content -->
              <transition
                enter-active-class="transition duration-200 ease-out"
                enter-from-class="opacity-0 max-h-0"
                enter-to-class="opacity-100 max-h-96"
                leave-active-class="transition duration-200 ease-in"
                leave-from-class="opacity-100 max-h-96"
                leave-to-class="opacity-0 max-h-0"
              >
                <div v-if="mobileSupportDropdownOpen" class="pl-4 space-y-2 overflow-hidden">
                  <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                    <svg class="w-4 h-4 text-blue-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    Câu hỏi thường gặp
                  </a>
                  <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                    <svg class="w-4 h-4 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    Chat trực tiếp
                  </a>
                  <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                    <svg class="w-4 h-4 text-orange-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                    </svg>
                    Hotline: 1900-1234
                  </a>
                  <a href="#" class="flex items-center px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200">
                    <svg class="w-4 h-4 text-purple-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                    Gửi email
                  </a>
                </div>
              </transition>
            </div>
            
            <a href="#" class="text-gray-700 hover:text-blue-600 hover:bg-blue-50 block px-4 py-3 rounded-xl text-base font-semibold transition-all duration-300">
              Hợp tác với chúng tôi
            </a>
            
            <div class="pt-4 space-y-3 border-t border-gray-100">
              <!-- App Download Select for Mobile -->
              <div class="relative">
                <select 
                  v-model="selectedPlatform"
                  @change="handlePlatformChange"
                  class="w-full appearance-none bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm font-semibold text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 transition-all duration-300"
                >
                  <option value="" disabled selected>📱 Tải ứng dụng</option>
                  <option value="ios">🍎 iOS App Store</option>
                  <option value="android">🤖 Google Play</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 10l5 5 5-5"></path>
                  </svg>
                </div>
              </div>
              
              <button 
                @click="showLogin"
                class="w-full text-blue-600 hover:text-white px-4 py-3 rounded-xl text-sm font-semibold border-2 border-blue-600 hover:bg-blue-600 transition-all duration-300"
              >
                Đăng nhập
              </button>
              
              <button 
                @click="showRegister"
                class="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/25 hover:shadow-xl transition-all duration-300"
              >
                Đăng ký
              </button>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup lang="ts">
// Reactive variables
const mobileMenuOpen = ref(false)
const selectedPlatform = ref('')
const supportDropdownOpen = ref(false)
const mobileSupportDropdownOpen = ref(false)
let supportDropdownTimer: NodeJS.Timeout | null = null

// Methods
const showLogin = () => {
  console.log('Show login modal')
  // Implement login logic
}

const showRegister = () => {
  console.log('Show register modal')  
  // Implement register logic
}

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const toggleSupportDropdown = () => {
  supportDropdownOpen.value = !supportDropdownOpen.value
}

const showSupportDropdown = () => {
  if (supportDropdownTimer) {
    clearTimeout(supportDropdownTimer)
    supportDropdownTimer = null
  }
  supportDropdownOpen.value = true
}

const hideSupportDropdown = () => {
  supportDropdownTimer = setTimeout(() => {
    supportDropdownOpen.value = false
  }, 150)
}

const toggleMobileSupportDropdown = () => {
  mobileSupportDropdownOpen.value = !mobileSupportDropdownOpen.value
}

const downloadApp = () => {
  if (selectedPlatform.value === 'ios') {
    // Open iOS App Store link
    window.open('https://apps.apple.com/app/your-app-id', '_blank')
  } else if (selectedPlatform.value === 'android') {
    // Open Google Play Store link
    window.open('https://play.google.com/store/apps/details?id=your.package.name', '_blank')
  }
}

const handlePlatformChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  selectedPlatform.value = target.value
  if (selectedPlatform.value) {
    downloadApp()
    // Reset select để luôn hiển thị "Tải ứng dụng"
    setTimeout(() => {
      selectedPlatform.value = ''
    }, 100)
  }
}
</script>

<style scoped>
/* Custom styles if needed */
</style>