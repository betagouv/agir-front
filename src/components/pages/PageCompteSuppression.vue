<template>
  <div>
    <button class="fr-btn fr-background-action-high--red-marianne" data-fr-opened="false" aria-controls="fr-modal-2">Supprimer le compte</button>
    <dialog aria-labelledby="fr-modal-2-title" id="fr-modal-2" class="fr-modal" role="dialog">
      <div class="fr-container fr-container--fluid fr-container-md">
        <div class="fr-grid-row fr-grid-row--center">
          <div class="fr-col-12 fr-col-md-8 fr-col-lg-6">
            <div class="fr-modal__body">
              <div class="fr-modal__header">
                <button class="fr-btn--close fr-btn" aria-controls="fr-modal-2">Fermer</button>
              </div>
              <div class="fr-modal__content">
                <h1 id="fr-modal-2-title" class="fr-modal__title">
                  <span class="fr-icon-arrow-right-line fr-icon--lg"></span>Confirmation de la suppression du compte
                </h1>
                <p>Voulez-vous vraiment supprimer votre compte ?</p>
              </div>
              <div class="fr-modal__footer">
                <ul class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left">
                  <li>
                    <button class="fr-btn fr-icon-checkbox-line" @click="supprimerLeCompte">Confirmer</button>
                  </li>
                  <li>
                    <button class="fr-btn fr-icon-checkbox-line fr-btn--secondary" aria-controls="fr-modal-2">Annuler</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  </div>
</template>
<script setup lang="ts">
import { CompteUtilisateurRepositoryImpl } from "@/compte/adapters/compteUtilisateur.repository.impl";
import { utilisateurStore } from "@/store/utilisateur";
import { SupprimerCompteUtilisateurUsecase } from "@/compte/supprimerCompteUtilisateur.usecase";
import router from "@/router";

const supprimerLeCompte = () => {
  const usecase = new SupprimerCompteUtilisateurUsecase(new CompteUtilisateurRepositoryImpl());
  const store = utilisateurStore();
  const idUtilisateur = store.id;
  usecase.execute(idUtilisateur);
  utilisateurStore().reset();
  router.replace("/");
};
</script>
