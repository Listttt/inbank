<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {defineProps} from "vue";
const model = defineModel();

const {t} = useI18n();

export interface InputPropsInterface {
  label: string;
}
defineProps<InputPropsInterface>();
</script>

<template>
    <input :placeholder="t(label)" name="ib-input" v-model.number="model" class="ib-input">
</template>

<style scoped>
.ib-input {
  width: 100%;
  height: 48px;
  border: 1px solid #60378B;
  border-radius: 8px;
  gap: 10px;

  font-family: "Inter", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  padding: 0 1rem;
}
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

</style>