<script setup lang="ts">
import {IbImage} from "@/shared/image";
import {IbCardWidget} from "@/widgets/card";
import {IbCalculatorWidget} from "@/widgets/calculator";
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
    <div class="ib-calculator">
      <ib-calculator-widget/>
    </div>
  </main>
</template>

<style scoped>
.ib-content {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  padding: 16px 40px 80px;

  @media (max-width: 770px) {
    flex-wrap: wrap;
    gap: 16px;
    padding: 16px 16px 40px;
  }
}

.ib-image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: clamp(6.25rem, -0.033rem + 13.055vw, 12.5rem);
  padding: 0;
  margin: 0;

  @media (max-width: 770px) {
    order: 1;
  }
}

.ib-card {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: clamp(6.25rem, -0.033rem + 13.055vw, 12.5rem);
  padding: 0;
  margin: 0;
  max-width: calc(100% / 12 * 5);

  @media (max-width: 770px) {
    order: 2;
    min-width: 100%;
    min-height: 100%;
  }
}

.ib-calculator {
  position: absolute;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  background: #E3D2FF;
  //height: -webkit-fill-available;
}

</style>
