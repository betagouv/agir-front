<template>
  <h1 class="fr-h2">Options avancées</h1>
  <section class="fr-p-2w fr-mb-2w text--warning border--warning">
    <h2 class="fr-h4 fr-mb-1w text--warning">Supprimer mon compte</h2>
    <p class="fr-mb-1w">
      Vous pouvez à tout moment choisir de supprimer votre compte ainsi que l’ensemble des données qui y sont associées.
      <strong>Attention, aucune donnée ne pourra être récupérée.</strong>
    </p>
    <button
      :aria-controls="modaleId"
      class="fr-btn fr-btn--warning fr-btn--icon-left fr-icon-warning-line text--warning border--warning background--white"
      data-fr-opened="false"
    >
      Supprimer mon compte
    </button>
  </section>

  <Teleport to="body">
    <Modale :id="modaleId" :is-footer-actions="true" :radius="false" labelId="label-id">
      <template v-slot:contenu>
        <h1 id="label-id" class="fr-h4 fr-modal__title">Veuillez confirmer la suppression du compte</h1>
        <p>Voulez-vous vraiment supprimer votre compte ainsi que les données associées ?</p>
        <p><strong>Attention : Aucune donnée ne pourra être récupérée.</strong></p>
      </template>
      <template v-slot:footer>
        <ul
          class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
        >
          <li>
            <button class="fr-btn fr-icon-warning-line" @click="supprimerLeCompte">Confirmer</button>
          </li>
          <li>
            <button :aria-controls="modaleId" class="fr-btn fr-btn--secondary">Annuler</button>
          </li>
        </ul>
      </template>
    </Modale>
  </Teleport>
</template>

<script lang="ts" setup>
  import Modale from '@/components/custom/Modale/Modale.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { SupprimerCompteUtilisateurUsecase } from '@/domaines/compte/supprimerCompteUtilisateur.usecase';
  import { sessionAppRawDataStorage } from '@/shell/appRawDataStorage';
  import { utilisateurStore } from '@/store/utilisateur';

  const modaleId = 'modale-suppression-compte';

  const supprimerLeCompte = () => {
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;

    const usecase = new SupprimerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
      sessionAppRawDataStorage,
    );
    usecase.execute(idUtilisateur, url => (window.location.href = url));
  };
</script>

<style scoped>
  .fr-btn--warning:hover,
  .fr-btn--warning:active {
    background-color: var(--background-alt-grey);
  }
</style>
