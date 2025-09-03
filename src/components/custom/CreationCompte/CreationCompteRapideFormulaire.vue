<template>
  <form @submit.prevent="performCreerCompteUtilisateur">
    <InputMail
      class="full-width"
      name="email"
      v-model="mail"
      :label="label?.text ?? 'Mon adresse e-mail'"
      :inputClass="inputClass"
      :class-label="label?.class"
      :has-hint="false"
      :message-erreur="messageErreurEmail"
    />
    <button :class="bouton?.class" v-text="bouton?.text ?? 'Valider'" />
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
  import { RefererRepositoryStore } from '@/domaines/compte/adapters/referer.repository.store';
  import { CreerCompteUtilisateurUsecase } from '@/domaines/compte/creerCompteUtilisateur.usecase';

  defineProps<{
    inputClass?: string;
    label?: {
      text?: string;
      class?: string;
    };
    bouton?: {
      text?: string;
      class?: string;
    };
  }>();

  const router = useRouter();
  const mail = ref<string>('');
  const messageErreurEmail = ref<string>();

  const performCreerCompteUtilisateur = async () => {
    if (!mail.value) return;

    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
      new RefererRepositoryStore(),
    );
    await creeCompteUseCase
      .execute(
        new CreerComptePresenterImpl(viewModel => {
          router.push({ name: viewModel.route });
        }),
        {
          mail: mail.value,
          situationId: null,
        },
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
