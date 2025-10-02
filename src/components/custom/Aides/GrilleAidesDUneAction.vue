<template>
  <ul class="fr-grid-row fr-grid-row--gutters fr-mb-1w list-style-none">
    <li v-for="aide in aides" :key="aide.titre" :class="['fr-col-12', troisColonnes ? 'fr-col-md-4' : 'fr-col-md-6']">
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
        :aria-label="aide.titre"
      >
        <div class="flex flex-space-between fr-p-2w min-height-110">
          <div class="text--black">
            <h3 class="fr-text--lg fr-mb-0 text--normal text--lh-1-3">{{ aide.titre }}</h3>
            <p v-if="aide.estGratuit" class="fr-m-0 fr-text--md fr-mt-1w">
              <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v" />
              <span class="text--bold">Gratuit</span>
            </p>
            <p v-else-if="aide.montantMaximum" class="fr-m-0 fr-text--md fr-mt-1w">
              <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v" />
              Jusqu'à
              <span class="text--bold" v-html="aide.montantMaximum" />
            </p>
            <p v-else-if="aide.estSimulateur" class="fr-m-0 fr-text--md fr-mt-1w">
              <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v" />
              À découvrir
            </p>
          </div>
          <div class="flex flex-column flex-center">
            <span class="fr-icon-arrow-right-s-line text--bleu" />
          </div>
        </div>
        <div class="background--bleu-info fr-p-1w flex align-items--center">
          <img v-if="aide.partenaireImg" :src="aide.partenaireImg" alt="" class="partenaire__img" />
          <div v-else class="partenaire__img fr-text--lavande" role="img">
            <span class="flex flex-center align-items--center fr-icon-user-fill full-height full-width" />
          </div>
          <div v-if="aide.partenaireNom" class="full-width fr-ml-1w">
            <span class="text--bleu text--italic display-block">Proposée par</span>
            {{ aide.partenaireNom }}
          </div>
        </div>
      </router-link>
    </li>

    <li :class="['fr-col-12', troisColonnes ? 'fr-col-md-4' : 'fr-col-md-6']" v-if="!estConnecte">
      <div class="fr-card flex-space-between">
        <div class="text--center fr-p-2w min-height-110">
          <div>
            <router-link
              :to="{ name: RouteCompteName.CREATION_COMPTE }"
              class="fr-text--lg fr-mb-0 text--normal text--lh-1-3 fr-link"
            >
              Découvrir mes aides locales
            </router-link>
            <p class="fr-m-0 fr-text--md fr-mt-1w">Inscrivez-vous dès maintenant !</p>
          </div>
        </div>
        <div class="background--bleu-info fr-p-1w flex align-items--center">
          <img src="/icons/map/france-fill.svg" alt="" class="partenaire__img" />
          <div class="full-width fr-ml-1w">
            <span class="text--bleu text--italic display-block">Proposée par</span>
            Mon département
          </div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { trackClick } from '@/shell/tracking/matomo';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    aides: ActionAideViewModel[];
    troisColonnes?: boolean;
  }>();

  const estConnecte = computed(() => utilisateurStore().estConnecte);

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
    margin: 0.2rem 0;
  }

  .fr-text--lavande {
    color: #7878d5;
    background-color: #dee3f5;
  }

  .min-height-110 {
    min-height: 6.8rem;
  }
</style>
