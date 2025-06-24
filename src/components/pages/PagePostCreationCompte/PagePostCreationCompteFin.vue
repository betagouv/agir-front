<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border">
      <img alt="" src="/bg_creation_compte_fin.svg" />
      <h1 class="fr-h4 fr-mb-3w">Tout est prêt !</h1>
      <ul class="list-style-none fr-text--regular fr-text--lg">
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span aria-hidden="true" class="fr-icon-arrow-right-line text--bleu" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Découvrez les aides et dispositifs disponibles</span> pour les habitants de
            <span class="fr-text--bold text--bleu">{{ onboardingPostCreationCompte().commune }}</span> et des environs.
          </p>
        </li>
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span aria-hidden="true" class="fr-icon-arrow-right-line text--bleu" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Informez-vous sur les enjeux environnementaux</span> qui se cachent dans nos
            choix quotidiens.
          </p>
        </li>
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span aria-hidden="true" class="fr-icon-arrow-right-line text--bleu" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Personnalisez votre profil</span>
            pour obtenir des recommandations adaptées à vos moyens, vos envies et vos besoins.
          </p>
        </li>
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span aria-hidden="true" class="fr-icon-arrow-right-line text--bleu" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Gagnez des </span>
            <img alt="points" src="/ic_score.svg" /> en progressant avec <i>J'agis</i>.
          </p>
        </li>
      </ul>

      <button class="fr-btn fr-mr-4w" @click="validerLaReponse()">C'est parti&nbsp;!</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import router from '@/router';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
  import { utilisateurStore } from '@/store/utilisateur';

  const validerLaReponse = async () => {
    utilisateurStore().utilisateur.pseudo = onboardingPostCreationCompte().pseudo;
    utilisateurStore().utilisateur.onboardingAEteRealise = true;
    onboardingPostCreationCompte().$reset();
    await router.replace({ name: RouteCoachName.ACCUEIL_CONNECTEE });
  };
</script>
<style scoped></style>
