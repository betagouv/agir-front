<template>
  <div class="fr-mt-4w">
    <div class="fr-grid-row fr-grid-row--gutters fr-my-6w">
      <section class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <h2 class="fr-h3">Rénover mon logement</h2>
        <CarteDsfr
          :horizontal="true"
          :to="{
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              type: TypeAction.SIMULATEUR,
              id: 'simu_aides_reno',
              titre: 'calculer-vos-aides-pour-renover-votre-logement',
            },
          }"
          image="/carte_service_aides_reno.svg"
          size="sm"
          titre="Aides à la rénovation"
          variations="shadow"
        >
          <template #contenuEnd>
            <p class="fr-card__desc">
              Une rénovation énergétique pour des factures moins élevées dans un logement plus confortable et plus
              écologique.
            </p>
          </template>
        </CarteDsfr>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { RouteActionsName } from '@/router/actions/routes';
</script>
