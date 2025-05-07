<template>
  <div>
    <h2 class="fr-h2">Mon logement</h2>
    <div id="scroll-to-alerte">
      <Alert
        v-if="alerte.isActive"
        :message="alerte.message"
        :titre="alerte.titre"
        :type="alerte.type"
        class="fr-col-12 fr-mb-2w"
      />
    </div>
    <form @submit.prevent="enregistrerLesInformations">
      <div class="fr-grid-row full-width flex-end fr-mb-4w fr-mb-md-2w">
        <button class="fr-btn fr-btn--icon-left fr-btn--lg fr-icon-save-3-fill" type="submit">
          Mettre à jour mes informations
        </button>
      </div>
      <div class="fr-mb-4w">
        <h3 class="fr-h4">Où habitez-vous ?</h3>
        <ServiceBarreDeRechercheAdresse
          v-if="doitAfficherBarreAdresse"
          v-model:adresse="adresse"
          v-model:recherche="recherche"
        />
        <InputCodePostal
          v-else
          v-model:code-postal="logementViewModel.codePostal"
          v-model:code-epci="logementViewModel.codeEpci"
          @update:isCodePostalEnErreur="isCodePostalEnErreur = $event"
        />
      </div>

      <h3 class="fr-h4">Combien êtes-vous dans votre logement (vous inclus) ?</h3>
      <div class="fr-grid-row fr-mb-4w">
        <InputNumberHorizontal
          v-model="logementViewModel.adultes"
          :default-value="logementViewModel.adultes"
          :min-value="1"
          class="fr-mr-8w fr-mb-2w"
          label="Adulte(s)"
          name="nombre-adulte"
        />
        <InputNumberHorizontal
          v-model="logementViewModel.enfants"
          :default-value="logementViewModel.enfants"
          :min-value="0"
          class="fr-mb-2w"
          label="Enfant(s) - moins de 18 ans"
          name="nombre-enfant"
        />
        <BoutonsRadio
          v-model="logementViewModel.residence.valeur"
          :default-value="logementViewModel.residence.valeur"
          :options="logementViewModel.residence.reponsesPossibles"
          class="fr-mb-2w fr-col-12"
          col="fr-col"
          legende="Votre résidence principale est ..."
          legende-size="l"
          name="residence"
          orientation="horizontal"
        />
        <BoutonsRadio
          v-model="logementViewModel.proprietaire.valeur"
          :default-value="logementViewModel.proprietaire.valeur"
          :options="logementViewModel.proprietaire.reponsesPossibles"
          class="fr-mb-2w fr-col-12"
          col="fr-col"
          legende="Vous êtes propriétaire de votre logement ?"
          legende-size="l"
          name="proprietaire"
          orientation="horizontal"
        />
        <BoutonsRadio
          v-model="logementViewModel.superficie.valeur"
          :default-value="logementViewModel.superficie.valeur"
          :options="logementViewModel.superficie.reponsesPossibles"
          class="fr-mb-4w fr-col-12"
          col="fr-col"
          legende="Quelle en est la superficie ?"
          legende-size="l"
          name="superficie"
          orientation="horizontal"
        />
        <BoutonsRadio
          v-model="logementViewModel.plusDeQuinzeAns.valeur"
          :default-value="logementViewModel.plusDeQuinzeAns.valeur"
          :options="logementViewModel.plusDeQuinzeAns.reponsesPossibles"
          class="fr-mb-4w fr-col-12"
          col="fr-col"
          legende="Votre logement a-t-il plus de 15 ans ?"
          legende-size="l"
          name="anciennete"
          orientation="horizontal"
        />
        <div class="fr-col-12">
          <DPE v-model="logementViewModel.dpe.valeur" :default-value="logementViewModel.dpe.valeur" />
        </div>
        <CarteInfo>
          <p class="fr-text--bold">
            <span aria-hidden="true" class="fr-icon-question-line"></span>
            Qu'est-ce qu'un DPE ?
          </p>
          <p class="fr-m-0">
            Le DPE, c'est le <strong>Diagnostic de Performance Énergétique de votre logement</strong>. Il mesure d'un
            côté l'énergie nécessaire pour y maintenir une température standard, et de l'autre l'empreinte climat
            associée. Le DPE est exprimé comme une note de A (très bon) à G (passoire thermique). Vous pouvez obtenir
            une estimation de votre DPE en 2 clics avec le service
            <a href="https://particulier.gorenove.fr" rel="noreferrer" target="_blank">Go Renov</a>.
          </p>
        </CarteInfo>
        <div class="fr-grid-row full-width flex-end">
          <button class="fr-btn fr-btn--icon-left fr-btn--lg fr-mt-4w fr-icon-save-3-fill" type="submit">
            Mettre à jour mes informations
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import DPE from '@/components/custom/DPE.vue';
  import BoutonsRadio from '@/components/custom/Form/BoutonsRadio.vue';
  import InputNumberHorizontal from '@/components/custom/Form/InputNumberHorizontal.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import {
    BarreDeRecherchePresenterImpl,
    BarreDeRechercheViewModel,
  } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { PatcherInformationLogementUsecase } from '@/domaines/logement/patcherInformationLogement.usecase';
  import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';
  import { Adresse } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const logementViewModel = defineModel<LogementViewModel>('logementViewModel', {
    type: Object,
    required: true,
  });

  const barreDeRechercheViewModel = ref<BarreDeRechercheViewModel>();
  new BarreDeRecherchePresenterImpl(vm => (barreDeRechercheViewModel.value = vm)).presente({
    codePostal: logementViewModel.value?.codePostal,
    commune: logementViewModel.value?.commune_utilisee_dans_le_compte,
    communeLabel: logementViewModel.value?.commune_label,
    rue: logementViewModel.value?.rue,
    numeroRue: logementViewModel.value?.numeroRue,
    coordonnees: logementViewModel.value?.coordonnees,
  });
  const recherche = ref<string>(barreDeRechercheViewModel.value?.recherche ?? '');
  const adresse = ref<Adresse>();

  const { alerte, afficherAlerte } = useAlerte();

  const doitAfficherBarreAdresse = computed(
    () =>
      logementViewModel.value.coordonnees.longitude !== undefined &&
      logementViewModel.value.coordonnees.latitude !== undefined &&
      logementViewModel.value.rue !== undefined,
  );
  const isCodePostalEnErreur = ref(false);
  const codePostalEstValide = computed(() => {
    return !isCodePostalEnErreur.value && logementViewModel.value.commune_utilisee_dans_le_compte;
  });

  const enregistrerLesInformations = () => {
    if (!codePostalEstValide.value) {
      afficherAlerte('error', 'Erreur', 'Veuillez renseigner votre commune.');
      return;
    }

    const usecase = new PatcherInformationLogementUsecase(new LogementRepositoryAxios());
    usecase
      .execute(utilisateurStore().utilisateur.id, {
        adultes: logementViewModel.value.adultes,
        enfants: logementViewModel.value.enfants,
        residence: logementViewModel.value.residence.valeur,
        superficie: logementViewModel.value.superficie.valeur,
        proprietaire: logementViewModel.value.proprietaire.valeur,
        plusDeQuinzeAns: logementViewModel.value.plusDeQuinzeAns.valeur,
        dpe: logementViewModel.value.dpe.valeur,
        coordonnees: adresse.value?.coordonnees,
        rue: adresse.value?.rue,
        numeroRue: adresse.value?.numeroRue,
        codePostal: adresse.value?.codePostal ?? logementViewModel.value.codePostal,
        codeEpci: adresse.value?.codeEpci ?? logementViewModel.value.codeEpci,
      })
      .then(() => {
        afficherAlerte('success', 'Succès', 'Vos informations ont été correctement mises à jour.');
      })
      .catch(() => {
        afficherAlerte('error', 'Erreur', 'Une erreur interne est survenue. Veuillez réessayer plus tard.');
      });

    const alertElement = document.getElementById('scroll-to-alerte');
    if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
</script>
