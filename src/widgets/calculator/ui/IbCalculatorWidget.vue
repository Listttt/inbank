<script setup lang="ts">
import {IbSlider} from "@/shared/slider";
import {IbInput} from "@/shared/input";
import {useCalculatorStore} from "@/widgets/calculator";
import {computed, reactive, watch, ref} from "vue";
import type {Ref} from "vue";
import {watchDebounced} from "@vueuse/core";
import {IbSelect} from "@/shared/select";
import IbTranslatedText from "@/entities/translated-text/ui/IbTranslatedText.vue";

const store = useCalculatorStore();
store.fetchCalculatorData();

const amount = defineModel<number>('amount');

const calcData = ref(computed(() => store.getCalculatorData));
const offer = ref(computed(() => store.getCalculatorOffer));

const watchForAmount = watch(calcData, (data) => {
  amount.value = (data.max - data.min) / 2;
  watchForAmount();
});

watchDebounced(amount, (value: number | undefined) => {
      store.calculateOffer(value as number, period.value!);
    },
    {debounce:300}
)


const period = defineModel<number>('period');

watchDebounced(period, (value: number | undefined) => {
      store.calculateOffer(amount.value!, value as number);
    },
    {debounce:300}
)
// TODO: on button


// TODO: bring proper interface Ref<Array<CalculatorOptionsInterface>>
let periodOptions: Ref<Array<any>> = ref([]);
let periodStep: Ref<number> = ref(0);

const watchForPeriod = watch(calcData, ({periods}) => {
  periodStep = ref(periods[periods.length-1] / periods.length);
  period.value = periods[0];

  periodOptions = ref(periods.map(value => ({name: 'select.options.period', value})));
  watchForPeriod();
});
</script>

<template>
  <div class="ib-container ib-content">
    <div>text</div>
    <div>calc</div>


    <ib-slider v-if="calcData.min" :min="calcData.min" :max="calcData.max" v-model.number="amount"/>
    {{calcData.min}}
    {{calcData.max}}
    <ib-input label="amount" v-model.number="amount" type="number"/>

    <ib-slider v-if="periodStep" step="6" :min="calcData.periods[0]" :max="calcData.periods[calcData.periods.length -1]" v-model.number="period"/>
    <ib-translated-text v-if="periodOptions.length"t-key="widget.calculator.range.min" :data="{value: periodOptions[0].value}"/>
    <ib-translated-text v-if="periodOptions.length" t-key="widget.calculator.range.max" :data="{value: periodOptions[periodOptions.length - 1].value}"/>
    <ib-select v-model.number="period" :options="periodOptions"/>
    {{offer}}
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