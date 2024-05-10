<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    Conditional header with logo.
  </header>

  <RouterView />
</template>

<style scoped>
header {
}

.logo {
}


@media (min-width: 1024px) {
  header {
  }

  .logo {
  }

}
</style>
