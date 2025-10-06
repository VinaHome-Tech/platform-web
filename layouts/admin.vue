<script setup lang="ts">
import AdminHedear from '~/components/layouts/AdminHeader.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <header class="w-full shadow-md bg-white">
      <AdminHedear/>
    </header>

    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>