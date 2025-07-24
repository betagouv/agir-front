<template>
  <component :is="componentType" v-model="modelValue" :question-view-model="questionViewModel" v-bind="extraProps">
    <template #complement>
      <slot name="complement" />
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { computed, defineModel, defineProps } from 'vue';
  import KYCChoixMultiple from './KYCTypes/KYCChoixMultiple.vue';
  import KYCChoixUnique from './KYCTypes/KYCChoixUnique.vue';
  import KYCMosaic from './KYCTypes/KYCMosaic.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  const modelValue = defineModel<string[]>();
  const props = defineProps<{
    questionViewModel: QuestionViewModel;
    styleDuTitre?: string;
  }>();

  const componentMap: Record<string, typeof KYCMosaic | typeof KYCChoixUnique | typeof KYCChoixMultiple> = {
    mosaic_boolean: KYCMosaic,
    choix_unique: KYCChoixUnique,
    choix_multiple: KYCChoixMultiple,
  };

  const componentType = computed(() => componentMap[props.questionViewModel.type]);

  const extraProps = computed(() => {
    return props.questionViewModel.type === 'choix_multiple' || props.questionViewModel.type === 'libre'
      ? { styleDuTitre: props.styleDuTitre }
      : {};
  });
</script>
