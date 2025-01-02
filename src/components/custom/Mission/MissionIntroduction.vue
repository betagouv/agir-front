<template>
  <div class="background--white shadow fr-p-3w border-radius--md fr-mb-3w">
    <div class="intro--layout flex fr-mb-2w">
      <img :src="urlImage" class="border-radius--md img-object-fit-cover" height="200" alt="" />

      <div class="gap--small">
        <div class="flex align-items--center gap--small fr-mb-2w">
          <h1 class="fr-my-0 fr-mr-1w">
            {{ titre }}
          </h1>
          <ThematiqueTag :tag="tag" class="intro--tag" />
        </div>

        <p class="fr-m-0" v-html="texte"></p>
      </div>
    </div>

    <div class="flex flex-center fr-mt-3w">
      <button
        id="btnContinuer"
        class="fr-btn fr-btn--lg fr-btn--icon-right fr-icon-arrow-right-line"
        @click="onClickContinuer"
      >
        Commencer
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { TagStyle } from '@/domaines/thematiques/TagThematique';

  defineProps<{
    titre: string;
    urlImage: string;
    texte?: string;
    tag: {
      label: string;
      style: TagStyle;
    };
    onClickContinuer: () => void;
  }>();

  onMounted(() => {
    const btnContinuer = document.getElementById('btnContinuer');
    btnContinuer?.focus();
  });
</script>

<style scoped>
  .intro--layout {
    gap: 1.5rem;
    flex-direction: column;

    @media all and (min-width: 800px) {
      flex-direction: row;
    }
  }

  .intro--tag {
    min-width: fit-content;
  }
</style>
