<template>
  <form
    class="fr-col-12 fr-col-lg-5 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
    @submit.prevent="mettreAJourLeMotDePasse"
  >
    <fieldset class="fr-mb-0 fr-fieldset">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identity-fieldset-legend">
        <h2>Changer de mot de passer</h2>
      </legend>

      <div class="fr-col-12 fr-py-0 fr-mb-4w">
        <InputPassword v-model="motDePasse" @update:mot-de-passe-valide="onMotDePasseValideChanged" />
      </div>
      <button :disabled="!formulaireValide" class="fr-btn fr-mt-4w">Mettre à jour</button>
      <Alert
        class="fr-col-12 fr-mt-2w"
        v-if="success"
        titre="Changement de mot de passe"
        message="votre mot de passe a été changé"
        type="success"
      />
      <Alert
        class="fr-col-12 fr-mt-2w"
        v-if="success != null && !success"
        titre="Changement de mot de passe"
        :message="errorMessage"
        type="error"
      />
    </fieldset>
  </form>
</template>

<script setup lang="ts">
  import InputPassword from '@/components/custom/InputPassword.vue';
  import { ref } from 'vue';
  import { ChangerMotDePasseDepuisLeCompteUsecase } from '@/compte/changerMotDePasseDepuisLeCompte.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import Alert from '@/components/custom/Alert.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  const motDePasse = ref('');
  const formulaireValide = ref(false);
  const success = ref<boolean | null>(null);
  const errorMessage = ref<string>('');
  function onMotDePasseValideChanged(isMotDePasseValide: boolean) {
    formulaireValide.value = isMotDePasseValide;
  }

  function mettreAJourLeMotDePasse() {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    const usecase = new ChangerMotDePasseDepuisLeCompteUsecase(new CompteUtilisateurRepositoryImpl());
    usecase
      .execute(utilisateurId, motDePasse.value)
      .then(() => {
        success.value = true;
      })
      .catch(reason => {
        errorMessage.value = reason.data.message;
        success.value = false;
      });
  }
</script>
