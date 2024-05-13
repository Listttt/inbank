<script setup lang="ts">
import {onMounted, ref, watch} from "vue";
import type {Ref} from "vue";

const model = defineModel();

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

  watch(model, (value) => {
    // draw progress on next animation frame when slider value will be evaluated
    setTimeout(() => {
      drawProgress(slider.value)
    }, 0);
  })

  drawProgress(slider.value);
})

</script>

<template>
  <input ref="slider" type="range" v-model.number="model" class="ib-slider">
</template>

<style scoped>
.ib-slider {
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
}

.ib-slider::-webkit-slider-thumb{
  -webkit-appearance: none;
  appearance: none;
  width: 23px;
  height: 24px;
  border: 0;
  background-image: url("data:image/svg+xml,%3Csvg width='22' height='12' viewBox='0 0 22 12' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M9 6L1 6' stroke='%2321093A'/%3E%3Cpath d='M6 1L1 6L6 11' stroke='%2321093A'/%3E%3Cpath d='M13 6L21 6' stroke='%2321093A'/%3E%3Cpath d='M16 1L21 6L16 11' stroke='%2321093A'/%3E%3C/svg%3E%0A");
  background-position: center center;
  background-repeat: no-repeat;
  cursor: pointer;
  width: 52px;
  height: 36px;
  border-radius: 100px;
  background-color: #AA93FF;
}
</style>