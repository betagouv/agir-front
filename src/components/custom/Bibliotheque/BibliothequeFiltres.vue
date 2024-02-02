<template>
  <InputSearchBar
    id="rechercheParTitre"
    name="titreRessource"
    placeholder="Rechercher par titre"
    class="fr-mb-2w"
    @submit="rechercherParTitre"
  />
  <h2 class="fr-h4">Filtres</h2>
  <InputCheckbox id="thematiqueArticle" label="Thématiques" :options="filtres" @update="updateThematiques" />
</template>

<script setup lang="ts">
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{
    (event: 'rechercherParTitre', value: string): void;
    (event: 'updateThematiques', value: string[]): void;
  }>();

  const rechercherParTitre = (titre: string) => emit('rechercherParTitre', titre);
  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);
</script>
