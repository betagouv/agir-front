<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
    <div class="fr-col-md-7">
      <h1>Comment réduire notre empreinte écologique selon nos moyens, nos lieux de vie et nos envies</h1>
      <div>
        <form class="fr-grid-row fr-grid-row--gutters align-items--end fr-mb-2w" @submit.prevent="verifierEmail">
          <div class="fr-col-md-8">
            <InputMail name="mail" v-model="email" label="Quelle est votre adresse email" class-label="fr-h3 fr-mb-0" />
          </div>
          <div class="fr-col-md-4">
            <button type="submit" class="fr-btn fr-btn--lg fr-btn--primary" :disabled="email.length === 0">
              Commencer
            </button>
          </div>
        </form>
        <router-link class="fr-link" :to="{ name: RouteCommuneName.AUTHENTIFICATION }">
          J'ai déjà un compte
        </router-link>
      </div>
    </div>
    <div class="fr-col-md-4 fr-col-offset-1 fr-hidden fr-unhidden-md">
      <img src="/landing-header.jpg" class="border-radius--full max-full-width" alt="" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { ListeDAttenteRepositoryAxios } from '@/domaines/listeDAttente/adapters/listeDAttente.repository.axios';
  import {
    ReponseVerificationViewModel,
    VerificationMailPresenterImpl,
  } from '@/domaines/listeDAttente/adapters/verificationMailImpl.presenter';
  import { VerificationWhiteListeUsecase } from '@/domaines/listeDAttente/verificationWhiteListe.usecase';
  import router, { RouteCommuneName } from '@/router';
  import { onboardingStore } from '@/store/onboarding';

  const email = ref('');
  const reponseVerificationViewModel = ref<ReponseVerificationViewModel>();

  const verifierEmail = async () => {
    onboardingStore().email = email.value;

    const usecase = new VerificationWhiteListeUsecase(new ListeDAttenteRepositoryAxios());
    await usecase.execute(
      email.value,
      new VerificationMailPresenterImpl(vm => (reponseVerificationViewModel.value = vm)),
    );

    if (reponseVerificationViewModel.value) {
      await router.push(reponseVerificationViewModel.value.redirectUrl);
    }
  };
</script>
