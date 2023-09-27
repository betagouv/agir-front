<template>
  <form
    class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md"
    @submit.prevent="performCreerCompteUtilisateur"
  >
    <fieldset class="fr-mb-0 fr-fieldset">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identity-fieldset-legend">
        <h2>Création de compte sur Agir</h2>
      </legend>
      <h3>Créer un compte avec FranceConnect</h3>
      <div class="fr-col-12 text--center">
        <BoutonFranceConnect />
      </div>
      <div class="separateur fr-mb-2v">ou</div>
      <h3>Créer un compte en choisissant un identifiant</h3>
      <div class="fr-col-12">
        <div class="fr-col-12 fr-col-lg-5">
          <fieldset class="fr-fieldset">
            <div class="fr-fieldset__element">
              <div class="fr-input-group">
                <label class="fr-label" for="family-name-1829"> Nom </label>
                <input
                  class="fr-input"
                  spellcheck="false"
                  autocomplete="family-name"
                  name="family-name"
                  id="family-name-1829"
                  type="text"
                  v-model="compteUtlisateurViewModel.nom"
                />
              </div>
            </div>
          </fieldset>
        </div>
        <div class="fr-col-12 fr-col-lg-5">
          <fieldset class="fr-fieldset">
            <div class="fr-fieldset__element">
              <div class="fr-input-group">
                <label class="fr-label" for="mail-1829"> Adresse électronique </label>
                <input
                  class="fr-input"
                  spellcheck="false"
                  autocomplete="mail-name"
                  name="mail"
                  id="mail-1829"
                  type="email"
                  v-model="compteUtlisateurViewModel.mail"
                />
              </div>
            </div>
          </fieldset>
        </div>
      </div>
      <div class="fr-col-12">
        <button class="fr-btn" type="submit">Créer mon compte</button>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
  import { CreerCompteUtilisateurUsecase } from '@/compte/creerCompteUtilisateur.usecase';
  import { ref } from 'vue';
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import BoutonFranceConnect from '@/components/BoutonFranceConnect.vue';

  let compteUtlisateurViewModel = ref<CompteUtlisateurViewModel>({
    id: '',
    nom: '',
    mail: '',
    codePostal: '',
  });

  utilisateurStore().reset();

  const performCreerCompteUtilisateur = () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    creeCompteUseCase
      .execute(compteUtlisateurViewModel.value)
      .then(() => {
        router.push({ name: 'coach' });
      }, undefined)
      .catch(erreur => {
        console.log("Une erreur s'est produite lors de la création du compte :", erreur);
      });
  };
</script>
<style scoped>
  .separateur {
    position: relative;
    text-align: center;
    width: 100%;

    &&:before,
    &&:after {
      content: '';
      position: absolute;
      height: 1px;
      width: 45%;
      background-color: #dddddd;
      top: 50%;
    }

    &&:before {
      left: 0;
    }

    &&:after {
      right: 0;
    }
  }
</style>
