<script setup lang="ts">
import {onMounted, ref} from "vue";
import type {Ref} from "vue";

const slider: Ref<HTMLInputElement> = ref<HTMLInputElement>(null as unknown as HTMLInputElement);

onMounted(() => {
  function drawProgress(slider: HTMLInputElement): void {
    const progress: number = (+slider.value - +slider.min) / (+slider.max - +slider.min) * 100;
    slider.style.background = 'linear-gradient(to right, #21093A 0%, #21093A '+ progress + '%, #fff ' + progress + '%, #fff 100%)'
  }
   slider.value.oninput = function () {
     const self: HTMLInputElement = this as HTMLInputElement;
     drawProgress(this as HTMLInputElement)
   };

  drawProgress(slider.value);
})

</script>

<template>
  <input ref="slider" type="range" class="ib-slider">
</template>

<style scoped>
.ib-slider {
  -webkit-appearance: none;
  width: 100%;
}
</style>