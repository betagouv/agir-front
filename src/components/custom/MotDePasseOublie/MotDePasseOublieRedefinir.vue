<template>
  <div class="fr-messages-group">
    <Alert
      v-if="alerte.isActive"
      class="fr-col-12 fr-mb-2w"
      :type="alerte.type"
      :titre="alerte.titre"
      :message="alerte.message"
      aria-live="assertive"
    />
  </div>

  <h2 class="fr-text--lg text--normal">
    Saisissez le code envoyé à l’adresse suivante&nbsp;:
    <strong>{{ email }}</strong>
  </h2>

  <form @submit.prevent="definirMotDePasse">
    <InputText
      class="fr-col-md-7 fr-mt-2w"
      v-model="code"
      name="code"
      label="Code à usage unique"
      description="La réception du mail peut prendre quelques minutes."
      :required="true"
      :maxlength="6"
    />
    <p class="fr-mt-4w fr-mb-0">Vous n’avez pas reçu de code ?</p>
    <button class="fr-link fr-icon-mail-line fr-link--icon-left text--underline fr-mb-2w" @click.prevent="renvoyerCode">
      Renvoyer le code
    </button>

    <h2 class="fr-text--lg text--normal fr-mt-3w">Définissez votre nouveau mot de passe</h2>
    <InputPassword
      autocomplete-value="new-password"
      class="fr-my-2w"
      v-model="motDePasse"
      @update:mot-de-passe-valide="onMotDePasseValideChanged"
      legende="Votre nouveau mot de passe doit contenir :"
    />
    <button class="fr-btn display-block text--center" type="submit">Valider</button>
  </form>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import InputPassword from '@/components/custom/Form/InputPassword.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { CommencerRedefinirMotDePasseUsecase } from '@/domaines/authentification/commencerRedefinirMotDePasse.usecase';
  import { TerminerRedefinirMotDePasseUsecase } from '@/domaines/authentification/terminerRedefinirMotDePasse.usecase';
  import router, { RouteCommuneName } from '@/router';

  const props = defineProps<{ email: string }>();
  const code = ref<string>('');
  const motDePasse = ref<string>('');
  const motDePasseValide = ref(false);
  const inputPassword = ref<HTMLInputElement>();

  const { alerte, afficherAlerte } = useAlerte();

  onMounted(() => {
    inputPassword.value = document.querySelector('#password') as HTMLInputElement;
  });

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
        inputPassword.value?.focus();
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
