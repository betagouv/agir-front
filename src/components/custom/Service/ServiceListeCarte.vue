<template>
  <ul class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
    <li
      v-for="(suggestion, index) in suggestionsServiceViewModel"
      :key="`${suggestion.titre}${index}`"
      class="fr-col-6 fr-col-md-4"
      :ref="
        el => {
          if (el) cartesRefs[index] = el as HTMLElement;
        }
      "
    >
      <ServiceCarteDSFR :suggestionsServiceViewModel="suggestion" style-carte="fr-card--sm" />
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ServiceCarteDSFR from '@/components/custom/Service/ServiceCarteDSFR.vue';
  import { SuggestionServiceViewModel } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';

  defineProps<{
    suggestionsServiceViewModel: SuggestionServiceViewModel[];
  }>();

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
