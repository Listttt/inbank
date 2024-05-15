<script setup lang="ts">
interface RejectedPagePropsInterface{
  name: string;
}

defineProps<RejectedPagePropsInterface>();
</script>

<template>
rejected
  name: {{name}}
</template>

<style scoped>

</style>