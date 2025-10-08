<script setup lang="ts">
import AdminHeader from '~/components/layouts/AdminHeader.vue'
import AdminSidebar from '~/components/layouts/AdminSidebar.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="w-full shadow-md bg-white">
      <AdminHeader />
    </header>

    <!-- Main layout -->
    <div class="flex flex-1">
      <!-- Sidebar -->
      <aside class="w-64 bg-gray-100 shadow-md">
        <AdminSidebar />
      </aside>

      <!-- Main content -->
      <main class="flex-1 bg-white p-4 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
