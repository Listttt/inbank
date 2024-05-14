<script setup lang="ts">

</script>

<template>
  <button class="ib-button">
    <slot/>
  </button>
</template>

<style scoped>
.ib-button {
  display: inline-block;
  text-align: center;

  height: 48px;
  background: #AA93FF;
  padding: 12px 24px;
  border: 0;
  border-radius: 100px;
}
</style>