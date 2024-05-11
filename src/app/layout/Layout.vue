<script setup lang="ts">
import {IbHeader} from "@/widgets/header";
import {IbContainer} from "@/widgets/container";

</script>

<template>
  <div class="ib-layout ib-container">
    <ib-header/>
    <ib-container/>
  </div>
</template>

<style scoped>

.ib-layout {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  margin: auto
}


</style>