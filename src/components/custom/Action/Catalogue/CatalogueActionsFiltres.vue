<template>
  <h2 class="fr-h4">Filtres</h2>
  <Interrupteur
    v-if="utilisateurStore().estConnecte"
    id="deja_vus"
    class="fr-mb-4w"
    label="Déjà consultées"
    @on-change="rechercherParDejaVu"
  />
  <Interrupteur
    v-if="utilisateurStore().estConnecte"
    id="deja_realisees"
    class="fr-mb-4w"
    label="Déjà réalisées"
    @on-change="rechercherParDejaRealisees"
  />
  <hr class="fr-hr" />
</template>

<script lang="ts" setup>
  import Interrupteur from '@/components/dsfr/Interrupteur.vue';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{
    (event: 'rechercherParDejaVu', value: boolean): void;
    (event: 'rechercherParDejaRealisees', value: boolean): void;
  }>();

  const rechercherParDejaVu = (checked: boolean) => emit('rechercherParDejaVu', checked);
  const rechercherParDejaRealisees = (checked: boolean) => emit('rechercherParDejaRealisees', checked);
</script>
