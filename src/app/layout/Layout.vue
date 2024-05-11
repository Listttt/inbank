<script setup lang="ts">
import {RouterView} from "vue-router";
import {IbHeader} from "@/widgets/header";

</script>

<template>
  <div class="column">
    <ib-header/>

    <RouterView />
  </div>
</template>

<style scoped>

</style>