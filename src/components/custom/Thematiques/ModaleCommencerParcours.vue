<template>
  <div class="mini-modale background--white fr-p-3w shadow">
    <p class="text--bold fr-mb-1w fr-text--lg">
      Envie d'avoir un <span class="surlignage surlignage-bleu">vrai impact ?</span>
    </p>
    <p class="fr-mb-2w">
      Laissez-vous guider par nos recommandations d’actions
      <span class="text--bold">choisies pour vous</span> !
    </p>
    <button class="fr-btn animation__button--shake" @click="fermerModale">
      Commencer&nbsp;<span class="text--bold">+90&nbsp;<img src="/ic_score.svg" alt="points" /></span>
    </button>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ fermerModale: () => void }>();
</script>

<style scoped>
  .mini-modale {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 30%;
    min-width: 20rem;
    transform: translateX(-50%) translateY(-50%);
    z-index: 10;
  }

  .surlignage {
    position: relative;
    display: inline-block;
  }

  .surlignage::before {
    content: '';
    position: absolute;
    top: 60%;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: -1;
  }

  .surlignage-bleu::before {
    background-color: #def2ffc7;
  }
</style>
