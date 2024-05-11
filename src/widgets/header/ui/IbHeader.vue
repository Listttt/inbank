<script setup lang="ts">
import {ROUTE_NAMES} from "@/shared/config";
import {IbLogo} from "@/shared/logo";
import {watch, computed, reactive} from "vue";
import {useRoute} from "vue-router";

const VISIBLE_ROUTES: Array<ROUTE_NAMES> = [ROUTE_NAMES.HOME];

const ROUTE = reactive({show: VISIBLE_ROUTES.includes(useRoute().name as ROUTE_NAMES)});

watch(useRoute(), ({name}) => {
  ROUTE.show = VISIBLE_ROUTES.includes(name as ROUTE_NAMES);
})

const show = computed(() => {
  return ROUTE.show;
});
</script>

<template>
  <header v-show="show">
    <ib-logo/>
  </header>
</template>

<style scoped>

</style>