<template>
  <h2 class="fr-h2 fr-mb-6w text--center">Toutes nos solutions pour mieux...</h2>
  <ul class="fr-grid-row flex-space-around fr-grid-row--gutters">
    <li v-for="item in items" :key="item.titre" class="fr-col-lg-3 fr-col-md-6 fr-col-12 list-style-none thematique">
      <h3 class="fr-h4 fr-mb-3w">
        <span aria-hidden="true">{{ item.emoji }}</span> {{ item.titre }}
      </h3>
      <ListeRaccourcis :liste-raccourcis="item.raccourcis" :full-width="true" />
    </li>
  </ul>

  <button
    v-if="!afficherToutesLesThematiquesMobile"
    class="fr-btn fr-btn--secondary full-width flex-center fr-mt-3w fr-hidden-md"
    @click="afficherToutesLesThematiquesMobile = true"
  >
    Voir 2 autres
  </button>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import ListeRaccourcis from '@/components/custom/Thematiques/ListeRaccourcis.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RaccourciViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { RouteServiceName } from '@/router/services/routes';
  import { RouteThematiquesName } from '@/router/thematiques/routes';

  const afficherToutesLesThematiquesMobile = ref<boolean>(false);
  const displayThematique = computed(() => (afficherToutesLesThematiquesMobile.value ? 'block' : 'none'));

  const alimentation = MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation);
  const transport = MenuThematiques.getThematiqueData(ClefThematiqueAPI.transports);
  const logement = MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement);
  const consommation = MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation);

  const items = [
    {
      titre: alimentation.labelDansLeMenu,
      emoji: alimentation.emoji,
      raccourcis: [
        {
          emoji: '🛒',
          to: {
            name: RouteServiceName.PROXIMITE,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
          },
          label: `Des adresses pour manger local`,
        },
        {
          emoji: '🥘',
          to: {
            name: RouteServiceName.RECETTES,
            params: {
              thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
            },
          },
          label: `1 150 recettes durables`,
        },
        {
          emoji: '🍓',
          to: {
            name: RouteServiceName.FRUITS_ET_LEGUMES,
            params: {
              thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url,
            },
          },
          label: `1 calendrier de fruits et légumes de saison`,
        },
        {
          emoji: '🎯',
          to: {
            name: RouteThematiquesName.THEMATIQUE,
            params: {
              id: ClefThematiqueAPI.alimentation,
            },
          },
          label: `27 idées d’actions`,
        },
      ] as RaccourciViewModel[],
    },
    {
      titre: logement.labelDansLeMenu,
      emoji: logement.emoji,
      raccourcis: [
        {
          emoji: '🎯',
          to: {
            name: RouteThematiquesName.THEMATIQUE,
            params: {
              id: ClefThematiqueAPI.logement,
            },
          },
          label: `30 idées d’actions`,
        },
        {
          emoji: '💶',
          to: {
            name: RouteAidesName.AIDES,
          },
          label: `321 aides locales partout en France`,
        },
      ] as RaccourciViewModel[],
    },
    {
      titre: transport.labelDansLeMenu,
      emoji: transport.emoji,
      raccourcis: [
        {
          emoji: '🚙',
          label: '1 simulateur Changer de voiture',
          to: {
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              type: TypeAction.SIMULATEUR,
              id: 'action_simulateur_voiture',
              titre: 'trouver-le-type-de-voiture-qui-vous-convient-le-mieux',
            },
          },
        },
        {
          emoji: '🚲',
          to: {
            name: RouteAidesName.VELO,
          },
          label: `1 simulateur Mes aides vélo`,
        },
        {
          emoji: '🎯',
          to: {
            name: RouteThematiquesName.THEMATIQUE,
            params: {
              id: ClefThematiqueAPI.transports,
            },
          },
          label: `13 idées d’actions`,
        },
        {
          emoji: '💶',
          to: {
            name: RouteAidesName.AIDES,
          },
          label: `105 aides locales partout en France`,
        },
      ] as RaccourciViewModel[],
    },
    {
      titre: consommation.labelDansLeMenu,
      emoji: consommation.emoji,
      raccourcis: [
        {
          emoji: '🔧',
          to: {
            name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
            params: { thematiqueId: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
          },
          label: `Des commerces de seconde main à proximité`,
        },
        {
          emoji: '🎯',
          to: {
            name: RouteThematiquesName.THEMATIQUE,
            params: {
              id: ClefThematiqueAPI.consommation,
            },
          },
          label: `15 idées d’actions`,
        },
      ] as RaccourciViewModel[],
    },
  ];
</script>

<style scoped>
  @media (max-width: 48rem) {
    .thematique:nth-child(3),
    .thematique:nth-child(4) {
      display: v-bind(displayThematique);
    }
  }
</style>
