<script setup lang="ts">
import IbTranslatedText from "@/entities/translated-text/ui/IbTranslatedText.vue";

interface DetailRecordPropsInterface {
  tKey: string;
  value: number | string;
  context: string;
}
defineProps<DetailRecordPropsInterface>();
</script>

<template>
  <div class="ib-detail-record">
    <div class="inter-500">
      <ib-translated-text :t-key="context.concat('.').concat(tKey)"/>
    </div>
    <div class="inter-400 ib-detail-record_value">
      <ib-translated-text :t-key="context.concat('.').concat(tKey).concat('-value')" :data="{value}"/>
    </div>
  </div>

</template>

<style scoped>
  .ib-detail-record {
    display: flex;
    width: 100%;
  }
  .inter-500 {
    display: inline-flex;
    width: 50%;
  }
</style>