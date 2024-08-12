<template>
  <div
    class="fr-grid-row position--relative align-items--center background--white z-index-2 shadow fr-p-2w border border-radius--md"
  >
    <img
      :src="urlImage"
      class="fr-col-auto border-radius--md img-object-fit-cover fr-mr-2w"
      width="120"
      height="100"
      alt=""
    />
    <div class="fr-col">
      <span class="text--bleu">Mission terminée</span>
      <h1 class="fr-h1 fr-col fr-m-0">{{ titre }}</h1>
    </div>
    <button
      class="fr-btn fr-btn--secondary fr-ml-auto fr-col-auto"
      :disabled="!estTerminee"
      data-fr-opened="false"
      :aria-controls="modaleId"
    >
      Terminer la mission
    </button>
  </div>

  <Teleport to="body" v-if="estTerminee">
    <Modale label="Modale de fin de mission" :id="modaleId" :radius="true" :is-footer-actions="false" size="s">
      <template v-slot:contenu>
        <div class="fr-grid-row fr-grid-row--gutters modale-thematique-terminee">
          <div class="fr-col-7">
            <h1 :id="modaleId">Bravo !</h1>
            <p class="fr-text--lg text--bleu fr-mb-0">Vous avez gagné votre carte mission</p>
          </div>
          <ThematiqueCardDone class="fr-col-5" :titre="titre" :urlImage="urlImage" />
        </div>
        <div class="fr-py-3w text--center">
          <h2 class="fr-text--lg fr-mb-2w">Découvrez de nouvelles missions</h2>
          <router-link :to="`/univers/${universId}`" class="fr-btn fr-btn--lg"> Revenir à l’univers </router-link>
        </div>
      </template>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ThematiqueCardDone from '@/components/custom/Thematiques/ThematiqueCardDone.vue';

  defineProps<{ urlImage: string; titre: string; estTerminee: boolean; universId: string }>();

  const modaleId = 'terminer-mission-modale';
</script>

<style scoped>
  .modale-thematique-terminee {
    padding: 1rem;
    flex-direction: row-reverse;
    background-image: url('/bg_fin-de-mission.jpg');
    background-size: cover;
    background-position: center;
  }
</style>
