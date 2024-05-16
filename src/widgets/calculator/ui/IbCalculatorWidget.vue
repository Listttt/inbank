<script setup lang="ts">
import {IbSlider} from "@/shared/slider";
import {IbInput} from "@/shared/input";
import {IbSelect} from "@/shared/select";
import {IbTranslatedText} from "@/entities/translated-text";
import {IbButton} from "@/shared/button";
import {IbDialog} from "@/shared/dialog";
import {IbForm} from "@/entities/form";
import {useCalculatorStore} from "@/widgets/calculator";
import {computed, reactive, ref, onMounted, watch, nextTick} from "vue";
import type {Ref} from "vue";
import {watchDebounced} from "@vueuse/core";
import {useRouter} from "vue-router";
import type {CalculatorDataInterface} from "@/widgets/calculator";

const dialog: Ref<HTMLDialogElement> = ref<HTMLDialogElement>(null as unknown as HTMLDialogElement);

const store = useCalculatorStore();
store.fetchCalculatorData();

const amount = defineModel<number>('amount');

const calcData: Ref<CalculatorDataInterface> = ref(computed(() => store.getCalculatorData));
const payment = ref(computed(() => store.getCalculatorOfferPayment));

const watchForAmount = watch(calcData, (data) => {
  amount.value = (data.max - data.min) / 2;
  watchForAmount();
});

watchDebounced(amount, (value: number | undefined) => {
      !amountInput?.value.valid || store.calculateOffer(value as number, period.value!);
    },
    {debounce:300}
)

const period = defineModel<number>('period');

watchDebounced(period, (value: number | undefined) => {
      !amountInput?.value.valid || store.calculateOffer(amount.value!, value as number);
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


const formatWithCurrency = (value: string | number) => Intl.NumberFormat('de-DE', { style: 'currency', currency: calcData?.value.currency || 'EUR', minimumFractionDigits: 0 }).format(+value || 0);

const amountInput = ref();

onMounted(() => {
  watch(amount, (val) => {
    // check on next animation frame
    nextTick(() => {
      amountInput.value.validate();
    } );
  })
})
</script>

<template>
  <div class="ib-container ib-content">
    <div class="ib-calculator-widget_text">
      <div
          class="bitter-400"
      >
        <ib-translated-text t-key="widget.calculator.text.message"/>
      </div>
      <div
          class="inter-400"
      >
        <ib-translated-text t-key="widget.calculator.text.details"/>
      </div>
    </div>

    <div class="ib-calculator-widget_calculator">
      <div class="ib-calculator-widget-inputs">

        <div class="ib-calculator-widget_calculator_amount">
          <div class="ib-calculator-widget_calculator_amount_slider">
            <ib-slider v-if="calcData.min" :min="calcData.min" :max="calcData.max" v-model.number="amount"/>
            <div class="ib-calculator-widget_calculator_amount_slider_values">
            <span>
              {{formatWithCurrency(calcData.min)}}
            </span>
              <span>
              {{formatWithCurrency(calcData.max)}}
            </span>
            </div>
          </div>
          <div class="ib-calculator-widget_calculator_amount_input">

            <!--          TODO: add possibility to pass data for validation translations-->
            <ib-input
                ref="amountInput"
                label="amount"
                :validation="[
                  (val) => (+val >= +`${calcData.min}`&& +val <= +`${calcData.max}`) || 'widget.calculator.input.amount.validation.error']"
                v-model.number="amount"
                type="number"
            />
          </div>
        </div>

        <div class="ib-calculator-widget_calculator_range">
          <div class="ib-calculator-widget_calculator_range_slider">
            <ib-slider v-if="periodStep" step="6" :min="calcData.periods[0]" :max="calcData.periods[calcData.periods.length -1]" v-model.number="period"/>
            <div class="ib-calculator-widget_calculator_range_slider_values">
              <ib-translated-text v-if="periodOptions.length"t-key="widget.calculator.range.min" :data="{value: periodOptions[0].value}"/>
              <ib-translated-text v-if="periodOptions.length" t-key="widget.calculator.range.max" :data="{value: periodOptions[periodOptions.length - 1].value}"/>
            </div>
          </div>
          <div class="ib-calculator-widget_calculator_range_select">
            <ib-select v-model.number="period" :options="periodOptions"/>
          </div>
        </div>
      </div>

      <div class="ib-calculator-widget-output">
        <div class="ib-calculator-widget-output_result">
          <div class="inter-400">
            <ib-translated-text t-key="widget.calculator.output.payment"/>
          </div>

          <div class="bitter-400">
            {{payment}}
          </div>
        </div>

        <ib-button :disabled="amountInput?.invalid" @click="apply">
          <ib-translated-text class="ib-translated-text" t-key="widget.calculator.button.apply"/>
        </ib-button>

        <div class="text-left inter-400 text-12-line-16">
          <ib-translated-text t-key="widget.calculator.output.warning"/>
        </div>
      </div>
    </div>

  </div>

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
</template>

<style scoped>
.ib-content {
  display: flex;
  width: 100%;
  align-items: center;
  padding: 80px 40px !important;
  border-radius: 30px;

  @media (max-width: 770px) {
    flex-direction: column;
    padding: 40px 16px !important;
    gap: 40px;
  }
}

.ib-calculator-widget_text {
  display: flex;
  flex-direction: column;;
  justify-content: center;
  align-items: center;
  width: 50%;
  padding: 72px 40px;

  @media (max-width: 770px) {
    padding: 0;
    width: 100%;
    display: block;


    >.inter-400, >.bitter-400  {
      text-align: start;
    }
  }
}

.ib-calculator-widget_calculator {
  display: flex;
  flex-direction: column;;
  justify-content: center;
  align-items: center;
  width: 50%;
  gap: 40px;
  border-left: 1px solid rgba(33,9,58,.2);
  padding-left: 40px;

  @media (max-width: 770px) {
    padding: 0;
    border: none;
    width: 100%
  }
}

.ib-calculator-widget-inputs {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.ib-calculator-widget_calculator_amount {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 770px) {
    flex-direction: column;
  }
}

.ib-calculator-widget_calculator_amount_slider {
  width: inherit;

  @media (max-width: 770px) {
    order: 2
  }
}

.ib-calculator-widget_calculator_amount_slider_values {
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
}

.ib-calculator-widget_calculator_amount_input {
  min-width: 160px;
  width: 160px;

  @media (max-width: 770px) {
    order: 1;
    min-width: unset;
    width: unset;
  }
}

.ib-calculator-widget_calculator_range {
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 24px;

  @media (max-width: 770px) {
    flex-direction: column;
  }
}

.ib-calculator-widget_calculator_range_slider {
  width: inherit;

  @media (max-width: 770px) {
    order: 2;
  }
}

.ib-calculator-widget_calculator_range_slider_values {
  display: flex;
  justify-content: space-between;
  padding-top: 6px;
}

.ib-calculator-widget_calculator_range_select {
  min-width: 160px;

  @media (max-width: 770px) {
    order: 1;
  }
}

.ib-calculator-widget-output {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px
}

.ib-calculator-widget-output_result {
  display: flex;
  flex-direction: column;
  align-items: center;
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