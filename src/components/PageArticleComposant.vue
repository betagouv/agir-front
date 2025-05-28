<template>
  <h1>{{ article.titre }}</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-8">
      <div class="fr-p-6v background--white shadow--light">
        <img v-if="article.image" :src="article.image" alt="" class="full-width" />
        <h2 v-if="article.sousTitre" class="fr-h3">{{ article.sousTitre }}</h2>
        <div class="cms__content" v-html="cacherEmojisAuxLecteursDecrans(article.texte)" />
        <div v-if="article.sources && article.sources.length > 0" class="fr-mt-2w fr-mb-4w print-hidden">
          <hr />
          <p v-if="article.sources.length === 1" class="fr-text--xs">
            <span class="fr-mr-1w text--bold">Source :</span>
            <a :href="article.sources[0].url" rel="noopener noreferrer" target="_blank">{{
              article.sources[0].label
            }}</a>
          </p>
          <div v-else class="fr-text--xs">
            <span class="fr-mr-1w text--bold">Sources :</span>
            <ul>
              <li v-for="source in article.sources" :key="source.label">
                <a :href="source.url" rel="noopener noreferrer" target="_blank">{{ source.label }}</a>
              </li>
            </ul>
          </div>
        </div>
        <div
          v-if="utilisateurStore().estConnecte"
          class="print-hidden fr-grid-row fr-grid-row--middle flex-space-between border fr-p-2w"
        >
          <FieldsetNotationEtoile
            class="full-width fr-m-1w"
            legend="Comment avez-vous trouvé cet article ?"
            legend-class="fr-m-0 fr-text--bold"
            @update:notation="noterLarticle"
            :total="4"
            :a-des-indicateurs="true"
          />
        </div>
        <div v-if="estEnchainementMission">
          <slot />
        </div>
        <div v-else class="print-hidden fr-grid-row fr-mt-5v fr-grid-row--middle flex-space-between">
          <router-link :to="{ path: dernierePageStore.path }" class="fr-btn display-block fr-my-0">
            {{ labelBouton ? `Revenir ${labelBouton}` : 'Retour' }}
          </router-link>
        </div>
      </div>
    </div>
    <div class="fr-col-12 fr-col-md-4 print-hidden">
      <div class="background--white shadow--light gap--small fr-px-2w fr-pb-2w">
        <div class="fr-grid-row flex-space-between full-width">
          <template v-if="utilisateurStore().estConnecte">
            <button
              v-if="!article.estEnFavori"
              class="fr-btn fr-btn--tertiary fr-icon-heart-line fr-btn--icon-right icon-favoris--off fr-mt-2w"
              @click="ajouterAuxFavoris"
            >
              Ajouter aux favoris
            </button>
            <button
              v-else
              class="fr-btn fr-btn--tertiary fr-icon-heart-fill fr-btn--icon-right icon-favoris--on fr-mt-2w"
              @click="retirerDesFavoris"
            >
              Retirer des favoris
            </button>
          </template>
          <button class="fr-btn fr-btn--tertiary fr-btn--icon-left fr-icon-printer-fill fr-mt-2w" @click="imprimer">
            Imprimer
          </button>
        </div>

        <hr class="full-width fr-mt-2w" />

        <PartageReseauxSociaux />
      </div>

      <div v-if="article.partenaire" class="fr-mt-3w shadow--light">
        <div class="fr-grid-row flex-space-between align-items--center full-width background--white fr-p-2w">
          <p class="text--lh-1-3 fr-h5 fr-mb-0 fr-col-8">
            <span class="text--normal text--bleu text--italic fr-text--md">Proposé par</span><br />
            {{ article.partenaire.nom }}
          </p>
          <div class="fr-col-4">
            <img
              v-if="article.partenaire.logo"
              :src="article.partenaire.logo"
              alt=""
              class="full-width img-partenaire"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import FieldsetNotationEtoile from '@/components/custom/Form/FieldsetNotationEtoile.vue';
  import PartageReseauxSociaux from '@/components/dsfr/PartageReseauxSociaux.vue';
  import { ArticleRepositoryAxios } from '@/domaines/article/adapters/article.repository.axios';
  import { AjouterAuxFavorisUsecase } from '@/domaines/article/ajouterAuxFavoris.usecase';
  import { EvaluerArticleUsecase } from '@/domaines/article/evaluerArticle.usecase';
  import { Article } from '@/domaines/article/recupererArticle.usecase';
  import { RetirerDesFavorisUsecase } from '@/domaines/article/retirerDesFavoris.usecase';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import cacherEmojisAuxLecteursDecrans from '@/shell/cacherEmojisAuxLecteursDecrans';
  import { useNavigationStore } from '@/store/navigationStore';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    article: Article;
    estEnchainementMission?: boolean;
  }>();

  const dernierePageStore = useNavigationStore().pagePrecedente;
  const labelBouton =
    dernierePageStore.name === RouteThematiquesName.THEMATIQUE
      ? 'à la thématique'
      : dernierePageStore.name === RouteCoachName.BIBLIOTHEQUE
        ? 'à la bibliothèque'
        : undefined;

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

  .img-partenaire {
    max-height: 5rem;
    object-fit: contain;
  }
</style>
