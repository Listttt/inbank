<script setup lang="ts">
import { RouterView } from 'vue-router';
import type {AxiosInstance} from 'axios';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $axios: AxiosInstance,
    $c: (amount: string | number, currency?: string, minimumFractionDigits?: number) => string
  }
}
</script>

<template>
  <RouterView/>
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
