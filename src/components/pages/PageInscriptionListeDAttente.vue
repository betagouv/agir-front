<template>
  <div class="fr-container fr-py-6w">
    <div class="background--white border-radius--md border fr-m-auto fr-col-lg-8 fr-col-12 fr-p-3w">
      <img src="/waiting-list.svg" height="200" alt="" class="fr-mb-2w" />
      <h1 class="fr-h3">Venez co-construire ce service avec nous !</h1>
      <p>
        Agir est un nouveau service en <strong>cours d’expérimentation</strong> dans plusieurs villes.<br />
        Les inscriptions ne sont pas encore ouvertes à tous et toutes !
      </p>
      <p>
        Si vous souhaitez être dans les premiers à y accéder, vous pouvez
        <strong>vous inscrire sur notre liste d’attente</strong>. Nous vous inviterons prochainement par email (à
        l'adresse : <strong>{{ onboardingStore().email }}</strong
        >) à rejoindre l’aventure !
      </p>

      <form class="fr-col-lg-8 fr-col-12" @submit.prevent="envoyerPreInscription">
        <div class="fr-select-group">
          <label class="fr-label" for="selectTypeVisiteur">Vous êtes</label>
          <select class="fr-select" id="selectTypeVisiteur" name="selectTypeVisiteur" v-model="typeVisiteur">
            <option value="" selected disabled hidden>Sélectionner une option</option>
            <option value="collectivite">Collectivité</option>
            <option value="entreprise">Entreprise</option>
            <option value="citoyen">Citoyen</option>
            <option value="journaliste">Journaliste</option>
            <option value="association">Association</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        <div class="fr-input-group">
          <label class="fr-label" for="codePostal">
            Code postal
            <span class="fr-hint-text">Format 5 chiffres</span>
          </label>
          <input
            class="fr-input"
            name="codePostal"
            id="codePostal"
            required
            v-model="codePostal"
            type="text"
            maxlength="5"
          />
        </div>
        <button type="submit" class="fr-btn fr-btn--lg fr-mr-4w" :disabled="codePostal.length < 5">
          M’inscrire sur la liste d’attente
        </button>
        <router-link :to="{ name: RouteCommuneName.ACCUEIL }" class="fr-link"> Revenir à l’accueil </router-link>
        <Alert
          v-if="alerte.isActive"
          class="fr-col-12 fr-mt-2w"
          :type="alerte.type"
          :titre="alerte.titre"
          :message="alerte.message"
        />
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { ListeDAttenteRepositoryAxios } from '@/domaines/listeDAttente/adapters/listeDAttente.repository.axios';
  import {
    ListeDAttentePresenterImpl,
    ReponseInscriptionViewModel,
  } from '@/domaines/listeDAttente/adapters/listeDAttenteImpl.presenter';
  import { InscriptionListeDAttenteUsecase } from '@/domaines/listeDAttente/inscriptionListeDAttente.usecase';
  import router, { RouteCommuneName } from '@/router';
  import { onboardingStore } from '@/store/onboarding';

  const codePostal = ref<string>('');
  const typeVisiteur = ref<string>('citoyen');
  const reponseInscriptionViewModel = ref<ReponseInscriptionViewModel>();
  const { alerte, afficherAlerte } = useAlerte();

  onMounted(() => {
    if (onboardingStore().email === '') {
      router.push(RouteCommuneName.ACCUEIL);
    }
  });

  const envoyerPreInscription = async () => {
    const usecase = new InscriptionListeDAttenteUsecase(new ListeDAttenteRepositoryAxios());
    await usecase.execute(
      onboardingStore().email,
      codePostal.value,
      typeVisiteur.value,
      new ListeDAttentePresenterImpl(vm => (reponseInscriptionViewModel.value = vm)),
    );

    if (reponseInscriptionViewModel.value) {
      afficherAlerte(
        reponseInscriptionViewModel.value?.type,
        reponseInscriptionViewModel.value?.titre,
        reponseInscriptionViewModel.value?.message,
      );
    }
  };
</script>
