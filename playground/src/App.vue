<script setup lang="ts"></script>

<template>
  <div v-if="$route.name !== '/'" class="shadow-xl p-5">
    <RouterLink to="/">&lt;&lt; Home</RouterLink>
  </div>
  <div class="p-10">
    <RouterView></RouterView>
  </div>
</template>
