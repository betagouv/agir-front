<template>
  <h2 class="fr-h2 text--center">Notre approche</h2>
  <p class="fr-text--xl text--center">
    Une méthode <strong>sur-mesure,</strong> adaptée à vos besoins et vos contraintes
  </p>
  <ul class="fr-tags-group flex-center fr-mb-4w">
    <li>
      <p class="fr-tag text--white background--vert">Progressive</p>
    </li>
    <li>
      <p class="fr-tag text--white background--vert">Bienveillante</p>
    </li>
    <li>
      <p class="fr-tag text--white background--vert">Concrète</p>
    </li>
  </ul>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="item in items" :key="item.picto" class="fr-col-md-4 fr-col-12">
      <LandingNotreApprocheItem
        :picto="item.picto"
        :titre="item.titre"
        :description="item.description"
        :image="item.image"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import LandingNotreApprocheItem from '@/components/custom/Landing/LandingNotreApprocheItem.vue';

  const items = [
    {
      picto: 'fr-icon-account-circle-line',
      titre: 'Un parcours qui vous ressemble',
      description: 'Des recommandations basées sur votre mode de vie et vos priorités, sans culpabilité',
      image: '/hp-approche-1.png',
    },
    {
      picto: 'fr-icon-thumb-up-line',
      titre: 'Des outils pratiques et concrets',
      description: 'Agissez pour votre environnement proche grâce à des solutions et aides locales',
      image: '/hp-approche-1.png',
    },
    {
      picto: 'fr-icon-award-line',
      titre: 'Progrès mesurable',
      description: 'Suivez vos actions et vos progrès pour mesurer votre impact',
      image: '/hp-approche-1.png',
    },
  ];
</script>
