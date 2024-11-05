<template>
  <div class="fr-container fr-pb-4w" v-if="recetteViewModel">
    <img class="recette--image fr-mb-2w" alt="" :src="recetteViewModel?.image" />
    <div class="fr-mt-auto">
      <span v-if="recetteViewModel.tag" :class="`fr-tag fr-text--xs fr-mr-2w ${recetteViewModel.tag.style}`">
        {{ recetteViewModel.tag.label }}
      </span>
    </div>
    <h1 class="fr-mt-2w">{{ recetteViewModel.titre }}</h1>
    <p>
      <span class="fr-icon-timer-line" />
      {{ recetteViewModel.tempsDePreparation }}
    </p>
    <h2 class="fr-h3 fr-mt-4w">Ingrédients</h2>
    <ul>
      <li v-for="ingredient in recetteViewModel.ingredients" :key="ingredient">
        {{ ingredient }}
      </li>
    </ul>
    <h2 class="fr-h3 fr-mt-4w">Étapes</h2>
    <ol>
      <li v-for="etape in recetteViewModel.etapes" :key="etape">
        {{ etape }}
      </li>
    </ol>
    <div class="fr-grid-row flex-column fr-mb-4w"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import {
    RecettePresenterImpl,
    RecetteViewModel,
  } from '@/domaines/serviceRecherche/recettes/adapters/recette.presenter.impl';
  import { ServiceRechercheRecettesAxios } from '@/domaines/serviceRecherche/recettes/adapters/serviceRechercheRecettes.repository.axios';
  import { RecupererDetailServiceRecettesUsecase } from '@/domaines/serviceRecherche/recettes/recupererDetailServiceRecettes.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const recetteViewModel = ref<RecetteViewModel>();

  const usecase = new RecupererDetailServiceRecettesUsecase(new ServiceRechercheRecettesAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      useRoute().params.id as string,
      new RecettePresenterImpl(vm => (recetteViewModel.value = vm)),
    );

    isLoading.value = false;
  });
</script>
<style scoped>
  .recette--image {
    height: 20vh;
    display: block;
    object-fit: cover;
    width: 100%;
  }
</style>
