<script setup lang="ts">

import {IbButton} from "@/shared/button";
import {IbInput} from "@/shared/input";

interface FormSubmitInterface {
  method?: () => any;
  action?: any;
}
interface FormDataInterface {
  label: string;
  value?: string | number;
  type?: 'number' | 'text';
  validation?: Array<([value]: string) => boolean | string>;
}

interface FormDataInterface {}

// TODO: get key of ForDataInterface label
interface PayloadInterface {
  [key: string]: any;
}
interface FormPropsInterface {
  formData: Array<FormDataInterface>
  // submit: FormSubmitInterface;
  //TODO: add text for button
  submit: ([payload]?: any) => Promise<any> | any;
}
const props = defineProps<FormPropsInterface>();
function onSubmit() {
  const payload = props.formData.reduce((acc, item) => ({...acc, [item.label]: item.value}), {})
  props.submit(payload);
}
</script>

<template>
<form @submit.prevent="onSubmit">
  <ib-input v-for="(input, index) in formData"
            :key="index"
            :label="input.label"
            :type="input.type"
            v-model="input.value"
  />
  <ib-button type="submit"></ib-button>
</form>
</template>

<style scoped>

</style>