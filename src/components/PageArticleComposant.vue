<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane :page-courante="`Article: ${article.titre}`" />
    <h1>{{ article.titre }}</h1>

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <div class="article fr-p-6v background--white border-radius--md">
          <h2 class="fr-h3">{{ article.sousTitre }}</h2>
          <div class="cms__content" v-html="article.texte" />
          <div v-if="article.sources" class="fr-mb-4w print-hidden">
            <p v-if="article.sources.length === 1" class="fr-text--xs">
              <span class="fr-mr-1w">Source :</span>
              <a :href="article.sources[0].url" target="_blank" rel="noopener noreferrer">{{
                article.sources[0].label
              }}</a>
            </p>
            <div v-else class="fr-text--xs">
              <span class="fr-mr-1w">Sources :</span>
              <ul>
                <li v-for="source in article.sources" :key="source">
                  <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="print-hidden fr-grid-row fr-grid-row--middle flex-space-between border border-radius--md fr-p-2w">
            <span class="fr-m-0 fr-text--bold fr-text--md">Comment avez-vous trouvé cet article ?</span>
            <Notation @rated="noterLarticle" />
          </div>
          <div class="print-hidden fr-grid-row fr-mt-5v fr-grid-row--middle flex-space-between">
            <router-link class="fr-btn" :to="{ name: RouteCoachName.COACH }"> Revenir à l'accueil </router-link>
            <button
              v-if="!article.estEnFavori"
              class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-heart-fill"
              @click="ajouterAuxFavoris"
            >
              Ajouter aux favoris
            </button>
            <button
              v-else
              class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-heart-fill"
              @click="retirerDesFavoris"
            >
              Retirer des favoris
            </button>
            <button class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-printer-fill" @click="imprimer">
              Imprimer
            </button>
          </div>
        </div>
      </div>
      <div class="fr-col-12 fr-col-md-4 print-hidden">
        <div
          v-if="article.partenaire"
          class="fr-grid-row fr-grid-row--left flex-column fr-mb-5w background--white border border-radius--md fr-p-2w"
        >
          <span>Proposé par</span>
          <img class="img-partenaire fr-mt-5v" :src="article.partenaire.logo" :alt="article.partenaire.nom" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from './dsfr/FilDAriane.vue';
  import { Article } from '@/article/recupererArticle.usecase';

  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import Notation from '@/components/custom/Notation.vue';
  import { ArticleRepositoryAxios } from '@/article/adapters/article.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { EvaluerArticleUsecase } from '@/article/evaluerArticle.usecase';
  import { AjouterAuxFavorisUsecase } from '@/article/ajouterAuxFavoris.usecase';
  import { RetirerDesFavorisUsecase } from '@/article/retirerDesFavoris.usecase';

  const props = defineProps<{
    article: Article;
  }>();

  const emit = defineEmits<{
    (e: 'update:articleModifie', value: Article): void;
  }>();

  const noterLarticle = note => {
    const noterArticleUseCase = new EvaluerArticleUsecase(new ArticleRepositoryAxios());
    noterArticleUseCase.execute(props.article.id, utilisateurStore().utilisateur.id, note);
  };
  const imprimer = () => {
    window.print();
  };

  const ajouterAuxFavoris = async () => {
    const ajouterAuxFavorisUsecase = new AjouterAuxFavorisUsecase(new ArticleRepositoryAxios());
    await ajouterAuxFavorisUsecase.execute(props.article.id, utilisateurStore().utilisateur.id);
    emit('update:articleModifie', { ...props.article, estEnFavori: true });
  };

  const retirerDesFavoris = async () => {
    const retirerDesFavorisUsecase = new RetirerDesFavorisUsecase(new ArticleRepositoryAxios());
    await retirerDesFavorisUsecase.execute(props.article.id, utilisateurStore().utilisateur.id);
    emit('update:articleModifie', { ...props.article, estEnFavori: false });
  };
</script>

<style scoped>
  .article {
    border: 1px solid rgba(0, 0, 0, 0.19);
  }

  .img-partenaire {
    width: fit-content;
  }
</style>
