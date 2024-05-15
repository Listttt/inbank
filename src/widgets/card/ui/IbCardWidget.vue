<script setup lang="ts">

import {IbTranslatedText} from "@/entities/translated-text";
</script>

<template>
  <div class="ib-card-widget">
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
  padding: clamp(4rem, -6.775rem + 22.389vw, 14.719rem) clamp(1.5rem, 0.495rem + 2.089vw, 2.5rem);
}

</style>