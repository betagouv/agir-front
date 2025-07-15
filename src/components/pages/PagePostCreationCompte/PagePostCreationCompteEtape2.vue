<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border">
      <img alt="" src="/bg_creation_compte_etape_2.svg" />
      <span class="text--normal text--bleu fr-mb-1w fr-mt-1w display-block">
        <span class="fr-text--bold">Étape 2</span> sur 3
      </span>
      <h1 class="fr-h4 fr-mb-1w">Enchanté, {{ onboardingPostCreationCompte().pseudo }}</h1>

      <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="validerLaReponse()">
        <fieldset class="fr-fieldset fr-mb-0">
          <legend id="identity-fieldset-legend" class="fr-fieldset__legend fr-text--regular fr-text--lg">
            <span class="fr-text--regular fr-text--lg display-block fr-mb-1w">
              Pour découvrir des aides, services et contenus disponibles proches de chez vous, indiquez-nous votre lieu
              de résidence.
            </span>
            <span class="fr-hint-text fr-text--sm fr-mt-1w fr-mb-0">Tous les champs sont obligatoires.</span>
          </legend>
          <Alert
            v-if="alerte.isActive"
            :message="alerte.message"
            :titre="alerte.titre"
            :type="alerte.type"
            aria-live="assertive"
            class="fr-col-12 fr-mb-4w"
          />
          <div class="fr-fieldset__element fr-mb-4w">
            <InputCodePostal
              v-model:code-epci="onboardingPostCreationCompte().codeEpci"
              v-model:code-postal="onboardingPostCreationCompte().codePostal"
              v-model:commune="onboardingPostCreationCompte().commune"
              autofocus
            />
          </div>
        </fieldset>
        <button class="fr-btn fr-mr-4w">Passer à la dernière étape</button>
        <router-link :to="{ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_1 }" class="fr-link fr-mt-1v"
          >Retour
        </router-link>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { OnboardingRepositoryAxios } from '@/domaines/onboarding/adapters/onboarding.repository.axios';
  import { OnboardingEtape2Usecase } from '@/domaines/onboarding/onboardingEtape2.usecase';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
  import { utilisateurStore } from '@/store/utilisateur';

  const { alerte, afficherAlerte } = useAlerte();

  const inputCodePostal = ref<HTMLInputElement>();

  onMounted(() => {
    inputCodePostal.value = document.querySelector('#codePostal') as HTMLInputElement;
  });

  const validerLaReponse = async () => {
    if (!onboardingPostCreationCompte().commune) {
      inputCodePostal.value?.focus();
      afficherAlerte('error', 'Erreur lors de la validation de la résidence', 'Veuillez renseigner votre commune');
      return;
    }

    const usecase = new OnboardingEtape2Usecase(new OnboardingRepositoryAxios());
    usecase
      .execute(utilisateurStore().utilisateur.id, {
        codeEpci: onboardingPostCreationCompte().codeEpci,
        codePostal: onboardingPostCreationCompte().codePostal,
      })
      .then(async () => {
        await router.replace({ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_3 });
      })
      .catch(error => {
        afficherAlerte(
          'error',
          'Erreur lors de la validation de la résidence',
          error.data.message || 'Une erreur est survenue, veuillez réessayer plus tard.',
        );
      });
  };
</script>
