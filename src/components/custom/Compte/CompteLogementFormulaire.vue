<template>
  <div>
    <h2 class="fr-h2">Votre logement</h2>
    <form>
      <div class="fr-mb-4w">
        <h3 class="fr-h4">Où habitez-vous ?</h3>
        <InputCodePostal
          :default-value="logementViewModel.codePostal"
          :default-select-value="logementViewModel.commune"
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
        />
        <InputNumberHorizontal
          label="Enfant(s) - moins de 18 ans"
          name="nombre-enfant"
          class="fr-mb-2w"
          :min-value="0"
          :default-value="logementViewModel.enfants"
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
          legende="Quelle est votre mode de chauffage principal ?"
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
        <BoutonRadio
          class="fr-mb-4w"
          legende="Quel est le DPE actuel de votre logement ?"
          legende-size="l"
          name="dpe"
          orientation="vertical"
          col="fr-col"
          :options="logementViewModel.dpe.reponsesPossibles"
          :default-value="logementViewModel.dpe.valeur"
          v-model="logementViewModel.dpe.valeur"
        />
        <button class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-save-3-fill">
          Mettre à jour vos informations
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import { LogementViewModel } from '@/logement/ports/logement.presenter';

  defineModel<LogementViewModel>('logementViewModel', {
    type: Object,
    required: true,
  });
</script>
