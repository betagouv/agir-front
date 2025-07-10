<template>
  <div class="fr-mt-4w">
    <section class="fr-grid-row fr-grid-row--gutters fr-my-6w">
      <div class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <h2 class="fr-h3">Estimer mes aides vélo</h2>
        <CarteDsfr
          :horizontal="true"
          :to="{
            name: RouteAidesName.VELO,
          }"
          image="/carte_service_aides_velo.svg"
          size="sm"
          titre="Estimer mes aides vélo"
          variations="shadow"
        >
          <template #contenuEnd>
            <p class="fr-card__desc">
              Une rénovation énergétique pour des factures moins élevées dans un logement plus confortable et plus
              écologique.
            </p>
          </template>
        </CarteDsfr>
      </div>
      <div class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <h2 class="fr-h3">Dois-je changer de voiture ?</h2>
        <CarteDsfr
          :horizontal="true"
          :to="{
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              type: TypeAction.SIMULATEUR,
              id: 'action_simulateur_voiture',
              titre: 'trouver-le-type-de-voiture-qui-vous-convient-le-mieux',
            },
          }"
          image="/carte_service_simu_voiture.svg"
          size="sm"
          titre="Dois-je changer de voiture ?"
          variations="shadow"
        >
          <template #contenuEnd>
            <p class="fr-card__desc">
              Une rénovation énergétique pour des factures moins élevées dans un logement plus confortable et plus
              écologique.
            </p>
          </template>
        </CarteDsfr>
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
</script>
