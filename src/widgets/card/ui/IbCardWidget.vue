<script setup lang="ts">

import {IbTranslatedText} from "@/entities/translated-text";
</script>

<template>
  <div class="ib-card-widget">
    <div class="card-first-line">
      <ib-translated-text t-key="card.lines.first"/>
    </div>
    <div class="card-second-line">
      <ib-translated-text t-key="card.lines.second"/>
    </div>
    <div class="card-third-line">
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

.card-first-line {
  font-family: "Inter", serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #21093A;
}

.card-second-line {
  font-family: "Bitter", serif;
  font-weight: 400;
  font-size: clamp(2rem, -0.262rem + 4.7vw, 4.25rem);
  line-height: clamp(2.25rem, -0.012rem + 4.7vw, 4.5rem);
  text-align: center;
  color: #21093A;
  margin: 16px 0 clamp(0.5rem, -0.003rem + 1.044vw, 1rem);
}

.card-third-line {
  font-family: "Inter", serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: #21093A;
}


</style>