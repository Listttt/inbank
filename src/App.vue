<script setup lang="ts">
import { RouterView } from 'vue-router'
import IbHeader from "@/widgets/header/ui/IbHeader.vue";
</script>

<template>
  <ib-header/>

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
