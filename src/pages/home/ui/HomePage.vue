<script setup lang="ts">
import IbImage from "@/shared/image/ui/IbImage.vue";
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
