<script setup lang="ts">
import {IbInfoCard} from "@/widgets/info-card";
import {IbTranslatedText} from "@/entities/translated-text";
import {IbButton} from "@/shared/button";
import {useDynamicRoutesStore} from "@/features/dynamic-routes";
import {ROUTE_NAMES} from "@/shared/config";

interface RejectedPagePropsInterface{
  name: string;
  reason: string;
}

const dynamicRoutesStore = useDynamicRoutesStore();

defineProps<RejectedPagePropsInterface>();
</script>

<template>
  <div class="ib-rejected-page">
    <div class="ib-container">
<!--   TODO: move to separate widget-->
      <ib-info-card class="ib-info-card">
        <div class="message">
          <div class="bitter-400">
            <ib-translated-text t-key="page.rejected.info-card.greeting" :data="{name}"/>
          </div>
          <div class="inter-500">
            <ib-translated-text t-key="page.rejected.info-card.message"/>
          </div>
        </div>
        <div class="inter-400 font-size-14">
          <hr>
          <div class="reason">
            <ib-translated-text :t-key="'page.rejected.info-card.reason.'+reason"/>
          </div>
          <hr>
        </div>

        <ib-button class="ib-button" @click="dynamicRoutesStore.removeDynamicRoute($route.name as string), $router.push({name: ROUTE_NAMES.HOME})">
          <ib-translated-text t-key="page.rejected.button"/>
        </ib-button>
      </ib-info-card>
    </div>
  </div>
</template>

<style scoped>
.ib-rejected-page {
  position: absolute;
  background: #FBFBF9;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
}

.ib-container {
  padding: clamp(0rem, -9.55rem + 19.843vw, 9.5rem) clamp(0rem, -23.371rem + 48.564vw, 23.25rem);
}

.ib-info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;
  align-items: center;
  padding: clamp(2.5rem, -0.013rem + 5.222vw, 5rem) clamp(1rem, -10.811rem + 24.543vw, 12.75rem);

  @media (max-width: 770px) {
    height: 100%;
    justify-content: start;
  }
}

.ib-button {
  min-width: 100%;
}

.reason {
  padding: 17px 16px;
  opacity: 0.75;

}

.message .bitter-400 {
  font-size: 48px;
  line-height: 56px;
}

hr {
  border-top: 1px solid rgba(33, 9, 58, 0.3);
  opacity: 0.75;
}
</style>