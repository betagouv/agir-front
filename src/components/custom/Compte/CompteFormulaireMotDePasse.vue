<template>
  <form class="background--white fr-p-2w border border-radius--md" @submit.prevent="mettreAJourLeMotDePasse">
    <div class="fr-col-lg-6 fr-col-12">
      <h3 class="fr-h6">Changer mon mot de passe</h3>
      <div class="fr-col-12 fr-py-0 fr-mb-4w">
        <InputPassword
          autocomplete-value="new-password"
          v-model="motDePasse"
          @update:mot-de-passe-valide="onMotDePasseValideChanged"
          legende="Votre nouveau mot de passe doit contenir :"
        />
      </div>
      <button :disabled="!formulaireValide" class="fr-btn fr-btn--secondary">Modifier mon mot de passe</button>
    </div>
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-mt-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
    />
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputPassword from '@/components/custom/Form/InputPassword.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { ChangerMotDePasseDepuisLeCompteUsecase } from '@/domaines/compte/changerMotDePasseDepuisLeCompte.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

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
        afficherAlerte('success', 'Changement de mot de passe', 'Votre mot de passe a été modifié avec succès');
      })
      .catch(reason => {
        afficherAlerte('error', 'Changement de mot de passe', reason.data.message);
      });
  }
</script>
