<script setup lang="ts">
import {ref} from 'vue';
import type {Ref} from 'vue';

const dialog: Ref<HTMLDialogElement> = ref<HTMLDialogElement>(null as unknown as HTMLDialogElement);

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
  <Teleport to="body">
    <dialog
        ref="dialog"
        class="ib-dialog"
    >
      <slot/>
    </dialog>
  </Teleport>
</template>

<style scoped>
.ib-dialog {
  position: absolute;
  margin: auto;
  padding: 40px;
  border-radius: 30px;
  border: 0px;

  @media (max-width: 770px) {
    bottom: 0;
    position: sticky;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    min-width: 100%;
    padding: 24px;
  }
}
</style>