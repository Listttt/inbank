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
  height: 112px;
  padding: 24px 40px;

  svg {
    height: 100%;
  }

  @media (max-width: 770px) {
    height: 72px;
    padding: 16px;
  }
}
</style>