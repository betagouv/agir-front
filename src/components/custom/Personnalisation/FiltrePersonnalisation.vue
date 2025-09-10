<template>
  <form action="" @submit.prevent="onSubmit" class="full-width">
    <div
      ref="menuBar"
      aria-label="Filtrage des tags"
      class="full-width background--white fr-grid-row border-top--bleu"
      role="menubar"
    >
      <div class="fr-p-2w full-width" data-nouvelle-colonne="true">
        <CatalogueDropDownMenu id="tags" :is-button-menu-item="true">
          <template #bouton-contenu>
            <span>
              <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Tags</span>
              <span class="flex align-items--center">{{ filtreResume }}</span>
            </span>
          </template>

          <template #menu-contenu>
            <InputCheckbox
              v-if="optionsCheckbox && optionsCheckbox.length > 0"
              :est-inline="true"
              :est-small="true"
              :est-resetable="true"
              :options="optionsCheckbox"
              id="tags"
              @update="updateTags"
            >
              <template #label>
                <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Tags</span>
              </template>
            </InputCheckbox>
          </template>
        </CatalogueDropDownMenu>
      </div>
    </div>

    <button class="fr-btn fr-my-4w">Charger la personnalisation</button>
  </form>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CatalogueDropDownMenu from '@/components/custom/Action/Catalogue/CatalogueDropDownMenu.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  defineProps<{
    onSubmit: () => void;
  }>();

  const optionsCheckbox = defineModel<
    {
      id: string;
      label: string;
      checked?: boolean;
    }[]
  >('optionsCheckbox', { default: [] });

  function updateTags(selectedTags: string[]) {
    optionsCheckbox.value = optionsCheckbox.value.map(option => ({
      ...option,
      checked: selectedTags.includes(option.id),
    }));
  }

  const filtreResume = computed(() => {
    const tagsSelectionnes = optionsCheckbox.value.filter(option => option.checked).map(option => option.label);
    return tagsSelectionnes.length ? tagsSelectionnes.join(', ') : 'Toutes';
  });
</script>
