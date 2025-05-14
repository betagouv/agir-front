<template>
  <div class="fr-card fr-card--sm">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          <router-link :to="url" :title="`Continuer la lecture de &quot;${titre}&quot;`">{{ titre }}</router-link>
        </h3>
        <p class="fr-card__desc">
          <span>{{ description }}</span>
        </p>
        <div class="fr-grid-row flex-space-between fr-grid-row--middle fr-mb-3v">
          <span>
            <span class="fr-sr-only">de la thématique :</span>
            <ThematiqueTag :tag="thematique" />
          </span>
          <button
            v-if="estFavoris"
            @click="retirerDesFavoris"
            class="fr-btn fr-btn--sm fr-text--xs fr-btn--tertiary-no-outline fr-icon-heart-fill fr-btn--icon-right fr-py-0 fr-px-1w icon-favoris--on"
          >
            Retirer des favoris
          </button>
          <button
            v-else
            @click="ajouterAuxFavoris"
            class="fr-btn fr-btn--sm fr-text--xs fr-btn--tertiary-no-outline fr-icon-heart-line fr-btn--icon-right fr-py-0 fr-px-1w icon-favoris--off"
          >
            Mettre en favori
          </button>
        </div>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <img class="fr-responsive-img" alt="" :src="image" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { AjouterAuxFavorisUsecase } from '@/domaines/article/ajouterAuxFavoris.usecase';
  import { RetirerDesFavorisUsecase } from '@/domaines/article/retirerDesFavoris.usecase';
  import { TagStyle } from '@/domaines/thematiques/TagThematique';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    id: string;
    image: string;
    thematique: { label: string; style: TagStyle };
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
  .fr-card__img > img {
    max-height: 10rem;
  }

  .icon-favoris--on::after {
    color: var(--red-marianne-main-472);
  }

  .icon-favoris--off::after {
    color: var(--blue-france-sun-113-625);
  }
</style>
