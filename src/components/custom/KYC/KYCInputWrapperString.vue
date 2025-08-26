<template>
  <component :is="componentType" v-model="modelValue" :question-view-model="questionViewModel">
    <template #complement>
      <slot name="complement" />
    </template>
  </component>
</template>

<script lang="ts" setup>
  import { computed, defineModel, defineProps } from 'vue';
  import KYCDecimal from './KYCTypes/KYCDecimal.vue';
  import KYCEntier from './KYCTypes/KYCEntier.vue';
  import KYCLibre from './KYCTypes/KYCLibre.vue';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';

  const modelValue = defineModel<string>();
  const props = defineProps<{
    questionViewModel: QuestionViewModel;
    styleDuTitre?: string;
  }>();

  const componentMap: Record<string, typeof KYCDecimal | typeof KYCEntier | typeof KYCLibre> = {
    decimal: KYCDecimal,
    entier: KYCEntier,
    libre: KYCLibre,
  };

  const componentType = computed(() => componentMap[props.questionViewModel.type]);
</script>
