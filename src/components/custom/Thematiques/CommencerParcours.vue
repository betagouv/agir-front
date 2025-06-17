<template>
  <section class="flex flex-space-between full-height position--relative z-index-2">
    <div class="fr-p-5w">
      <h2 class="text--normal fr-mb-4w">
        <span class="display-block text--bold">5 questions pour ...</span>
        <span class="fr-text--xl">Mieux comprendre vos habitudes</span>
      </h2>
      <button class="fr-btn animation__button--shake" @click="continuer">
        Commencer&nbsp;<span class="text--bold">+25&nbsp;<img alt="points" src="/ic_score.svg" /></span>
      </button>
    </div>

    <div class="decalage-droite fr-hidden fr-unhidden-md">
      <div class="flex flex-column">
        <div class="flex flex-center">
          <img :src="buildIllustrationFilePath(1)" alt="" class="action-illustration" />
          <img :src="buildIllustrationFilePath(2)" alt="" class="action-illustration" />
        </div>
        <div class="flex flex-center">
          <img :src="buildIllustrationFilePath(3)" alt="" class="action-illustration" />
        </div>
      </div>
    </div>
  </section>
  <div class="circle-background" />
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';

  defineProps<{ continuer: () => void }>();

  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));
  const thematiqueId = ref<ClefThematiqueAPI>(thematique.value.clefTechniqueAPI as ClefThematiqueAPI);

  function buildIllustrationFilePath(id: number) {
    return `/${thematiqueId.value}-action-${id}.webp`;
  }
</script>

<style scoped>
  .action-illustration {
    max-width: 20rem;
  }

  .circle-background {
    position: absolute;
    border-radius: 50%;
    right: -5%;
    bottom: 5%;
    transform: translateY(40%);
    z-index: 0;

    width: 600px;
    height: 600px;
    background-color: #f3ede5;
    opacity: 30%;
    pointer-events: none;
  }

  .decalage-droite {
    margin-right: -8%;
  }
</style>
