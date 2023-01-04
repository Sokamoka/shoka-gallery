<script setup lang="ts">
import { Icon } from '@iconify/vue'
</script>

<template>
  <div v-if="$route.name !== '/'" class="p-5">
    <RouterLink to="/"><Icon icon="mdi:chevron-left" class="w-5 h-5 inline-block" /> Home</RouterLink>
  </div>
  <div class="p-10">
    <RouterView></RouterView>
  </div>
</template>
