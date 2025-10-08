// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@pinia/nuxt'],
  app: {
    head: {
      title: 'VinaHome - Nền tảng đặt vé du lịch trực tuyến',
      charset: "utf-8",
      meta: [
        { name: 'description', content: 'VinaHome' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      ],
     
    }
  },
  runtimeConfig: {
    public: {
      apiGateWay: process.env.NUXT_PUBLIC_API_GATEWAY,
    }
  },
})