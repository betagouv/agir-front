<template>
  <article class="bibliotheque-card background--white border-radius--md shadow full-height flex flex-column">
    <img :src="image" class="bibliotheque-card__image" alt="" />
    <div class="fr-px-3w fr-py-2w full-height flex flex-column">
      <div class="fr-grid-row flex-space-between fr-grid-row--middle">
        <span class="fr-text--xs fr-text--bold fr-m-0" v-html="thematique" />
        <button
          v-if="estFavoris"
          @click="retirerDesFavoris"
          class="fr-btn fr-btn--sm fr-text--xs fr-text--bold fr-btn--tertiary-no-outline text--gris-dark fr-icon-heart-fill fr-btn--icon-right fr-pr-0 icon-favoris--on"
        >
          Retirer des favoris
        </button>
        <button
          v-else
          @click="ajouterAuxFavoris"
          class="fr-btn fr-btn--sm fr-text--xs fr-text--bold fr-btn--tertiary-no-outline text--gris-dark fr-icon-heart-line fr-btn--icon-right fr-pr-0 icon-favoris--off"
        >
          Mettre en favori
        </button>
      </div>
      <div class="flex flex-column flex-space-between full-height">
        <h3 class="fr-h4 text--bleu fr-mt-1w fr-mb-2w">{{ titre }}</h3>
        <p v-if="description" class="fr-text--md text--gris-dark fr-mb-2w">{{ description }}</p>
        <router-link
          :to="url"
          class="fr-link fr-icon-arrow-right-line fr-link--icon-right width--fit-content"
          :title="titre"
        >
          Continuer la lecture
        </router-link>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { AjouterAuxFavorisUsecase } from '@/domaines/article/ajouterAuxFavoris.usecase';
  import { RetirerDesFavorisUsecase } from '@/domaines/article/retirerDesFavoris.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    id: string;
    image: string;
    thematique: string;
    titre: string;
    description: string;
    url: string;
    favoris: boolean;
  }>();

  const estFavoris = ref(props.favoris);

  const ajouterAuxFavoris = async () => {
    estFavoris.value = true;
    const ajouterAuxFavorisUsecase = new AjouterAuxFavorisUsecase(new ArticleRepositoryAxios());
    await ajouterAuxFavorisUsecase.execute(props.id, utilisateurStore().utilisateur.id);
  };

  const retirerDesFavoris = async () => {
    estFavoris.value = false;
    const retirerDesFavorisUsecase = new RetirerDesFavorisUsecase(new ArticleRepositoryAxios());
    await retirerDesFavorisUsecase.execute(props.id, utilisateurStore().utilisateur.id);
  };
</script>

<style scoped>
  .bibliotheque-card {
    overflow: hidden;
  }

  .bibliotheque-card__image {
    height: 8rem;
    display: block;
    object-fit: cover;
    width: 100%;
  }

  .icon-favoris--on::after {
    color: var(--red-marianne-main-472);
  }

  .icon-favoris--off::after {
    color: var(--blue-france-sun-113-625);
  }
</style>
