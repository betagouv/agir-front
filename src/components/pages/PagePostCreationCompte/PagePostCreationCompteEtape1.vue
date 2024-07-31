<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="validerLaReponse()">
        <fieldset class="fr-fieldset fr-mb-0">
          <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
            <img src="/bg_creation_compte.png" alt="" />
            <p class="text--normal text--bleu fr-mt-1w fr-mb-1w"><span class="fr-text--bold">Question 1</span> sur 2</p>
            <h1 class="fr-h4 fr-mb-1w">Bienvenue sur Agir ! Faisons connaissance...</h1>
            <p class="fr-text--regular fr-text--lg">
              Nous avons quelques questions à vous poser pour personnaliser votre expérience !
            </p>
          </legend>
          <div class="fr-fieldset__element">
            <InputText label="Votre prénom" name="utilisateur-prenom" v-model="onboardingPostCreationCompte().prenom" />
          </div>
        </fieldset>
        <button class="fr-btn fr-mr-4w" :disabled="onboardingPostCreationCompte().prenom.length == 0">Continuer</button>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import InputText from '@/components/dsfr/InputText.vue';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';

  const validerLaReponse = () => {
    router.push({ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_2 });
  };
</script>
