<template>
  <p class="fr-text--lg">Saisissez l’adresse électronique associé à votre compte.</p>
  <form @submit.prevent="recupererMotDePasse">
    <InputMail label="Adresse électronique" v-model="email" name="email" />
    <button class="fr-btn fr-btn--lg" type="submit">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { CommencerRedefinirMotDePasseUsecase } from '@/domaines/authentification/commencerRedefinirMotDePasse.usecase';

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
