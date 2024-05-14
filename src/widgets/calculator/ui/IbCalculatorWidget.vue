<script setup lang="ts">
import {IbSlider} from "@/shared/slider";
import {IbInput} from "@/shared/input";
import {useCalculatorStore} from "@/widgets/calculator";
import {computed, reactive, watch, ref, onMounted} from "vue";
import type {Ref} from "vue";
import {watchDebounced} from "@vueuse/core";
import {IbSelect} from "@/shared/select";
import IbTranslatedText from "@/entities/translated-text/ui/IbTranslatedText.vue";
import {useRouter} from "vue-router";
//TODO: remove it
// import {HomePage} from "@/pages/home";
import {IbButton} from "@/shared/button";
import {IbDialog} from "@/shared/dialog";
import IbForm from "@/entities/form/ui/IbForm.vue";

const dialog: Ref<HTMLDialogElement> = ref<HTMLDialogElement>(null as unknown as HTMLDialogElement);

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






const router = useRouter();
const apply = () => {
  dialog.value.show();

  // router.addRoute('MAIN', { path: 'test', component: HomePage })
  // router.push('/test')
}
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


<!--    <dialog-->
<!--        class="ib-dialog"-->
<!--        open-->
<!--        ref="dialog"-->
<!--    >-->
<!--      test-->
<!--    </dialog>-->
<!--    <Teleport to="body">-->
      <ib-dialog ref="dialog">
        <ib-form :form-data="[
            {label: 'name', type: 'text', value: 'val', validation: [(val) => {return val === 'test' || 'test'}]},
            {label: 'amount', type: 'number', value: 'val', validation: [(val) => {return val === 'test' || 'test'}]},
            ]"
                 :submit="(payload) => {
                   store.sendRequest(payload).then(() => dialog.close());
                   // dialog.close();
                 }"
        />
<!--        <form @submit.prevent="dialog.close()">-->
<!--          <ib-input type="text" label="name"/>-->
<!--          <ib-input type="number" label="amount"/>-->
<!--          <ib-button type="submit" label="submit">-->
<!--            <ib-translated-text class="ib-translated-text" t-key="widget.calculator.button.apply"/>-->
<!--          </ib-button>-->
<!--        </form>-->
      </ib-dialog>
<!--    </Teleport>-->


    <ib-button @click="apply">
      <ib-translated-text class="ib-translated-text" t-key="widget.calculator.button.apply"/>
    </ib-button>
  </div>
</template>

<style scoped>
.ib-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-radius: 30px;
}
</style>