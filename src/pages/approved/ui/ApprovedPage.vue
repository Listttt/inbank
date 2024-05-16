<script setup lang="ts">

import {IbInfoCard} from "@/widgets/info-card";
import {IbImage} from "@/shared/image";
import {IbTranslatedText} from "@/entities/translated-text";
import {IbButton} from "@/shared/button";
import {IbDetailRecordWidget} from "@/widgets/detail-record";

import {ROUTE_NAMES} from "@/shared/config";
import {useDynamicRoutesStore} from "@/features/dynamic-routes";

const dynamicRoutesStore = useDynamicRoutesStore();

interface ApprovedPagePropsInterface {
  amount: number;
  //TODO: create currency type
  currency: string;
  payment: string;
  period: number
}

const props = defineProps<ApprovedPagePropsInterface>()

const {amount, period, payment} = props;
//TODO: create common currency formatter.
const formatValueWithCurrencySign = (value: string | number): string => Intl.NumberFormat('de-DE', { style: 'currency', currency: props.currency || 'EUR'  }).format(+value || 0);
const details = { amount: formatValueWithCurrencySign(amount), period, payment: formatValueWithCurrencySign(payment)};


</script>

<template>
  <div class="ib-approved-page">
    <div class="ib-container">
      <!--   TODO: move to separate widget-->
      <ib-info-card class="ib-info-card">
        <div class="card-image-section">
          <div class="padding">
            <ib-image src="/images/small-loan.png" class="ib-image"/>
          </div>
        </div>

        <div class="card-message-section">
          <div class="card-message-section_congrats">
            <div class="bitter-400 text-48-line-56">
              <ib-translated-text t-key="page.approved.info-card.congratulation"/>
            </div>
            <div class="inter-400">
              <ib-translated-text t-key="page.approved.info-card.message"/>
            </div>
          </div>


<!--          TODO: component-->
          <div class="card-message-section_details">
            <ib-detail-record-widget
                v-for="([key, value], i) in Object.entries(details)"
                class="card-message-section_details_record"
                :key="i"
                context="page.approved.info-card.detail"
                :value="value as string | number"
                :t-key="key"
            />
          </div>
          <ib-button class="ib-button" @click="dynamicRoutesStore.removeDynamicRoute($route.name as string), $router.push({name: ROUTE_NAMES.HOME})">
            <ib-translated-text t-key="page.approved.button"/>
          </ib-button>
        </div>

      </ib-info-card>
    </div>
  </div>
</template>

<style scoped>
.ib-approved-page {
  position: absolute;
  background: #FBFBF9;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.ib-container {
  padding: clamp(0rem, -9.55rem + 19.843vw, 9.5rem) clamp(0rem, -10.555rem + 21.932vw, 10.5rem);
}

.ib-info-card {
  display: flex;
  align-items: center;
  gap: 0;
  padding: 0px;
  border: 4px solid #FFFFFF;
  border-radius: 20px 0px 0px 20px;

  @media (max-width: 770px) {
    flex-wrap: wrap;
    justify-content: center;
  }

}

.card-image-section {
  display: flex;
  align-items: center;
  background: #F0F0EA;
  max-width: 50%;
  padding: 80px 0 80px 80px;
  height: 100%;

  @media (max-width: 770px) {
    max-width: unset;
    padding: 40px 60px 24px;
    background: unset;
  }
}

.card-message-section {
  min-width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: clamp(1rem, -7.921rem + 18.538vw, 9.875rem) clamp(1rem, -4.403rem + 11.227vw, 6.375rem);

  @media (max-width: 770px) {
    min-width: 100%;
  }
}

.card-message-section_details {
  display: flex;
  width: 100%;
  flex-direction: column;
  border-top: 1px solid rgba(33, 9, 58, 0.3);
}

.card-message-section_details_record {
  padding: 12px 0;
  border-bottom: 1px solid rgba(33, 9, 58, 0.3);
}

.ib-image {
  position: relative;
  left: 58px;
  @media (max-width: 770px) {
    position: unset;
    left: unset;
  }
}

.padding{
  width: 100%;
  height: 100%;

  @media (max-width: 770px) {
    padding: clamp(2.5rem, -0.793rem + 14.634vw, 6.25rem) clamp(2.813rem, -0.206rem + 13.415vw, 6.25rem);
    background: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQwIiBoZWlnaHQ9IjI0MCIgdmlld0JveD0iMCAwIDI0MCAyNDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMjAuMDQxIDAuMDAwMjkwNDA2QzcyLjc2MSAwLjAwMDI4NDIwMSA0NC43MjkgNy44Nzc5NyAyNi4zMDkgMjYuMzI3NEM3LjkwMTAyIDQ0Ljc4ODggMC4wNDEwMjE4IDcyLjg4MzkgMC4wNDEwMTU2IDEyMC4yN0wyNDAuMDQxIDEyMC4yN0MyNDAuMDQxIDcyLjg4MzkgMjMyLjE4MSA0NC43ODg4IDIxMy43NzMgMjYuMzI3NEMxOTUuMzY1IDcuODY1OTUgMTY3LjMzMyAwLjAwMDI5NjYxMiAxMjAuMDQxIDAuMDAwMjkwNDA2WiIgZmlsbD0iI0YwRjBFQSIvPgo8cGF0aCBkPSJNMC4wNDEwMzEzIDEyMC4wOUMwLjA0MTAyNTEgMTY3LjMzNSA3LjkwMTAyIDE5NS4zNDYgMjYuMzA5IDIxMy43NTJDNDQuNzI5IDIzMi4xNDYgNzIuNzYxIDI0MCAxMjAuMDQxIDI0MEMxNjcuMzIxIDI0MCAxOTUuMzUzIDIzMi4xNDYgMjEzLjc3MyAyMTMuNzUyQzIzMi4xOTMgMTk1LjM0NiAyNDAuMDQxIDE2Ny4zNDcgMjQwLjA0MSAxMjAuMDlMMC4wNDEwMzEzIDEyMC4wOVoiIGZpbGw9IiNGMEYwRUEiLz4KPC9zdmc+Cg==") no-repeat center;
    background-size: contain;
  }
}


.ib-button {
  min-width: 100%;
}

</style>