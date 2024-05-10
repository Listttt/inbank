<script setup lang="ts">
import {ROUTE_NAMES} from "@/shared/config";
import {IbLogo} from "@/shared/logo";

const VISIBLE_ROUTES = [ROUTE_NAMES.HOME];

</script>

<template>
  <header v-show="VISIBLE_ROUTES.includes($route.name)">
    <ib-logo/>
  </header>
</template>

<style scoped>

</style>