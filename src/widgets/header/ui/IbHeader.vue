<script setup lang="ts">
import {ROUTE_NAMES} from "@/shared/config";
import {IbLogo} from "@/shared/logo";
import {computed, reactive, watch} from "vue";
import {useRoute} from "vue-router";

const VISIBLE_ROUTES: Array<ROUTE_NAMES> = [ROUTE_NAMES.HOME, ROUTE_NAMES.NOT_FOUND];

const ROUTE = reactive({show: VISIBLE_ROUTES.includes(useRoute().name as ROUTE_NAMES)});

watch(useRoute(), ({name}) => {
  ROUTE.show = VISIBLE_ROUTES.includes(name as ROUTE_NAMES);
})

const show = computed(() => {
  return ROUTE.show;
});
</script>

<template>
  <header class="ib-header" v-show="show">
    <ib-logo/>
  </header>
</template>

<style scoped>
.ib-header {
  align-self: flex-start;
  height: clamp(4.5rem, 15.6vw - 3rem, 7rem);;
  padding: clamp(1rem, 3.1vw - 0.5rem, 1.5rem) clamp(1rem, 4vw - 0.75rem, 2.5rem);
}
</style>
