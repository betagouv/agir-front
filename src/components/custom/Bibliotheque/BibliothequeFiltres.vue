<template>
  <InputSearchBar
    id="rechercheParTitre"
    class="fr-mb-2w"
    name="titreRessource"
    placeholder="Rechercher par titre"
    @submit="rechercherParTitre"
  />
  <h2 class="fr-h4">Filtres</h2>
  <InputCheckbox id="thematiqueArticle" :options="filtres" label="Thématiques" @update="updateThematiques" />
  <hr class="fr-hr" />
  <Interrupteur id="favoris" label="Vos favoris" @on-change="rechercherParFavoris" />
  <Interrupteur id="lus" class="fr-mt-2w" label="Articles déjà lus" @on-change="rechercherArticlesLus" />
</template>

<script lang="ts" setup>
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import Interrupteur from '@/components/dsfr/Interrupteur.vue';

  defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{
    (event: 'rechercherParTitre', value: string): void;
    (event: 'updateThematiques', value: string[]): void;
    (event: 'rechercherParFavoris', value: boolean): void;
    (event: 'rechercherArticlesLus', value: boolean): void;
  }>();

  const rechercherParTitre = (titre: string) => emit('rechercherParTitre', titre);
  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);
  const rechercherParFavoris = (checked: boolean) => emit('rechercherParFavoris', checked);
  const rechercherArticlesLus = (checked: boolean) => emit('rechercherArticlesLus', checked);
</script>
