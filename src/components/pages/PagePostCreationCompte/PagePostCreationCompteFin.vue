<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
      <img src="/bg_creation_compte_fin.svg" alt="" />
      <h1 class="fr-h4 fr-mb-3w">Tout est prêt !</h1>
      <ul class="list-style-none fr-text--regular fr-text--lg">
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span class="fr-icon-arrow-right-line text--bleu" aria-hidden="true" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Découvrez les aides et dispositifs disponibles</span> pour les habitants de
            <span class="fr-text--bold text--bleu">{{ onboardingPostCreationCompte().commune }}</span> et des environs.
          </p>
        </li>
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span class="fr-icon-arrow-right-line text--bleu" aria-hidden="true" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Informez-vous sur les enjeux environnementaux</span> qui se cachent dans nos
            choix quotidiens.
          </p>
        </li>
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span class="fr-icon-arrow-right-line text--bleu" aria-hidden="true" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Personnalisez votre profil</span>
            pour obtenir des recommandations adaptées à vos moyens, vos envies et vos besoins.
          </p>
        </li>
        <li class="fr-grid-row fr-grid-row--gutters align-items--baseline">
          <span class="fr-icon-arrow-right-line text--bleu" aria-hidden="true" />
          <p class="fr-col fr-text--lg fr-mb-0">
            <span class="fr-text--bold">Gagnez des </span>
            <img src="/ic_score.svg" alt="points" /> en progressant avec <span class="text--italic">J'agis</span>.
          </p>
        </li>
      </ul>

      <button class="fr-btn fr-mr-4w" @click="validerLaReponse()">C'est parti&nbsp;!</button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { ValiderOnboardingPostCreationCompteUsecase } from '@/domaines/compte/validerOnboardingPostCreationCompte.usecase';
  import router from '@/router';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
  import { utilisateurStore } from '@/store/utilisateur';

  const validerLaReponse = async () => {
    const validerOnboardingPostCreationCompteUsecase = new ValiderOnboardingPostCreationCompteUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
    );
    await validerOnboardingPostCreationCompteUsecase.execute(
      utilisateurStore().utilisateur.id,
      onboardingPostCreationCompte(),
    );
    onboardingPostCreationCompte().$reset();
    await router.replace({ name: RouteCoachName.COACH });
  };
</script>
<style scoped></style>
