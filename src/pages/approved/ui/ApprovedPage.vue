<script setup lang="ts">

interface ApprovedPagePropsInterface {
  amount: number;
  //TODO: create currency type
  currency: string;
  payment: string;
  period: number
}

defineProps<ApprovedPagePropsInterface>()
</script>

<template>
  approved
  {{$props}}
</template>

<style scoped>

</style>