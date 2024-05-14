<script setup lang="ts">
import {ref} from 'vue';

const dialog = ref<HTMLDialogElement>(null);

const visible = ref(false)
const showModal = () => {
  dialog.value?.showModal();
  visible.value = true;
};

defineExpose({
  show: showModal,
  close: (returnVal?: string): void => dialog.value?.close(returnVal),
  visible,
});
</script>

<template>
  <dialog
      ref="dialog"
      class="ib-dialog">
    <slot/>
  </dialog>
</template>

<style scoped>
.ib-dialog {
  position: absolute;
  margin: auto;
}
</style>