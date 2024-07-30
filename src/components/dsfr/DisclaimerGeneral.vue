<template>
  <div class="fr-notice fr-notice--info">
    <div class="fr-container">
      <div class="fr-notice__body">
        <p>
          <span class="fr-notice__title">Le service est en cours de construction.</span>
          <span class="fr-notice__desc">
            Certains contenus et fonctionnalités sur cette page seront mis à jour progressivement pour vous proposer la
            meilleure expérience.</span
          >
        </p>
        <button
          title="Masquer le message"
          @click="
            () => {
              utilisateurStore().disclaimer.afficherDisclaimerGeneral = false;
            }
          "
          class="fr-btn--close fr-btn"
        >
          Masquer le message
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/notice/notice.min.css';
  import { utilisateurStore } from '@/store/utilisateur';
</script>
