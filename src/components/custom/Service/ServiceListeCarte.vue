<template>
  <ul class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
    <li
      v-for="(suggestion, index) in suggestionsServiceViewModel"
      :key="`${suggestion.titre}${index}`"
      :class="columnClass"
      :ref="
        el => {
          if (el) cartesRefs[index] = el as HTMLElement;
        }
      "
    >
      <ServiceCarteImage v-if="isRecette" :suggestionsServiceViewModel="suggestion" />
      <ServiceCarteHeaderAlternatif v-else :suggestionsServiceViewModel="suggestion" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ServiceCarteHeaderAlternatif from '@/components/custom/Service/ServiceCarteHeaderAlternatif.vue';
  import ServiceCarteImage from '@/components/custom/Service/ServiceCarteImage.vue';

  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/suggestionServiceViewModel';

  withDefaults(
    defineProps<{
      suggestionsServiceViewModel: SuggestionServiceViewModel[];
      isRecette?: boolean;
      columnClass?: string;
    }>(),
    {
      columnClass: 'fr-col-12 fr-col-sm-6',
    },
  );

  const cartesRefs = ref<HTMLElement[]>([]);

  const focusCarteParIndex = (index: number) => {
    if (cartesRefs.value && cartesRefs.value[index]) {
      const elementFocusable = cartesRefs.value[index].querySelector('a');
      if (elementFocusable) {
        (elementFocusable as HTMLElement).focus();
      }
    }
  };

  defineExpose({
    focusCarteParIndex,
  });
</script>
