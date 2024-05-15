<script setup lang="ts">
interface RejectedPagePropsInterface{
  uname: string;
}

defineProps<RejectedPagePropsInterface>();
</script>

<template>
rejected
  name: {{uname}}
</template>

<style scoped>

</style>