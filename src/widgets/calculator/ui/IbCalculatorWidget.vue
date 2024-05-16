<script setup lang="ts">
import {IbSlider} from "@/shared/slider";
import {IbInput} from "@/shared/input";
import {IbSelect} from "@/shared/select";
import {IbTranslatedText} from "@/entities/translated-text";
import {IbButton} from "@/shared/button";
import {IbDialog} from "@/shared/dialog";
import {IbForm} from "@/entities/form";
import {useCalculatorStore} from "@/widgets/calculator";
import {computed, reactive, watch, ref, onMounted} from "vue";
import type {Ref} from "vue";
import {watchDebounced} from "@vueuse/core";
import {useRouter} from "vue-router";

const dialog: Ref<HTMLDialogElement> = ref<HTMLDialogElement>(null as unknown as HTMLDialogElement);

const store = useCalculatorStore();
store.fetchCalculatorData();

const amount = defineModel<number>('amount');

const calcData = ref(computed(() => store.getCalculatorData));
const payment = ref(computed(() => store.getCalculatorOfferPayment));

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
    {{payment}}

      <ib-dialog ref="dialog">
        <div class="ib-dialog_topic">
          <span class="inter-medium">
            <ib-translated-text t-key="widget.calculator.dialog.topic"/>
          </span>
          <span
              @click="dialog.close()"
              class="close-dialog"
          />


        </div>
<!--    TODO: request form data from HOST.-->
        <ib-form
            context="widget.calculator.form"
            :form-data="[
                    {label: 'name', type: 'text', value: '', validation: [(val) => {return !!val.length || 'required'}]},
                    {label: 'lastname', type: 'text', value: '', validation: [(val) => {return !!val.length || 'required'}]},
                    {label: 'phone', type: 'number', value: '', validation: [(val) => {return val.length >= 7 && val.length <= 8|| 'number-size'}, (val) => {return val.startsWith('55') || 'number-start'}]},
                    {label: 'email', type: 'text', value: '', validation: [(val) => {return !!val?.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) || 'email'}]},
                    {label: 'income', type: 'number', value: '', validation: [(val) => {return +val >= 100 || 'poor'}]},
                 ]"
                 :submit="(payload) => {
                   store.sendRequest(payload).then(() => dialog.close());
                 }"
        />
      </ib-dialog>
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


.ib-dialog_topic {
  width: clamp(22.5rem, 11.191rem + 23.499vw, 33.75rem);
  display: flex;
  justify-content: space-between;

  @media (max-width: 770px) {
    width: 100%;
  }

}

.close-dialog {
  background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTYgNkwxOCAxOE0xOCA2TDYgMTgiIHN0cm9rZT0iIzIxMDkzQSIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgo8L3N2Zz4K");
  background-size: contain;
  background-repeat: no-repeat;
  width: 24px;
  cursor: pointer;
}
</style>