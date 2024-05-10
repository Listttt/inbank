<script setup lang="ts">
import { RouterView } from 'vue-router'
import { IbLogo } from "@/shared/logo/";
</script>

<template>
  <header v-show="$route.name === 'home'">
    <ib-logo/>
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
