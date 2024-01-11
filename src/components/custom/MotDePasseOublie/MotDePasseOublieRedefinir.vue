<template>
  <p class="fr-text--lg">
    Définissez votre nouveau mot de passe et saisissez le code envoyé à l’adresse suivante :
    <strong>{{ email }}</strong>
  </p>
  <form @submit.prevent="definirMotDePasse">
    <InputPassword class="fr-mt-4w" v-model="motDePasse" @update:mot-de-passe-valide="onMotDePasseValideChanged" />
    <InputText class="fr-col-md-5 fr-mt-2w" v-model="code" name="code" label="Code à usage unique" />
    <button class="fr-btn display-block text--center" :disabled="!motDePasseValide || code.length === 0" type="submit">
      Valider
    </button>
  </form>
  <div class="fr-messages-group">
    <Alert
      v-if="erreur"
      class="fr-col-12 fr-mt-2w"
      type="error"
      titre="Erreur lors de la modification du mot de passe"
      :message="messageErreur"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import InputPassword from '@/components/custom/InputPassword.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { UtilisateurRepositoryAxios } from '@/authentification/adapters/utilisateur.repository.axios';
  import { TerminerRedefinirMotDePasseUsecase } from '@/authentification/terminerRedefinirMotDePasse.usecase';
  import router, { RouteCommuneName } from '@/router';
  import Alert from '@/components/custom/Alert.vue';

  const props = defineProps<{ email: string }>();
  const code = ref<string>('');
  const motDePasse = ref<string>('');
  const motDePasseValide = ref(false);
  const erreur = ref<boolean>(false);
  const messageErreur = ref<string>('');

  const onMotDePasseValideChanged = (value: boolean) => {
    motDePasseValide.value = value;
  };
  const definirMotDePasse = () => {
    const terminerRedefinirMotDePasse = new TerminerRedefinirMotDePasseUsecase(new UtilisateurRepositoryAxios());
    terminerRedefinirMotDePasse
      .execute(props.email, motDePasse.value, code.value)
      .then(() => {
        router.push({ name: RouteCommuneName.AUTHENTIFICATION });
      })
      .catch(reason => {
        erreur.value = true;
        messageErreur.value = reason.data.message;
      });
  };
</script>
