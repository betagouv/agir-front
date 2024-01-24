<template>
  <p class="fr-text--lg">
    Définissez votre nouveau mot de passe et saisissez le code envoyé à l’adresse suivante :
    <strong>{{ email }}</strong>
  </p>
  <form @submit.prevent="definirMotDePasse">
    <InputText class="fr-col-md-5 fr-mt-2w" v-model="code" name="code" label="Code à usage unique" />
    <InputPassword class="fr-my-2w" v-model="motDePasse" @update:mot-de-passe-valide="onMotDePasseValideChanged" />
    <button class="fr-btn display-block text--center" :disabled="!motDePasseValide || code.length === 0" type="submit">
      Valider
    </button>
  </form>
  <p class="fr-mt-4w fr-mb-0">Vous n’avez pas reçu de code ?</p>
  <button class="fr-link fr-icon-mail-line fr-link--icon-left text--underline" @click="renvoyerCode">
    Renvoyer le code
  </button>
  <div class="fr-messages-group">
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-mt-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      fr-mb-2w
      :message="alerte.message"
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
  import { CommencerRedefinirMotDePasseUsecase } from '@/authentification/commencerRedefinirMotDePasse.usecase';
  import { useAlerte } from '@/composables/useAlerte';

  const props = defineProps<{ email: string }>();
  const code = ref<string>('');
  const motDePasse = ref<string>('');
  const motDePasseValide = ref(false);

  const { alerte, afficherAlerte } = useAlerte();

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
        afficherAlerte('error', 'Erreur lors de la modification du mot de passe', reason.data.message);
      });
  };

  const renvoyerCode = () => {
    const commencerRedefinirMotDePasse = new CommencerRedefinirMotDePasseUsecase(new UtilisateurRepositoryAxios());
    commencerRedefinirMotDePasse.execute(props.email).then(() => {
      afficherAlerte('success', 'Code envoyé', `Le code a été envoyé à l'adresse ${props.email}`);
    });
  };
</script>
