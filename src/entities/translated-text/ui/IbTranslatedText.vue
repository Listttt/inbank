<script setup lang="ts">
import {defineProps} from 'vue';
import {IbText} from "@/shared/text";
import {useI18n} from "vue-i18n";

const {t} = useI18n();
//TODO: move to models
interface TranslatedTextPropsInterface {
  tKey: string
};

defineProps<TranslatedTextPropsInterface>();
</script>

<template>
  <ib-text><div v-html="t(tKey || 'missing key')"/></ib-text>
</template>

<style scoped>

</style>