<script setup lang="ts">
import {IbInfoCard} from "@/widgets/info-card";
import IbTranslatedText from "@/entities/translated-text/ui/IbTranslatedText.vue";

interface RejectedPagePropsInterface{
  name: string;
  reason: string;
}

defineProps<RejectedPagePropsInterface>();
</script>

<template>
  <div class="ib-rejected-page">
    <div class="ib-container">
      <ib-info-card class="ib-info-card">
        <ib-translated-text t-key="page.rejected.info-card.greeting" :data="{name}"/>
        <ib-translated-text t-key="page.rejected.info-card.message"/>
        <ib-translated-text :t-key="'page.rejected.info-card.reason.'+reason"/>
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
  padding: 152px 372px;
}

.ib-info-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>