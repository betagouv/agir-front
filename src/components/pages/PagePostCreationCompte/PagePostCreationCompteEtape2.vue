<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="validerLaReponse()">
        <fieldset class="fr-fieldset fr-mb-0">
          <legend class="fr-fieldset__legend" id="identity-fieldset-legend">
            <img src="/bg_creation_compte_etape_2.svg" alt="" />
            <p class="text--normal text--bleu fr-mb-1w fr-mt-1w"><span class="fr-text--bold">Question 2</span> sur 3</p>
            <h1 class="fr-h4 fr-mb-1w">Enchanté, {{ onboardingPostCreationCompte().prenom }}</h1>
            <p class="fr-text--regular fr-text--lg">
              Pour découvrir des aides, services et contenus disponibles proches de chez vous, indiquez-nous votre lieu
              de résidence.
            </p>
          </legend>
          <Alert
            v-if="alerte.isActive"
            class="fr-col-12 fr-mb-4w"
            :type="alerte.type"
            :titre="alerte.titre"
            :message="alerte.message"
          />
          <div class="fr-fieldset__element">
            <InputCodePostal
              v-model="onboardingPostCreationCompte().codePostal"
              :default-value="onboardingPostCreationCompte().codePostal"
              :default-select-value="onboardingPostCreationCompte().commune"
              :autofocus="true"
              @update:selectedCommune="onboardingPostCreationCompte().commune = $event"
            />
          </div>
        </fieldset>
        <button class="fr-btn fr-mr-4w">Continuer</button>
        <router-link :to="{ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_1 }" class="fr-link fr-mt-1v"
          >Retour
        </router-link>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Alert from '@/components/custom/Alert.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
  const { alerte, afficherAlerte } = useAlerte();

  const validerLaReponse = async () => {
    if (onboardingPostCreationCompte().commune.length === 0) {
      afficherAlerte('error', 'Erreur lors de la validation de la résidence', 'Veuillez renseigner votre commune');
      return;
    }
    await router.replace({ name: RouteCompteName.POST_CREATION_COMPTE_DISCLAIMER });
  };
</script>
