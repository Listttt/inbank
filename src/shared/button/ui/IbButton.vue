<script setup lang="ts">

interface ButtonPropsInterface {
  disabled?: boolean
}

const props = defineProps<ButtonPropsInterface>();
</script>

<template>
  <button
      class="ib-button inter-400"
      :class="{disabled}"
  >
    <slot />
  </button>
</template>

<style scoped>
.ib-button {
  display: inline-block;
  text-align: center;

  height: 48px;
  background: #AA93FF;
  padding: 12px 24px;
  border: 0;
  border-radius: 100px;
}

.ib-button:hover {
  background: #BBA8FF;
}

.ib-button:focus {
  background: #BBA8FF;
}

.ib-button:active {
  background: #9F85FF;

}

.disabled {
  background: #DEDEDE;
  pointer-events: none;
}
</style>