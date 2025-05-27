<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mb-1w">
    <div v-for="aide in aides" :key="aide.titre" class="fr-col-12 fr-col-md-6">
      <router-link
        :to="{
          name: RouteAidesName.AIDE_CONSULTATION,
          params: {
            id: aide.id,
            titre: aide.titreUrl,
          },
        }"
        class="fr-card flex-space-between"
        @click="trackAideClick"
      >
        <div class="flex align-items--center flex-space-between fr-p-2w full-height">
          <div>
            <h3 class="fr-text--lg fr-mb-0">{{ aide.titre }}</h3>
            <p v-if="aide.estGratuit" class="fr-m-0 fr-text--md fr-mt-1w">
              <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v"></span>
              <span class="text--bold">Gratuit</span>
            </p>
            <p v-else-if="aide.montantMaximum" class="fr-m-0 fr-text--md fr-mt-1w">
              <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v"></span>
              Jusqu'à
              <span class="text--bold" v-html="aide.montantMaximum" />
            </p>
          </div>
          <span class="fr-icon-arrow-right-s-line text--bleu"></span>
        </div>
        <div class="background--bleu-info fr-p-1w flex align-items--center">
          <img v-if="aide.partenaireImg" :src="aide.partenaireImg" alt="" class="partenaire__img" />
          <div v-if="aide.partenaireNom" class="full-width fr-ml-1w">
            <span class="text--bleu text--italic">Proposée par</span><br />
            {{ aide.partenaireNom }}
          </div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { trackClick } from '@/shell/matomo';

  defineProps<{
    aides: ActionAideViewModel[];
  }>();

  const trackAideClick = aide => {
    trackClick('Aides', aide.titre);
  };
</script>

<style scoped>
  .partenaire__img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #b1b1ff;
    object-fit: contain;
    background-color: white;
  }
</style>
