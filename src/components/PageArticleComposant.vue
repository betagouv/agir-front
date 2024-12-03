<template>
  <h1>{{ article.titre }}</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
      <div class="border fr-p-6v background--white border-radius--md">
        <h2 class="fr-h3">{{ article.sousTitre }}</h2>
        <div class="cms__content" v-html="article.texte" />
        <div v-if="article.sources && article.sources.length > 0" class="fr-mb-4w print-hidden">
          <p v-if="article.sources.length === 1" class="fr-text--xs">
            <span class="fr-mr-1w">Source :</span>
            <a :href="article.sources[0].url" target="_blank" rel="noopener noreferrer">{{
              article.sources[0].label
            }}</a>
          </p>
          <div v-else class="fr-text--xs">
            <span class="fr-mr-1w">Sources :</span>
            <ul>
              <li v-for="source in article.sources" :key="source.label">
                <a :href="source.url" target="_blank" rel="noopener noreferrer">{{ source.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="print-hidden fr-grid-row fr-grid-row--middle flex-space-between border border-radius--md fr-p-2w">
          <span class="fr-m-0 fr-text--bold fr-text--md">Comment avez-vous trouvé cet article ?</span>
          <Notation @rated="noterLarticle" />
        </div>
        <div v-if="estEnchainementMission"><slot /></div>
        <div v-else class="print-hidden fr-grid-row fr-mt-5v fr-grid-row--middle flex-space-between">
          <router-link class="fr-btn fr-mt-3w" :to="useBoutonRetour().url">
            {{ useBoutonRetour().label }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="fr-col-12 fr-col-md-4 print-hidden">
      <div class="fr-grid-row flex-center background--white border border-radius--md fr-p-2w gap--small">
        <button
          v-if="!article.estEnFavori"
          class="fr-btn fr-btn--tertiary fr-icon-heart-line fr-btn--icon-right icon-favoris--off"
          @click="ajouterAuxFavoris"
        >
          Ajouter aux favoris
        </button>
        <button
          v-else
          class="fr-btn fr-btn--tertiary fr-icon-heart-fill fr-btn--icon-right icon-favoris--on"
          @click="retirerDesFavoris"
        >
          Retirer des favoris
        </button>
        <button class="fr-btn fr-btn--tertiary fr-btn--icon-left fr-icon-printer-fill fr-ml-1w" @click="imprimer">
          Imprimer
        </button>
      </div>

      <div v-if="article.partenaire" class="fr-mt-2w background--white border border-radius--md fr-p-2w">
        <p class="fr-mb-0">Proposé par</p>
        <img class="fr-mt-5v max-full-width" :src="article.partenaire.logo" :alt="article.partenaire.nom" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import Notation from '@/components/custom/Notation.vue';
  import { useBoutonRetour } from '@/composables/boutonRetour';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { AjouterAuxFavorisUsecase } from '@/domaines/article/ajouterAuxFavoris.usecase';
  import { EvaluerArticleUsecase } from '@/domaines/article/evaluerArticle.usecase';
  import { Article } from '@/domaines/article/recupererArticle.usecase';
  import { RetirerDesFavorisUsecase } from '@/domaines/article/retirerDesFavoris.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    article: Article;
    estEnchainementMission?: boolean;
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
  .icon-favoris--on::after {
    color: var(--red-marianne-main-472);
  }

  .icon-favoris--off::after {
    color: var(--blue-france-sun-113-625);
  }
</style>
