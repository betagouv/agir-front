<template>
  <div class="fr-col-12 fr-col-lg-5 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md">
    <h1>Je valide mon compte</h1>
    <p>
      Un code à usage unique vous a été envoyé à l'adresse <strong>{{ email }}</strong>
    </p>
    <form @submit.prevent="validerCode">
      <InputText class="fr-col-md-5" v-model="code" name="code" label="Code à usage unique" />
      <button class="fr-btn fr-mr-4w" :disabled="code.length == 0">Valider</button>
      <button class="fr-btn fr-btn--secondary" type="button">Renvoyer le code</button>
      <Alert
        v-if="validationDeCompteEnErreur"
        class="fr-col-12 fr-mt-2w"
        type="error"
        titre="Erreur lors de la validation du compte"
        :message="validationDeCompteMessageErreur"
      />
    </form>
  </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { ValiderCompteUtilisateurUsecase } from '@/compte/validerCompteUtilisateur.usecase';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { utilisateurStore } from '@/store/utilisateur';
  import router from '@/router';
  import Alert from '@/components/custom/Alert.vue';
  const code = ref('');
  let validationDeCompteEnErreur = ref<boolean>(false);
  let validationDeCompteMessageErreur = ref<string>('');
  const email = utilisateurStore().utilisateur.mail || new URLSearchParams(window.location.search).get('email') || '';

  const validerCode = async () => {
    const validerCompteUtilisateurUsecase = new ValiderCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    await validerCompteUtilisateurUsecase
      .execute(email, code.value)
      .then(() => {
        router.push({ name: 'coach' });
      })
      .catch(reason => {
        validationDeCompteMessageErreur.value = reason.data.message;
        validationDeCompteEnErreur.value = true;
      });
  };
</script>
