<template>
  <div class="fr-container">
    <BoutonRetourAutomatique class="fr-my-2w fr-pl-0" />

    <div v-if="recetteViewModel" class="fr-p-4w background--white shadow--light fr-mb-3w">
      <h1 class="fr-mb-1w">{{ recetteViewModel.titre }}</h1>
      <p class="flex align-items--center">
        <span v-if="recetteViewModel.tag" class="fr-tag fr-text--xs fr-mr-2w" :class="`${recetteViewModel.tag.style}`">
          {{ recetteViewModel.tag.label }}
        </span>
        <span class="fr-icon-timer-line">
          {{ recetteViewModel.tempsDePreparation }}
        </span>
      </p>

      <img
        v-if="recetteViewModel?.image"
        :src="recetteViewModel?.image"
        alt=""
        class="display-block recette--image fr-mb-2w"
      />

      <h2 class="fr-h3 fr-mt-4w">Les ingrédients</h2>
      <ul :class="recetteViewModel.ingredients.length > 5 ? 'columns-2' : ''">
        <li v-for="ingredient in recetteViewModel.ingredients" :key="ingredient">
          {{ ingredient }}
        </li>
      </ul>

      <h2 class="fr-h3 fr-mt-4w">Étapes</h2>
      <ol>
        <li v-for="etape in recetteViewModel.etapes" :key="etape">
          {{ decodeUnicode(etape) }}
        </li>
      </ol>
      <p class="flex flex-center fr-mt-4w fr-mb-0">© Santé publique France</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BoutonRetourAutomatique from '@/components/custom/BoutonRetourAutomatique.vue';
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

  useHead({
    title: computed(() => recetteViewModel.value?.titre && `${recetteViewModel.value.titre} - J'agis`),
  });

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      useRoute().params.id as string,
      new RecettePresenterImpl(vm => (recetteViewModel.value = vm)),
    );

    isLoading.value = false;
  });

  function decodeUnicode(str) {
    return str.replace(/\\u[\dA-F]{4}/gi, match => {
      return String.fromCharCode(parseInt(match.replace('\\u', ''), 16));
    });
  }
</script>
<style scoped>
  .recette--image {
    max-height: 40vh;
    display: block;
    object-fit: cover;
    width: 100%;
  }

  .columns-2 {
    columns: 2;
  }
</style>
