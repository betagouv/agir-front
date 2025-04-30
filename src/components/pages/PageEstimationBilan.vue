<template>
  <div class="fr-container">
    <FilDAriane
      :page-hierarchie="[{ label: 'Empreinte écologique', url: `${RouteBilanCarbonePath.BILAN_CARBONE}` }]"
      :page-courante="`Estimation de mon empreinte ${
        MenuThematiques.getThematiqueData(thematiqueId as ClefThematiqueAPI).labelDansLeMenu
      }`"
    />
    <h1>
      Estimation de mon empreinte
      <span
        class="text--bleu"
        v-text="MenuThematiques.getThematiqueData(thematiqueId as ClefThematiqueAPI).labelDansLeMenu"
      />
    </h1>
    <div class="fr-pb-4w">
      <EnchainementQuestionsKyc
        :est-active="true"
        :id-enchainement-kycs="idEnchainementKycs"
        @fin-kyc-atteinte="onFinKYC"
        wording-dernier-bouton="Finir mon estimation"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import router from '@/router';
  import { RouteBilanCarbonePath } from '@/router/bilanCarbone/routes';

  const route = useRoute();
  const thematiqueId = route.params.thematiqueId as string;
  const idEnchainementKycs = route.params.id as string;

  const onFinKYC = async () => {
    await router.push({ path: RouteBilanCarbonePath.BILAN_CARBONE });
  };
</script>
