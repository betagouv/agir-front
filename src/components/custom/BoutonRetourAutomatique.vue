<template>
  <BoutonRetour :label-bouton="labelBouton" :custom-class="customClass" />
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import BoutonRetour from '@/components/custom/BoutonRetour.vue';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteServiceName } from '@/router/services/routes';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import { useNavigationStore } from '@/store/navigationStore';

  defineProps<{
    customClass?: string;
  }>();

  const navigationStore = useNavigationStore();
  const dernierePage = computed(() => navigationStore.dernierePage);
  const labelBouton = computed(() => {
    return nomDeLaPage.value ? `Revenir ${nomDeLaPage.value}` : 'Retour';
  });

  const nomDeLaPage = computed(() => {
    switch (dernierePage.value.name) {
      case RouteCoachName.ACCUEIL_CONNECTEE:
        return "à l'accueil";
      case RouteActionsName.CATALOGUE_ACTION:
        return 'au catalogue';
      case RouteAidesName.AIDES:
        return 'à la liste des aides';
      case RouteThematiquesName.THEMATIQUE:
        return 'à la thématique';
      case RouteCoachName.BIBLIOTHEQUE:
        return 'à la bibliothèque';
      case RouteServiceName.LONGUE_VIE_AUX_OBJETS:
        return 'au service Que faire de mes objets';
      case RouteServiceName.PROXIMITE:
        return 'au service Près de chez nous';
      case RouteServiceName.RECETTES:
        return 'au service La Fabrique à menus';
      default:
        return undefined;
    }
  });
</script>
