<template>
  <div class="banniere-collectivite">
    <div class="fr-container text--center">
      <h1 class="fr-display--xs">Comment engager vos habitants dans la transition écologique ?</h1>
      <p>
        <strong class="display-block">Déployez J’agis dans votre collectivité.</strong>
        J’agis s’adapte à votre collectivité pour accompagner vos habitants et valoriser vos initiatives locales
      </p>
      <div class="position--relative">
        <!--        TODO: tracker le lien-->
        <a
          href="https://calendly.com/abdellah-bouhend-beta/rencontre-j-agis-pour-les-collectivites"
          class="fr-btn shadow"
          >Prendre rendez-vous</a
        >
      </div>

      <ul class="banniere-collectivite__partenaires list-style-none fr-mr-0 flex align-items--center flex-center">
        <li v-for="partenaire in partenaires" :key="partenaire.name">
          <img :src="partenaire.logo" :alt="partenaire.name" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  const partenaires: { name: string; logo: string }[] = [
    {
      name: 'Métropole de Dijon',
      logo: '/Logo_Dijon_metropole.svg',
    },
    {
      name: "Métropole d'Angers-Loire",
      logo: '/Logo_Angers-Loire-Metropole.svg',
    },
    {
      name: 'Métropole de Bordeaux',
      logo: '/Logo_Bordeaux_Metropole.svg',
    },
    {
      name: 'Métropole de Toulouse',
      logo: '/Logo_Toulouse_Metropole.svg',
    },
    {
      name: 'Métropole du Grand Besançon',
      logo: '/Logo_Grand_Besancon_Metropole.svg',
    },
  ];
</script>

<style scoped>
  .banniere-collectivite {
  }

  .banniere-collectivite__partenaires {
    margin-top: 4rem;
    margin-bottom: 3rem;
    gap: 3rem;
  }

  .banniere-collectivite__partenaires img {
    max-width: 11rem;
    height: 5rem;
  }
</style>
