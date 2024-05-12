<script setup lang="ts">
import {defineProps} from 'vue';
interface ImagePropsInterface {
  src: string
};

defineProps<ImagePropsInterface>();
</script>

<template>
  <img
      :src="src"
      class="ib-image"
  />
</template>

<style scoped>
.ib-image {
  width: 100%;
}

</style>