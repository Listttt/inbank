<script setup lang="ts">
import {IbImage} from "@/shared/image";
import {IbTranslatedText} from "@/entities/translated-text";
</script>

<template>
  <main class="ib-container">
    <div class="ib-home-page">
      <div class="ib-image">
        <ib-image
            src="/images/IMG_0783%201.png"
        />
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
.ib-home-page {
  display: flex;
  width: 100%;
}

.ib-image {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 200px;
  padding: 0;
  margin: 0;
}
</style>
