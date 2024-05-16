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
  <div>
    <select v-bind="$attrs" v-model="model" class="ib-select">
      <option v-for="({name, value}) in options" :key="value" :value="value">{{t(name, {value})}}</option>
    </select>
    <div class="underlay"></div>
  </div>

</template>

<style scoped>
.ib-select {
  -webkit-appearance: none;
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xIDAuOTk5NTEyTDcgNi45OTk1MUwxMyAwLjk5OTUxMiIgc3Ryb2tlPSIjNjA2MDYwIiBzdHJva2Utd2lkdGg9IjEuNSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPgo=");
  background-repeat: no-repeat;
  background-position-x: calc(100% - 20px);
  background-position-y: 50%;
  width: 100%;
  height: 48px;
  border: 1px solid #60378B;
  border-radius: 8px;
  gap: 10px;
  padding: 0 3rem 0 1rem;

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding: 0 1rem;
}

.underlay {
  width: inherit;
  height: 48px;
  background: white;
  border-radius: 8px;
  margin-top: -48px;
}
</style>