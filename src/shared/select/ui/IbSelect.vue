<script setup lang="ts">
import {useI18n} from "vue-i18n";

const model = defineModel();

const {t} = useI18n();
//TODO: place it
interface OptionInterface {
  name: string;
  value: any;
}
interface SelectPropsInterface {
  options: Array<OptionInterface>
}
defineProps<SelectPropsInterface>();
</script>

<template>
<select v-model="model" class="ib-select">
  <option v-for="({name, value}) in options" :key="value" :value="value">{{t(name, {value})}}</option>
</select>
</template>

<style scoped>
.ib-select {
//-webkit-appearance: none;
  width: 100%;
  height: 48px;
  border: 1px solid #60378B;
  border-radius: 8px;
  background: white;
  gap: 10px;
  padding: 0 3rem 0 1rem;

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding: 0 1rem;
}
</style>