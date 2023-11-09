<template>
  <div class="fr-container">
    <FilDAriane
      page-courante="Changer de mot de passe"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: 'coach',
        },
        {
          label: 'Mon Compte',
          url: 'mon-compte',
        },
      ]"
    />
    <form
      class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
      @submit.prevent="mettreAJourLeMotDePasse"
    >
      <fieldset class="fr-mb-0 fr-fieldset">
        <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identity-fieldset-legend">
          <h1>Changer de mot de passe</h1>
        </legend>

        <div class="fr-col-12 fr-py-0 fr-mb-4w">
          <InputPassword v-model="motDePasse" @update:mot-de-passe-valide="onMotDePasseValideChanged" />
        </div>
        <button :disabled="!formulaireValide" class="fr-btn">Mettre à jour</button>
        <Alert
          v-if="alerte.isActive"
          class="fr-col-12 fr-mt-2w"
          :type="alerte.type"
          :titre="alerte.titre"
          :message="alerte.message"
        />
      </fieldset>
    </form>
  </div>
</template>

<script setup lang="ts">
  import InputPassword from '@/components/custom/InputPassword.vue';
  import { ref } from 'vue';
  import { ChangerMotDePasseDepuisLeCompteUsecase } from '@/compte/changerMotDePasseDepuisLeCompte.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import Alert from '@/components/custom/Alert.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { useAlerte } from '@/composables/useAlerte';

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
