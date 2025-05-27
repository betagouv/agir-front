<template>
  <div class="banniere-collectivite position--relative fr-py-10w">
    <img src="/hp-hero-perso1-feuille.svg" alt="" class="feuilles-bottom-left" />
    <img src="/hp-hero-perso2-feuille.svg" alt="" class="feuilles-bottom-right" />
    <img src="/hp-hero-liere.svg" alt="" class="liere-right" />
    <img src="/liere-2.svg" alt="" class="liere-left" />

    <div class="fr-container text--center">
      <div class="heading--container">
        <h1 class="fr-display--xs">Comment engager vos habitants dans la transition écologique ?</h1>
      </div>

      <p class="fr-mb-5w">
        <strong class="display-block fr-mb-2w fr-text--lg">Déployez J’agis dans votre collectivité</strong>
        <i>J’agis</i> s’adapte à votre collectivité pour accompagner vos habitants et valoriser vos initiatives locales
      </p>

      <div class="position--relative fr-mb-10w">
        <a
          :href="lienRdv.lien"
          @click="lienRdv.fonctionTracking"
          class="fr-btn shadow fr-btn--lg"
          aria-describedby="bouton-rdv-description"
          >Prendre rendez-vous</a
        >

        <div class="fleche" aria-hidden="true"><img src="/collectivites-bouton-fleche.webp" alt="" /></div>
        <div class="bouton-description">
          <img
            id="bouton-rdv-description"
            src="/collectivites-bouton-description.webp"
            alt="Découvrez les contenus déjà disponibles pour vos habitants"
          />
        </div>
      </div>

      <ul
        class="banniere-collectivite__partenaires list-style-none fr-mr-0 flex align-items--center flex-center flex-wrap"
      >
        <li v-for="partenaire in partenaires" :key="partenaire.name">
          <img :src="partenaire.logo" :alt="partenaire.name" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    lienRdv: {
      lien: string;
      fonctionTracking: () => void;
    };
  }>();
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
      name: 'Métropole du Grand Besançon',
      logo: '/Logo_Grand_Besancon_Metropole.svg',
    },
  ];
</script>

<style scoped>
  .banniere-collectivite {
    overflow: hidden;
  }
  .banniere-collectivite__partenaires {
    gap: 3rem;
  }

  .banniere-collectivite__partenaires img {
    max-width: 10rem;
    height: 5rem;
  }

  .heading--container {
    width: 90%;
    margin: 0 auto;
  }

  .bouton-description {
    width: 80%;
    margin: 0 auto;
    padding-top: 3rem;
  }

  .fleche {
    display: none;
    position: absolute;
    top: 15%;
    right: 80%;
    width: 4rem;
    transform: rotate(135deg);
  }

  .feuilles-bottom-left,
  .feuilles-bottom-right {
    display: none;
  }

  .liere-right {
    display: none;
  }

  .liere-left {
    position: absolute;
    left: 0;
    top: 25%;
  }

  /* xs */
  @media (min-width: 20em) {
    .fleche {
      display: block;
    }
  }

  /* sm */
  @media (min-width: 36em) {
    .bouton-description {
      width: 50%;
      margin: 0 auto;
      padding-top: 4rem;
    }

    .fleche {
      width: 6rem;
      position: absolute;
      top: 15%;
      right: 72%;
    }

    .liere-right {
      position: absolute;
      right: 0;
      display: block;
    }

    .feuilles-bottom-left,
    .feuilles-bottom-right {
      position: absolute;
      bottom: 0;
      z-index: 0;
      display: block;
    }

    .feuilles-bottom-left {
      right: 91%;
    }

    .feuilles-bottom-right {
      right: -2%;
    }
  }

  /* md */
  @media (min-width: 48em) {
    .fleche {
      transform: rotate(0deg);
      position: absolute;
      left: 60%;
      top: 100%;
      height: 3rem;
    }

    .bouton-description {
      padding-top: 0;
      position: absolute;
      left: 70%;
      height: 3.5rem;
      top: 0;
      width: auto;
    }
  }

  /* lg */
  @media (min-width: 62em) {
    .fleche {
      top: 50%;
    }
  }

  .fleche img,
  .bouton-description img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
</style>
