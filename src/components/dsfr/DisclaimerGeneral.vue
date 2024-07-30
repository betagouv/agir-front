<template>
  <div class="fr-notice fr-notice--info">
    <div class="fr-container">
      <div class="fr-notice__body">
        <p>
          <span class="fr-notice__title fr-mr-1v">{{ titre }}</span>
          <span class="fr-notice__desc" v-html="description" />
        </p>
        <button title="Masquer le message" @click="onClick" class="fr-btn--close fr-btn">Masquer le message</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/notice/notice.min.css';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    titre: string;
    description: string;
    onClick: () => void;
  }>();
</script>
