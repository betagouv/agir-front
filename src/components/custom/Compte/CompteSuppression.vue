<template>
  <h2 class="fr-h2">Options avancées</h2>
  <div class="fr-p-2w fr-mb-2w text-warning border--warning">
    <h3 class="fr-h6 fr-mb-1w text-warning">Supprimer votre compte</h3>
    <p class="fr-mb-1w">
      Vous pouvez à tous moments choisir de supprimer votre compte ainsi que l’ensemble des données qui y sont
      associées. <strong>Attention, aucune donnée ne pourra être récupérée.</strong>
    </p>
    <button
      class="fr-btn fr-btn--sm fr-btn--warning fr-btn--icon-left fr-icon-warning-line text-warning border--warning background--white"
      data-fr-opened="false"
      :aria-controls="modaleId"
    >
      Supprimer votre compte
    </button>
  </div>

  <Teleport to="body">
    <Modale label="Modale de suppression de compte" :id="modaleId" :radius="false" :is-footer-actions="true">
      <template v-slot:contenu>
        <h1 :id="modaleId" class="fr-h4 fr-modal__title">Veuillez confirmer la suppression du compte</h1>
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
            <button class="fr-btn fr-btn--secondary" :aria-controls="modaleId">Annuler</button>
          </li>
        </ul>
      </template>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import Modale from '@/components/custom/Modale/Modale.vue';
  import router from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import { SupprimerCompteUtilisateurUsecase } from '@/compte/supprimerCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';

  const modaleId = 'modale-suppression-compte';

  const supprimerLeCompte = () => {
    const store = utilisateurStore();
    const idUtilisateur = store.utilisateur.id;

    const usecase = new SupprimerCompteUtilisateurUsecase(new CompteUtilisateurRepositoryImpl());
    usecase.execute(idUtilisateur);

    utilisateurStore().reset();
    router.replace('/');
  };
</script>

<style scoped>
  .fr-btn--warning:hover,
  .fr-btn--warning:active {
    background-color: var(--background-alt-grey);
  }
</style>
