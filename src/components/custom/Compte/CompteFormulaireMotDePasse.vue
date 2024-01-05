<template>
  <form class="background--white fr-p-2w border border-radius--md" @submit.prevent="mettreAJourLeMotDePasse">
    <div class="fr-col-6">
      <h3 class="fr-h6">Changer votre mot de passe</h3>
      <div class="fr-col-12 fr-py-0 fr-mb-4w">
        <InputPassword v-model="motDePasse" @update:mot-de-passe-valide="onMotDePasseValideChanged" />
      </div>
      <button :disabled="!formulaireValide" class="fr-btn fr-btn--secondary">Modifier votre mot de passe</button>
      <Alert
        v-if="alerte.isActive"
        class="fr-col-12 fr-mt-2w"
        :type="alerte.type"
        :titre="alerte.titre"
        :message="alerte.message"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
  import InputPassword from '@/components/custom/InputPassword.vue';
  import { ref } from 'vue';
  import { ChangerMotDePasseDepuisLeCompteUsecase } from '@/compte/changerMotDePasseDepuisLeCompte.usecase';
  import Alert from '@/components/custom/Alert.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { utilisateurStore } from '@/store/utilisateur';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';

  const motDePasse = ref('');
  const formulaireValide = ref(false);

  const { alerte, afficherAlerte } = useAlerte();

  function onMotDePasseValideChanged(isMotDePasseValide: boolean) {
    formulaireValide.value = isMotDePasseValide;
  }

  function mettreAJourLeMotDePasse() {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    const usecase = new ChangerMotDePasseDepuisLeCompteUsecase(new CompteUtilisateurRepositoryImpl());
    usecase
      .execute(utilisateurId, motDePasse.value)
      .then(() => {
        afficherAlerte('success', 'Changement de mot de passe', 'Votre mot de passe a été changé');
      })
      .catch(reason => {
        afficherAlerte('error', 'Changement de mot de passe', reason.data.message);
      });
  }
</script>
