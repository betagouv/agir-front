<template>
  <div class="fr-container">
    <FilDAriane
      :page-hierarchie="[{ label: 'Bilan carbone', url: `${RouteBilanCarbonePath.BILAN_CARBONE}` }]"
      page-courante="Estimation du bilan"
    />
    <h1>
      Estimation du bilan
      <span class="text--bleu">{{
        MenuThematiques.getThematiqueData(thematiqueId as ClefThematiqueAPI).labelDansLeMenu
      }}</span>
    </h1>
    <div class="fr-pb-4w">
      <EnchainementQuestionsKyc
        :est-active="true"
        :id-enchainement-kycs="idEnchainementKycs"
        @fin-kyc-atteinte="onFinKYC"
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
