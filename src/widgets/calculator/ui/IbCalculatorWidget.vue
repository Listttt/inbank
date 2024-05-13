<script setup lang="ts">
import {IbSlider} from "@/shared/slider";
import {IbInput} from "@/shared/input";
import {useCalculatorStore} from "@/widgets/calculator";
import {computed, reactive, watch, ref} from "vue";
import {watchDebounced} from "@vueuse/core";

const store = useCalculatorStore();
store.fetchCalculatorData();
const amount = defineModel('amount');

const datas = ref(computed(() => store.getCalculatorData))

const unwatch = watch(datas, (data) => {
  amount.value = (data.max - data.min) / 2;
  unwatch();
});

watchDebounced(amount, (value: any) => {
      store.calculateOffer(+value, +value);
    },
    {debounce:300}
)
// TODO: on button
</script>

<template>
  <div class="ib-container ib-content">
    <div>text</div>
    <div>calc</div>


    <ib-slider class="w-3" v-if="datas.min" :min="datas.min" :max="datas.max" v-model.number="amount"/>
    {{datas.min}}
    {{datas.max}}
    <ib-input label="amount" v-model.number="amount" type="number"/>
  </div>
</template>

<style scoped>
.ib-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px;
}
</style>