<template>
  <div>
    <h2 class="fr-h2">Votre logement</h2>
    <div id="scroll-to-alerte">
      <Alert
        v-if="alerte.isActive"
        class="fr-col-12 fr-mb-2w"
        :type="alerte.type"
        :titre="alerte.titre"
        :message="alerte.message"
      />
    </div>
    <form @submit.prevent="enregistrerLesInformations">
      <div class="fr-grid-row full-width flex-end">
        <button
          type="submit"
          aria-label="Soumettre le formulaire"
          :disabled="!formulaireValide"
          class="fr-btn fr-btn--icon-left fr-btn--lg fr-icon-save-3-fill"
        >
          Mettre à jour vos informations
        </button>
      </div>
      <div class="fr-mb-4w">
        <h3 class="fr-h4">Où habitez-vous ?</h3>
        <InputCodePostal
          :default-value="logementViewModel.codePostal"
          :default-select-value="logementViewModel.commune_utilisee_dans_le_compte"
          v-model="logementViewModel.codePostal"
          @update:selectedCommune="logementViewModel.commune_utilisee_dans_le_compte = $event"
          @update:isCodePostalEnErreur="isCodePostalEnErreur = $event"
        />
      </div>
      <h3 class="fr-h4">Combien êtes-vous dans votre logement (vous inclus) ?</h3>
      <div class="fr-grid-row fr-mb-4w">
        <InputNumberHorizontal
          label="Adulte(s)"
          name="nombre-adulte"
          class="fr-mr-8w fr-mb-2w"
          :min-value="1"
          :default-value="logementViewModel.adultes"
          v-model="logementViewModel.adultes"
        />
        <InputNumberHorizontal
          label="Enfant(s) - moins de 18 ans"
          name="nombre-enfant"
          class="fr-mb-2w"
          :min-value="0"
          :default-value="logementViewModel.enfants"
          v-model="logementViewModel.enfants"
        />
        <BoutonRadio
          class="fr-mb-2w fr-col-12"
          legende="Votre résidence principale est ..."
          legende-size="l"
          orientation="horizontal"
          name="residence"
          col="fr-col"
          :options="logementViewModel.residence.reponsesPossibles"
          :default-value="logementViewModel.residence.valeur"
          v-model="logementViewModel.residence.valeur"
        />
        <BoutonRadio
          class="fr-mb-2w fr-col-12"
          legende="Vous êtes propriétaire de votre logement ?"
          legende-size="l"
          orientation="horizontal"
          name="proprietaire"
          col="fr-col"
          :options="logementViewModel.proprietaire.reponsesPossibles"
          :default-value="logementViewModel.proprietaire.valeur"
          v-model="logementViewModel.proprietaire.valeur"
        />
        <BoutonRadio
          class="fr-mb-4w fr-col-12"
          legende="Quelle en est la superficie ?"
          legende-size="l"
          name="superficie"
          orientation="horizontal"
          col="fr-col"
          :options="logementViewModel.superficie.reponsesPossibles"
          :default-value="logementViewModel.superficie.valeur"
          v-model="logementViewModel.superficie.valeur"
        />
        <BoutonRadio
          class="fr-mb-4w fr-col-12"
          legende="Quel est votre mode de chauffage principal ?"
          legende-size="l"
          name="chauffage"
          orientation="horizontal"
          col="fr-col"
          :options="logementViewModel.modeDeChauffage.reponsesPossibles"
          :default-value="logementViewModel.modeDeChauffage.valeur"
          v-model="logementViewModel.modeDeChauffage.valeur"
        />
        <BoutonRadio
          class="fr-mb-4w fr-col-12"
          legende="Votre logement a-t-il plus de 15 ans ?"
          legende-size="l"
          name="anciennete"
          orientation="horizontal"
          col="fr-col"
          :options="logementViewModel.plusDeQuinzeAns.reponsesPossibles"
          :default-value="logementViewModel.plusDeQuinzeAns.valeur"
          v-model="logementViewModel.plusDeQuinzeAns.valeur"
        />
        <div class="fr-col-12">
          <DPE :default-value="logementViewModel.dpe.valeur" v-model="logementViewModel.dpe.valeur" />
        </div>
        <CarteInfo>
          <p class="fr-text--bold">
            <span class="fr-icon-question-line" aria-hidden="true"></span>
            Qu'est-ce qu'un DPE ?
          </p>
          <p class="fr-m-0">
            Le DPE, c'est le <strong>Diagnostic de Performance Énergétique de votre logement</strong>. Il mesure d'un
            côté l'énergie nécessaire pour y maintenir une température standard, et de l'autre l'empreinte climat
            associée. Le DPE est exprimé comme une note de A (très bon) à G (passoire thermique). Vous pouvez obtenir
            une estimation de votre DPE en 2 clics avec le service
            <a href="https://particulier.gorenove.fr" target="_blank" rel="noreferrer">Go Renov</a>.
          </p>
        </CarteInfo>
        <div class="fr-grid-row full-width flex-end">
          <button
            type="submit"
            aria-label="Soumettre le formulaire"
            :disabled="!formulaireValide"
            class="fr-btn fr-btn--icon-left fr-btn--lg fr-mt-4w fr-icon-save-3-fill"
          >
            Mettre à jour vos informations
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import DPE from '@/components/custom/DPE.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { EnregistrerInformationsLogementUsecase } from '@/domaines/logement/enregistrerInformationLogement.usecase';
  import { LogementViewModel } from '@/domaines/logement/ports/logement.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineModel<LogementViewModel>('logementViewModel', {
    type: Object,
    required: true,
  });

  const { alerte, afficherAlerte } = useAlerte();

  const formulaireValide = computed(() => {
    return !isCodePostalEnErreur.value;
  });
  const isCodePostalEnErreur = ref(false);
  const enregistrerLesInformations = () => {
    const usecase = new EnregistrerInformationsLogementUsecase(new LogementRepositoryAxios());
    usecase.execute(utilisateurStore().utilisateur.id, {
      adultes: props.value.adultes,
      enfants: props.value.enfants,
      codePostal: props.value.codePostal,
      commune_utilisee_dans_le_compte: props.value.commune_utilisee_dans_le_compte,
      commune_label: '',
      residence: props.value.residence.valeur,
      superficie: props.value.superficie.valeur,
      proprietaire: props.value.proprietaire.valeur,
      modeDeChauffage: props.value.modeDeChauffage.valeur,
      plusDeQuinzeAns: props.value.plusDeQuinzeAns.valeur,
      dpe: props.value.dpe.valeur,
    });

    afficherAlerte('success', 'Succès', 'Vos informations ont été correctement mises à jour.');

    const alertElement = document.getElementById('scroll-to-alerte');
    if (alertElement) {
      alertElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };
</script>
