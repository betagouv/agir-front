<template>
  <h2 class="text--center">De nombreux services pour naviguer dans la transition écologique</h2>
  <ul class="fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="(service, index) in services" :key="index" class="fr-col-md-4 fr-col-12">
      <div class="border background--white full-height fr-grid-row flex-column">
        <img :src="service.imgUrl" alt="" class="img-object-fit-contain full-width" />
        <div class="fr-p-4w fr-grid-row flex-column flex-grow">
          <h3>{{ service.titre }}</h3>
          <ul>
            <li v-for="(item, index) in service.liste" :key="index">{{ item }}</li>
          </ul>
          <p class="fr-text--lg fr-text--bold fr-mb-0 fr-mt-auto">{{ service.accroche }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
  const services = [
    {
      titre: 'Un accompagnement personnalisé',
      liste: [
        'tous les outils pour comprendre vos usages, vos moyens et vos envies et faire des recommandations adaptées',
        'des solutions pour toutes les situations',
        'une bibliothèque de contenus pour trouver les réponses à vos questions',
        'une approche ludique et pas à pas pour aller à votre rythme',
      ],
      accroche: "Plus de 1000 façons d'interagir avec Agir",
      imgUrl: '/OB-Coach.png',
    },
    {
      titre: 'Toutes les aides à la transition écologique',
      liste: [
        'De nombreuses aides sont disponibles pour vous accompagner dans la transition écologique : vélo, rénovation, logement, consommation durable...',
        "Pas facile de s'y retrouver entre les aides nationales, de la ville, de la région etc.",
        'Agir est là pour vous accompagner : toutes les aides et des simulateurs pour vérifier votre élligibilité et les montants associés.',
      ],
      accroche: "Jusqu'à 30 aides disponibles dans certaines communes !",
      imgUrl: '/OB-aide.png',
    },
    {
      titre: 'Des solutions éprouvées et partagées avec d’autres citoyens',
      liste: [
        'de nombreuses opportunités d’échanger les bonnes pratiques entre citoyens ayant les mêmes contraintes',
        'l’actualité de votre zone de vie pour connaître les événements et les nouvelles infrastructures',
        'des groupes thématiques pour avancer ensemble',
      ],
      accroche: 'Déjà 180 groupes locaux créés dans Agir',
      imgUrl: '/OB-Suivi.png',
    },
  ];
</script>
