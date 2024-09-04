<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <img src="/bg_creation_compte_disclaimer.png" alt="" />
      <h1 class="fr-h4 fr-mb-3w">Agir est encore en expérimentation&nbsp;!</h1>
      <p class="fr-text--regular fr-text--lg">
        Nous ajoutons progressivement les aides et contenus locaux à
        <strong class="text--bleu"> {{ onboardingPostCreationCompte().commune }} et sa région. </strong>
      </p>
      <p class="fr-text--regular fr-text--lg">Revenez régulièrement pour profiter de nos dernières nouveautés.</p>

      <router-link :to="{ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_3 }" class="fr-btn fr-btn--lg fr-mt-1v"
        >J'ai compris
      </router-link>

      <router-link :to="{ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_2 }" class="fr-link fr-ml-4w"
        >Retour
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
</script>
