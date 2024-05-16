<script setup lang="ts">

import {IbTranslatedText} from "@/entities/translated-text";
import {IbButton} from "@/shared/button";

let click = () => {};
const onClick = (fn: () => {}) => click = fn;

defineExpose(
    {
      onClick
    }
)
</script>

<template>
  <div class="ib-card-widget">
    <div class="ib-card-widget_text">
      <div class="inter-500">
        <ib-translated-text t-key="card.lines.first"/>
      </div>
      <div class="bitter-400">
        <ib-translated-text t-key="card.lines.second"/>
      </div>
      <div class="inter-400">
        <ib-translated-text t-key="card.lines.third"/>
      </div>
    </div>

    <div class="ib-card-widget_action">
      <ib-button class="ib-button" @click="click()">
        <ib-translated-text t-key="widget.card.button"/>
      </ib-button>
    </div>
  </div>
</template>

<style scoped>
.ib-card-widget {
  background: #D9D4A7;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: clamp(4rem, -6.021rem + 20.822vw, 13.969rem) clamp(1.5rem, 0.495rem + 2.089vw, 2.5rem)
}


.ib-button {
  background: #F0F0EA !important;
}
</style>