<template>
  <h2 class="fr-h3 text--lh-1-3">
    <span class="underline-courbe underline-courbe--vert">200</span> idées pour faire des économies en réduisant son
    empreinte
  </h2>

  <ul class="fr-p-0 list-style-none fr-tags-group fr-tags-group--sm fr-mb-2w">
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">🍛</span> Cuisine</p>
    </li>
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">🚅</span> Déplacements</p>
    </li>
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">🏠</span> Logement</p>
    </li>
    <li class="text--lh-1-3">
      <p class="fr-tag fr-tag--custom-bleu"><span aria-hidden="true" class="fr-pr-1v">💰</span> Aides financières</p>
    </li>
    <li class="text--lh-1-3"><p class="fr-tag fr-tag--custom-bleu">Solutions pratiques locales</p></li>
  </ul>

  <form class="flex flex-column" @submit.prevent="performCreerCompteUtilisateur">
    <InputMail
      name="email"
      label="Juste avec un mail !"
      v-model="compteUtilisateurInput.mail"
      class="fr-mb-2w"
      :has-hint="false"
      :message-erreur="messageErreurEmail"
    />
    <button class="fr-btn full-width text--center flex-center">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
  import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
  import router from '@/router';

  const messageErreurEmail = ref<string>();
  let compteUtilisateurInput = ref<UserInput>({
    mail: '',
    situationId: null,
  });

  const performCreerCompteUtilisateur = async () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
    );
    await creeCompteUseCase
      .execute(
        new CreerComptePresenterImpl(viewModel => {
          router.push({ name: viewModel.route });
        }),
        { ...compteUtilisateurInput.value, situationId: null },
      )
      .catch(error => {
        if (error.code === '020') {
          messageErreurEmail.value = "Le format de l'email n'est pas valide. Format attendu : nom@domaine.fr";
        } else {
          messageErreurEmail.value = 'Une erreur est survenue.';
        }
      });
  };
</script>
