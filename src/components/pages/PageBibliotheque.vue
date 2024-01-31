<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane page-courante="Bibliothèque" />
    <h1 class="fr-h2">Base de connaissance</h1>
    <div class="fr-grid-row">
      <div class="fr-col-md-4 fr-col-12">
        <h2 class="fr-h4">Filtres</h2>
        <h3>Thématiques</h3>
      </div>
      <div class="fr-col-md-8 fr-col-12">
        <h2 class="fr-h4">124 articles</h2>
        <div class="fr-grid-row fr-grid-row--gutters">
          <div class="fr-col-6" v-for="article in items">
            <BibliothequeCard
              :key="article.contentId"
              :titre="article.titre"
              :image="article.image"
              :description="article.description"
              :thematique="article.thematique"
              :content-id="article.contentId"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import BibliothequeCard from '@/components/custom/Bibliotheque/BibliothequeCard.vue';

  const items = [
    {
      titre: 'Par où commencer la rénovation de sa maison ?',
      thematique: '🌍 Global',
      description: 'lorem ipsum dolor description un peu longue hello',
      contentId: '1',
      image: 'https://picsum.photos/300/200',
    },
    {
      titre: 'Le coût carbone d’un t-shirt',
      thematique: '🌍 Global',
      description: 'lorem ipsum dolor description un peu longue hello',
      contentId: '1',
      image: 'https://picsum.photos/400/400',
    },
    {
      titre: 'C’est quoi 5 tonnes de CO2e ?',
      thematique: '🌍 Global',
      description: 'lorem ipsum dolor description un peu longue hello',
      contentId: '1',
      image: 'https://picsum.photos/400/400',
    },
    {
      titre: 'Quelle est la mission de l’ADEME ?',
      thematique: '🌍 Global',
      description: 'lorem ipsum dolor description un peu longue hello',
      contentId: '1',
      image: 'https://picsum.photos/300/200',
    },
  ];
</script>
