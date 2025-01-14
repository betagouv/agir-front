<template>
  <div class="fr-container">
    <div class="background--white fr-p-4w">
      <ThematiqueTag
        :tag="{
          label: MenuThematiques.getThematiqueData(aide.thematique).labelDansLeMenu,
          style: TagThematique.getTagThematiqueUtilitaire(aide.thematique),
        }"
        aria-hidden="true"
      />
      <h1 class="fr-h1 fr-mt-2w text--gris">
        {{ aide.titre }}
      </h1>
      <span class="fr-col-12 fr-pr-2w">
        <span v-if="aide.isSimulateur || aide.montantMaximum" class="fr-grid-row">
          <span
            v-if="aide.isSimulateur"
            class="fr-tag background-bleu-light fr-mr-1w fr-icon-money-euro-circle-line fr-tag--icon-left"
          >
            <span class="fr-sr-only">: </span>
            Simulateur
          </span>
          <span v-if="aide.montantMaximum" class="fr-tag">
            <span class="fr-sr-only">, </span>
            {{ aide.montantMaximum }}
          </span>
        </span>
      </span>
      <div class="cms__content" v-html="aide.contenu" />
      <div class="flex align-items--center gap--small">
        <a
          v-if="aide.urlCommencerVotreDemarche"
          :href="aide.urlCommencerVotreDemarche"
          class="fr-btn"
          rel="noopener external"
          target="_blank"
        >
          Commencer votre démarche
        </a>
        <router-link
          v-if="aide.isSimulateur"
          :to="{ path: aide.url }"
          class="fr-btn fr-btn--icon-left fr-icon-arrow-right-line"
        >
          Estimer le montant des aides
        </router-link>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { ChargementAidesAxiosRepository } from '@/domaines/aides/adapters/chargementAidesAxiosRepository';
  import { Aide } from '@/domaines/aides/chargementAides.usecase';
  import { PrevisualiserAideUsecase } from '@/domaines/aides/previsualiserAide.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { TagThematique } from '@/domaines/thematiques/TagThematique';

  const aide = ref<Aide>({
    id: '',
    titre: '',
    categorie: '',
    contenu: '',
    url: '',
    isSimulateur: false,
    thematique: ClefThematiqueAPI.services_societaux,
  });

  onMounted(async () => {
    const route = useRoute();
    const idArticle = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;
    const usecase = new PrevisualiserAideUsecase(new ChargementAidesAxiosRepository());
    aide.value = await usecase.execute(idArticle);
  });
</script>
