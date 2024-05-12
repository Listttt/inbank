<script setup lang="ts">
import {IbImage} from "@/shared/image";
import {IbTranslatedText} from "@/entities/translated-text";
import {IbCardWidget} from "@/widgets/card";
</script>

<template>
  <main class="ib-container">
    <div class="ib-content">
      <div class="ib-card">
        <ib-card-widget/>
      </div>
      <div class="ib-image">
        <ib-image
            src="/images/IMG_0783%201.png"
        />
      </div>
    </div>
    <ib-translated-text t-key="test"/>
  </main>
</template>

<style scoped>
.ib-content {
  display: flex;
  gap: 12px;
  justify-content: space-between;
  padding: 16px 40px 80px;
}

.ib-image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: clamp(6.25rem, -0.033rem + 13.055vw, 12.5rem);
  padding: 0;
  margin: 0;
}

.ib-card {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: clamp(6.25rem, -0.033rem + 13.055vw, 12.5rem);
  padding: 0;
  margin: 0;
  min-width: calc(100% / 12 * 5)
}
</style>
