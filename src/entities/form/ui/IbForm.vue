<script setup lang="ts">

import {IbButton} from "@/shared/button";
import {IbInput} from "@/shared/input";
import {IbTranslatedText} from "@/entities/translated-text";
import {computed, ref} from "vue";
import type {Ref} from "vue";

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
  submit: ([payload]?: any) => Promise<any> | any;
  context?: string;
}
const props = defineProps<FormPropsInterface>();
function onSubmit() {
  const payload = props.formData.reduce((acc, item) => ({...acc, [item.label]: item.value}), {})
  props.submit(payload);
}

const inputs: Ref<Array<any>> = ref([]);
const disabled = computed(() => {
  return inputs.value.some((input: any) => typeof input.isValid === 'string')
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <ib-input v-for="(input, index) in formData"
              :ref="el => !el || inputs.push(el)"
              :context="context"
              :key="index"
              :label="input.label"
              :type="input.type"
              :validation="input.validation as Array<([val]: any) => boolean | string>"
              v-model="input.value"
              class="ib-form-input"
    />
    <ib-button class="ib-button" :disabled="disabled" type="submit">
      <ib-translated-text t-key="entities.form.submit"/>
    </ib-button>
  </form>
</template>

<style scoped>
.ib-form-input {
  margin: 16px 0 !important;
}

.ib-button {
  width: 100%;
}
</style>