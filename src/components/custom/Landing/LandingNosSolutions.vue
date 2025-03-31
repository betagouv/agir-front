<template>
  <h2 class="fr-h2 fr-mb-6w text--center">Toutes nos solutions pour mieux...</h2>
  <ul class="fr-grid-row flex-space-around fr-grid-row--gutters">
    <li v-for="item in items" :key="item.titre" class="fr-col-lg-3 fr-col-md-6 fr-col-12 list-style-none">
      <h3 class="fr-h4 fr-mb-3w">
        <span aria-hidden="true">{{ item.emoji }}</span> {{ item.titre }}
      </h3>
      <ListeRaccourcis :liste-raccourcis="item.raccourcis" />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import ListeRaccourcis from '@/components/custom/Thematiques/ListeRaccourcis.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { RouteServiceName } from '@/router/services/routes';

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
          label: `1150 recettes délicieuses`,
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
      ],
    },
    {
      titre: transport.labelDansLeMenu,
      emoji: transport.emoji,
      raccourcis: [
        {
          emoji: '🚙',
          label: '1 simulateur Changer de voiture ?',
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
          label: `1 simulateur aides vélo`,
        },

        {
          emoji: '💶',
          to: {
            name: RouteAidesName.AIDES,
          },
          label: `105 aides financières`,
        },
      ],
    },
    {
      titre: logement.labelDansLeMenu,
      emoji: logement.emoji,
      raccourcis: [
        {
          emoji: '💶',
          to: {
            name: RouteAidesName.AIDES,
          },
          label: `3 aides financières`,
        },
      ],
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
          label: `Des points de réparation de proximité`,
        },
        {
          emoji: '💶',
          to: {
            name: RouteAidesName.AIDES,
          },
          label: `105 aides financières`,
        },
      ],
    },
  ];
</script>
