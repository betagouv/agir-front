<template>
  <div class="fr-mt-4w">
    <section class="fr-grid-row fr-grid-row--gutters fr-my-6w">
      <!--      <div class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">-->
      <!--        <h2 class="fr-h3 fr-p-0">Les risques naturels</h2>-->

      <!--        <CarteDsfr-->
      <!--          :horizontal="true"-->
      <!--          :to="{-->
      <!--            name: RouteActionsName.ACTION_INDIVIDUELLE,-->
      <!--            params: {-->
      <!--              type: TypeAction.SIMULATEUR,-->
      <!--              id: SimulateursSupportes.MAIF,-->
      <!--              titre: 'connaitre-les-risques-naturels-auxquels-votre-logement-est-expose',-->
      <!--            },-->
      <!--          }"-->
      <!--          image="/carte_service_maif.svg"-->
      <!--          size="sm"-->
      <!--          titre="Êtes-vous exposé à des risques ?"-->
      <!--          variations="shadow"-->
      <!--        >-->
      <!--          <template #contenuEnd>-->
      <!--            <p class="fr-card__desc">-->
      <!--              Exposition aux risques climatiques, services de proximité, prix de l’immobilier… Retrouvez toutes les-->
      <!--              infos utiles aux alentours de votre adresse&nbsp;!-->
      <!--            </p>-->
      <!--          </template>-->
      <!--        </CarteDsfr>-->
      <!--      </div>-->

      <div class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <h2 class="fr-h3 fr-p-0">Rénover mon logement</h2>

        <CarteDsfr
          :horizontal="true"
          :to="{
            name: RouteActionsName.ACTION_INDIVIDUELLE,
            params: {
              type: TypeAction.SIMULATEUR,
              id: SimulateursSupportes.MES_AIDES_RENO,
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
      </div>
    </section>
  </div>
</template>
<script lang="ts" setup>
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { RouteActionsName } from '@/router/actions/routes';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes';
</script>
