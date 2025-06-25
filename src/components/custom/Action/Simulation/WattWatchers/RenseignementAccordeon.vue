<template>
  <section class="accordeon-prm">
    <Accordeon name-id="accordeon-prm" class="fr-mb-3w">
      <template #titre>
        <span class="fr-icon-information-line fr-pr-1w" aria-hidden="true" />
        Où trouver le numéro de PRM&nbsp;?
      </template>

      <template #contenu>
        <div class="fr-grid-row fr-grid-row--gutters">
          <section class="fr-col-12 fr-col-md-6 flex fr-pr-2w">
            <img src="/facture-linky-exemple.webp" class="fr-pt-1w fr-mr-2w" alt="" />
            <div>
              <h4 class="fr-mb-1w">Sur votre facture</h4>
              <p class="fr-mb-0">Vous trouverez votre numéro de PRM sur votre facture</p>
            </div>
          </section>

          <section class="fr-col-12 fr-col-md-6 flex fr-pr-2w left-border">
            <img src="/compteur-linky-exemple.webp" class="fr-pt-1w fr-mr-2w" alt="" />
            <div>
              <h4 class="fr-mb-1w">Sur votre compteur Linky</h4>
              <p class="fr-mb-0">
                Faire défiler les affichages du compteur (appui sur la touche +) jusqu’à lire la valeur du “numéro de
                PRM”
              </p>
            </div>
          </section>
        </div>
      </template>
    </Accordeon>
  </section>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/dsfr/Accordeon.vue';
</script>

<style scoped>
  .accordeon-prm img {
    height: 7.5rem;
  }

  .accordeon-prm h4 {
    font-size: 1.1rem;
  }

  .left-border {
    position: relative;
    padding-left: 1rem;
  }

  .left-border::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 50%;
    width: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
</style>
