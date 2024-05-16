<script setup lang="ts">
// TODO: to much logic for simple ui, probably need to move into entities slice according FSD
import {useI18n} from "vue-i18n";
import {computed, defineProps, reactive, ref, nextTick} from "vue";
import type {Ref} from "vue";
const model = defineModel();

const {t} = useI18n();

const input = ref(null);

interface InputPropsInterface {
  label: string;
  validation?: Array<([val]: any) => boolean | string>,
  context?: string
}

const props = defineProps<InputPropsInterface>();

// TODO: refactor KISS
let isValid: Ref<boolean | string> = ref(true)

const validate = (event: FocusEvent) => {
    if(!!props.validation) {
      isValid.value = true;
      //@ts-ignore
      const value = event?.target.value;
      for (let validation of props.validation) {
        isValid.value = validation(value);

        if(typeof isValid.value != 'boolean') {
          if(!!props.context) {
            isValid.value = props.context.concat('.validation.').concat(isValid.value);
          }
          break;
        }
      }
    }

  return isValid;
}


const showMessage = ref(computed(() => {
  //FIX: for correct value reflecting on input after triggering message div.
  //@ts-ignore
      const saveValue = input?.value?.value;

      nextTick(() => {
        //@ts-ignore
        if(saveValue) input!.value!.value = saveValue;
      })

      //@ts-ignore
      return typeof isValid.value === "string"
    }
));

defineExpose({
  validate,
  isValid
})
</script>

<template>

  <div
      class="wrapper"
      :class="{
        invalid: showMessage
      }"
  >
    <input
        ref="input"
        @blur="validate"
        :placeholder="t(context?.concat('.').concat(label) || label)"
        name="ib-input"
        v-model="model"
        class="ib-input"
        v-bind="$attrs"
    />
    <div
        v-if="showMessage"
    >
      {{t(isValid as string)}}
    </div>
  </div>
</template>

<style scoped>
.ib-input {
  outline: none;
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

.invalid {
  color: #EB5757 !important;

  input {
    border-color: #EB5757 !important;
  }

  input:focus {
    border-color: #EB5757 !important;
    outline: none;
  }
}


.wrapper {
  width: 100%;
}

</style>