<template>
  <div class="fr-container fr-py-6w">
    <div class="fr-col-12 fr-col-md-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border">
      <img alt="" src="/bg_creation_compte.svg" />
      <p class="text--normal text--bleu fr-mt-1w fr-mb-1w"><span class="fr-text--bold">Étape 1</span> sur 3</p>
      <h1 class="fr-h4 fr-mb-1w">Bienvenue sur J'agis&nbsp;! Faisons connaissance...</h1>

      <form aria-labelledby="identity-fieldset-legend" class="fr-mb-4w" @submit.prevent="validerLaReponse()">
        <fieldset class="fr-fieldset fr-mb-0">
          <legend id="identity-fieldset-legend" class="fr-fieldset__legend fr-text--regular fr-text--lg">
            Nous avons quelques questions à vous poser pour personnaliser votre expérience !
          </legend>
          <div class="fr-fieldset__element">
            <InputText
              autocomplete="username"
              v-model="onboardingPostCreationCompte().pseudo"
              :autofocus="true"
              :erreur="champsPseudoStatus"
              :maxlength="12"
              :required="true"
              label="Votre pseudonyme"
              description="Doit être composés de 3 à 21 caractères. Lettres et chiffres uniquement."
              name="utilisateur-pseudo"
            />

            <InputDateDeNaissance
              v-if="!utilisateurStore().utilisateur.estUnUtilisateurFranceConnect"
              ref="dateDeNaissanceComposant"
              v-model="onboardingPostCreationCompte().dateDeNaissance"
              class="fr-mt-4w"
              description="Nécessaire pour faciliter votre identification"
              keyName="formulaire-inscription"
              required
            />
          </div>
        </fieldset>
        <button class="fr-btn fr-mr-4w">Passer à l'étape suivante</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, useTemplateRef } from 'vue';
  import InputDateDeNaissance from '@/components/dsfr/InputDateDeNaissance.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { validationPseudo, validationPseudoTaille } from '@/components/validations/validationsChampsFormulaire';
  import router from '@/router';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { onboardingPostCreationCompte } from '@/store/onboardingPostCreationCompte';
  import { utilisateurStore } from '@/store/utilisateur';

  const inputPseudo = ref<HTMLInputElement>();
  const dateDeNaissanceComposant = useTemplateRef('dateDeNaissanceComposant');

  onMounted(() => {
    inputPseudo.value = document.querySelector('#utilisateur-pseudo') as HTMLInputElement;
  });

  const validerLaReponse = () => {
    if (!onValidationPseudo()) return;
    if (!utilisateurStore().utilisateur.estUnUtilisateurFranceConnect && !dateDeNaissanceComposant.value?.validation())
      return;
    router.push({ name: RouteCompteName.POST_CREATION_COMPTE_ETAPE_2 });
  };
  const champsPseudoStatus = ref({ message: '', afficher: false });

  function onValidationPseudo(): boolean {
    const pseudo = onboardingPostCreationCompte().pseudo;
    if (!validationPseudo(pseudo)) {
      inputPseudo.value?.focus();
      champsPseudoStatus.value = {
        message: 'Le pseudonyme ne peut contenir que des lettres ou des chiffres',
        afficher: true,
      };
      return false;
    }
    if (!validationPseudoTaille(pseudo)) {
      inputPseudo.value?.focus();
      champsPseudoStatus.value = { message: 'Le pseudonyme doit contenir entre 3 et 21 caractères', afficher: true };
      return false;
    }
    champsPseudoStatus.value = { message: '', afficher: false };
    return true;
  }
</script>
