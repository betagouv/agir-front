<template>
  <InputSearchBar
    id="rechercheParTitre"
    class="fr-mb-2w"
    name="titreRessource"
    placeholder="Rechercher par titre"
    @submit="rechercherParTitre"
  />
  <h2 class="fr-h4">Filtres</h2>
  <Interrupteur id="deja_vus" class="fr-mb-4w" label="Déjà consultées" @on-change="rechercherParDejaVu" />
  <Interrupteur id="deja_realisees" class="fr-mb-4w" label="Déjà réalisées" @on-change="rechercherParDejaRealisees" />
  <InputCheckbox id="thematiqueArticle" :options="filtres" label="Thématiques" @update="updateThematiques" />
  <hr class="fr-hr" />
</template>

<script lang="ts" setup>
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import Interrupteur from '@/components/dsfr/Interrupteur.vue';

  defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{
    (event: 'rechercherParTitre', value: string): void;
    (event: 'updateThematiques', value: string[]): void;
    (event: 'rechercherParDejaVu', value: boolean): void;
    (event: 'rechercherParDejaRealisees', value: boolean): void;
  }>();

  const rechercherParTitre = (titre: string) => emit('rechercherParTitre', titre);
  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);
  const rechercherParDejaVu = (checked: boolean) => emit('rechercherParDejaVu', checked);
  const rechercherParDejaRealisees = (checked: boolean) => emit('rechercherParDejaRealisees', checked);
</script>
