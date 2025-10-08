<script setup lang="ts">
import Header from '~/components/layouts/Header.vue'
</script>
<template>
  <div class="min-h-screen flex flex-col">
    <!-- Header -->
    <header class="w-full shadow-md bg-white">
      <Header />
    </header>

    <!-- Main content -->
    <main class="flex-1">
      <slot />
    </main>
  </div>
</template>
