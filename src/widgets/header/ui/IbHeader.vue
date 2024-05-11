<script setup lang="ts">
import {ROUTE_NAMES} from "@/shared/config";
import {IbLogo} from "@/shared/logo";
import {computed} from "vue";
import {useRoute} from "vue-router";

const { name } = useRoute();

const VISIBLE_ROUTES: Array<ROUTE_NAMES> = [ROUTE_NAMES.HOME];

const show = computed(() => {
  return VISIBLE_ROUTES.includes(name as ROUTE_NAMES);
})

</script>

<template>
  <header v-show="show">
    <ib-logo/>
  </header>
</template>

<style scoped>

</style>