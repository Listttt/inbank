<script setup lang="ts">
import {IbSlider} from "@/shared/slider";
import {IbInput} from "@/shared/input";
</script>

<template>
  <div class="ib-container ib-content">
    <div>text</div>
    <div>calc</div>

    <ib-slider class="w-3" min="100" max="7000" value="1000"/>
    <ib-input label="test" type="number"/>
  </div>
</template>

<style scoped>
.ib-content {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  padding: 0px;
}
</style>