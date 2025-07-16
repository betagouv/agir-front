<template>
  <div class="fr-mt-4w">
    <div class="fr-grid-row fr-grid-row--gutters fr-my-6w">
      <div class="fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <WidgetServiceRecettes
          :afficher-manger-bouge="false"
          :nombreDeCartesParLigne="3"
          :parametre-de-recherche="{ categorie: 'saison' }"
        >
          <template #titre>
            <h2 class="fr-h3 fr-mb-0">Manger sainement et de saison</h2>
          </template>
        </WidgetServiceRecettes>
      </div>

      <div class="fr-col-12 fr-col-md-6 fr-pl-md-2w">
        <WidgetServiceFruitsEtLegumes />
      </div>

      <section class="full-height fr-col-12 fr-col-md-6 fr-pr-md-2w">
        <h2 class="fr-h3">Les commerces de proximité</h2>
        <CarteDsfr
          :horizontal="true"
          :to="{
            name: RouteServiceName.PROXIMITE,
            params: {
              thematiqueId: ClefThematiqueAPI.alimentation,
            },
          }"
          image="/carte_service_pdcn.svg"
          size="sm"
          titre="Où trouver des produits locaux ?"
          variations="shadow"
        >
          <template #contenuEnd>
            <p class="fr-card__desc">
              Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable ! Par
              notre partenaire Près de chez nous.
            </p>
          </template>
        </CarteDsfr>
      </section>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import CarteDsfr from '@/components/dsfr/CarteDsfr.vue';
  import WidgetServiceFruitsEtLegumes from '@/components/pages/PagesService/components/WidgetServiceFruitsEtLegumes.vue';
  import WidgetServiceRecettes from '@/components/pages/PagesService/components/WidgetServiceRecettes.vue';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { RouteServiceName } from '@/router/services/routes';
</script>
