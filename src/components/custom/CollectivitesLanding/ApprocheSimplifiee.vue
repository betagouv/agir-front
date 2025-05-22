<template>
  <div class="background--olive-clair">
    <div class="fr-container fr-py-8w">
      <div class="fr-grid-row">
        <div class="fr-col-12 fr-col-lg-8 fr-mx-auto">
          <h2 class="fr-h2 text--center fr-mb-10w">
            Une approche
            <span class="soulignement display-inline-block position--relative z-index-2">simplifiée</span> de la
            mobilisation citoyenne pour l'environnement
          </h2>
        </div>
      </div>

      <div class="fr-grid-row fr-mb-7w align-items--center">
        <div class="fr-col-12 fr-col-sm-5 fr-mb-3w">
          <h3 class="fr-h3">Tout pour mobiliser vos habitants</h3>
          <p>
            Grâce à nos outils d'animation de communautés, engagez les habitants de votre collectivité avec un guide
            pratique et de nombreux outils pour les aider à passer à l'action
          </p>
          <a class="fr-link fr-link fr-link--icon-right fr-icon-arrow-right-line" :href="lienRdv"
            >Prendre rendez-vous</a
          >
        </div>
        <div class="fr-col-12 fr-col-sm-6 fr-mb-3w fr-col-offset-sm-1">
          <img
            class="full-width"
            src="/collectivites-exemple-services.webp"
            alt="Le service propose de nombreux services pour les citoyens au sujet de l'alimentation, des transports, de la consommation et du logement"
          />
        </div>
      </div>

      <div class="fr-grid-row align-items--center flex-reverse-row">
        <div class="fr-col-12 fr-col-sm-5 fr-mb-3w fr-col-offset-sm-1">
          <div class="fr-mb-1w">
            <h3 class="fr-h3">Un point d’entrée unique</h3>
            <p>
              Nous simplifions la mobilisation citoyenne pour l’environnement en centralisant toutes les ressources
              utiles à la transition autour d'un commun numérique
            </p>
            <a class="fr-link fr-link fr-link--icon-right fr-icon-arrow-right-line" :href="lienRdv"
              >Prendre rendez-vous</a
            >
          </div>
        </div>
        <div class="fr-col-12 fr-col-sm-6 fr-mb-3w">
          <img
            class="full-width"
            src="/collectivites-exemple-actions.webp"
            alt="Quatre exemples d'aides disponible sur l'application pour les citoyens : la réparation d'un objet électronique, le changement d'un système de chauffage, l'achat d'un vélo, et enfin l'achat ou la location d'un véhicule électrique, hydrogène ou hybride."
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    lienRdv: string;
  }>();
</script>

<style scoped>
  h2 {
    margin: 0 auto;
  }

  .soulignement::before {
    background-image: url('/soulignement-stylise.svg');
    content: ' ';
    top: 90%;
    position: absolute;
    width: 100%;
    height: 10px;
    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
  }
</style>
