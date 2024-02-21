<template>
  <p class="fr-text--lg">Saisissez l’adresse électronique associé à votre compte.</p>
  <form @submit.prevent="recupererMotDePasse">
    <InputMail label="Adresse électronique" v-model="email" name="email" />
    <button class="fr-btn fr-btn--lg" :disabled="!email" type="submit">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { ref } from 'vue';
  import { CommencerRedefinirMotDePasseUsecase } from '@/authentification/commencerRedefinirMotDePasse.usecase';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';

  const email = ref('');

  const emit = defineEmits<{
    (e: 'update:email', value: string): void;
  }>();

  const recupererMotDePasse = () => {
    const commencerRedefinirMotDePasse = new CommencerRedefinirMotDePasseUsecase(new UtilisateurRepositoryAxios());
    commencerRedefinirMotDePasse.execute(email.value).then(() => {
      emit('update:email', email.value);
    });
  };
</script>
