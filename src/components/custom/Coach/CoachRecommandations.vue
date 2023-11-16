<template>
  <h2 class="fr-h2 fr-mb-0">Recommandations personnalisées</h2>
  <p class="fr-text--xl">En fonction de qui vous êtes et où vous en êtes</p>
  <CoachCardRecommandationHighlight
    :titre="recommandations.recommandationHighlight.titre"
    :image="recommandations.recommandationHighlight.image"
    :description="recommandations.recommandationHighlight.description"
    :url="recommandations.recommandationHighlight.url"
  />
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li
      v-for="recommandation in recommandations.recommandationsList"
      :key="recommandation.titre"
      class="fr-col-12 fr-col-md-4"
    >
      <CoachCardRecommandations
        :thematique="recommandation.thematique"
        :titre="recommandation.titre"
        :image="recommandation.image"
        :url="recommandation.url"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import CoachCardRecommandationHighlight from '@/components/custom/Coach/CoachCardRecommandationHighlight.vue';
  import CoachCardRecommandations from '@/components/custom/Coach/CoachCardRecommandations.vue';

  interface RecommandationsViewModel {
    recommandationHighlight: {
      titre: string;
      image: string;
      description: string;
      url: string;
    };
    recommandationsList: {
      thematique: string;
      titre: string;
      image: string;
      url: string;
    }[];
  }

  defineProps<{ recommandations: RecommandationsViewModel }>();
</script>
