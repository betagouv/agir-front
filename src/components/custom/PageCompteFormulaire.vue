<template>
  <form class="fr-mb-0 background--white fr-p-4w border border-radius--md" @submit.prevent="modifierInformation">
    <fieldset class="fr-mb-0 fr-fieldset" aria-labelledby="identité-fieldset-legend">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0" id="identité-fieldset-legend">
        <h2>Identité personnelle</h2>
      </legend>
      <div class="fr-col-12">
        <InputText label="Nom" name="nom" v-model="compteUtlisateurViewModel.nom" />
        <InputMail label="Adresse électronique" v-model="compteUtlisateurViewModel.mail" name="mail" />
        <InputCodePostal
          v-model="compteUtlisateurViewModel.codePostal"
          :defaultValue="compteUtlisateurViewModel.codePostal"
        />
        <button class="fr-btn fr-mt-4w">Mettre à jour</button>
      </div>
    </fieldset>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import { CompteUtlisateurViewModel } from '@/compte/adapters/compteUtilisateur.presenter.impl';
  import { MettreAJourCompteUtilisateurUsecase } from '@/compte/mettreAJourCompteUtilisateur.usecase';
  import { CompteUtilisateurRepositoryImpl } from '@/compte/adapters/compteUtilisateur.repository.impl';
  import { SessionRepositoryStore } from '@/authentification/adapters/session.repository.store';
  import InputText from '@/components/dsfr/InputText.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';

  const props = defineProps<{
    compteUtlisateurViewModel: CompteUtlisateurViewModel;
  }>();

  const compteUtlisateurViewModel = ref<CompteUtlisateurViewModel>(props.compteUtlisateurViewModel);

  function modifierInformation() {
    const usecase = new MettreAJourCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore()
    );
    usecase.execute(compteUtlisateurViewModel.value);
  }
</script>
