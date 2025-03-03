<template>
  <InputSearchBar
    id="rechercheParTitre"
    name="titreRessource"
    placeholder="Rechercher par titre"
    class="fr-mb-2w"
    @submit="rechercherParTitre"
  />
  <h2 class="fr-h4">Filtres</h2>
  <Interrupteur id="deja_vus" label="Déjà consultées" @on-change="rechercherParDejaVu" class="fr-mb-4w" />
  <InputCheckbox id="thematiqueArticle" label="Thématiques" :options="filtres" @update="updateThematiques" />
  <hr class="fr-hr" />
</template>

<script setup lang="ts">
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import Interrupteur from '@/components/dsfr/Interrupteur.vue';

  defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{
    (event: 'rechercherParTitre', value: string): void;
    (event: 'updateThematiques', value: string[]): void;
    (event: 'rechercherParDejaVu', value: boolean): void;
  }>();

  const rechercherParTitre = (titre: string) => emit('rechercherParTitre', titre);
  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);
  const rechercherParDejaVu = (checked: boolean) => emit('rechercherParDejaVu', checked);
</script>
