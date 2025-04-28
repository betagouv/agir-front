<template>
  <section class="fr-mb-4w border fr-p-4w">
    <h2 class="fr-h3" id="label-barre-de-recherche">Choisissez une adresse</h2>
    <ServiceBarreDeRechercheAdresse
      v-model:coordonnees="coordonnees"
      v-model:recherche="recherche"
      label-id="label-barre-de-recherche"
    />

    <Callout
      class="fr-mt-3w"
      v-if="avecAdressePrivee && !avecAdressePriveeEnregistree"
      texte="Voulez-vous utiliser cette adresse comme votre adresse principale à l’avenir ?"
      button-text="Choisir comme adresse principale"
      :icone-information="false"
      :on-click="definirAdressePrincipale"
    />

    <section class="fr-mb-3w fr-mt-5w">
      <template v-if="simulateurMaifViewModel?.risques">
        <h3 class="fr-h4">Vos risques</h3>
        <MaifRisques class="fr-mb-2w" :risques="simulateurMaifViewModel?.risques" />
      </template>

      <template v-if="simulateurMaifViewModel?.lienKit">
        <h3 class="fr-h4 fr-mb-1w fr-mt-3w">Votre kit de prévention Maif</h3>
        <p class="fr-my-2w">
          Vous habitez dans une zone inondable ou argileuse, découvrez votre kit de prévention pour agir - vous aussi -
          à votre échelle.
        </p>
        <a class="fr-btn fr-btn--secondary" target="_blank" rel="noopener noreferrer">
          Télécharger mon kit de prévention
        </a>
      </template>
    </section>

    <h2 class="fr-h3 fr-mt-4w">Les chiffres clés de <span class="text--bleu">Bordeaux</span></h2>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div
        class="fr-col-12 fr-col-md-4"
        v-for="chiffreCle in simulateurMaifViewModel?.chiffresCles"
        :key="chiffreCle.label"
      >
        <div class="flex flex-column align-items--center fr-p-3w shadow full-height">
          <span class="text--3xl text--bold text--bleu-minor fr-pb-2w" v-text="chiffreCle.valeur" />
          <span class="text--center fr-mb-0" v-html="chiffreCle.label" />
        </div>
      </div>
    </div>
  </section>

  <CarteExterne
    class="shadow fr-mb-2w"
    titre="MAIF - Aux alentours"
    description="Exposition aux risques climatiques, services de proximité, prix de l’immobilier… Retrouvez toutes les informations utiles aux alentours de votre adresse !"
    :lien="{ url: 'https://auxalentours.maif.fr/', urlAffichee: 'https://auxalentours.maif.fr/' }"
    image-src="/maif-aux-alentours.webp"
  />
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import MaifRisques from '@/components/custom/Action/MaifRisqueCarte.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import CarteExterne from '@/components/dsfr/CarteExterne.vue';
  import {
    SimulateurMaifPresenterImpl,
    SimulateurMaifViewModel,
  } from '@/domaines/simulationMaif/adapters/simulateurMaif.presenter.impl';
  import { SimulateurMaifRepositoryMock } from '@/domaines/simulationMaif/adapters/simulateurMaif.repository.mock';
  import { CalculerResultatSimulationMaifUsecase } from '@/domaines/simulationMaif/calculerResultatSimulationMaif.usecase';
  import { Coordonnees } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const recherche = ref<string>('');
  const coordonnees = ref<Coordonnees>();
  const avecAdressePrivee = ref<boolean>(false);
  const avecAdressePriveeEnregistree = ref<boolean>(false);
  const simulateurMaifViewModel = ref<SimulateurMaifViewModel>();

  const recupererResultatSimulateurMaif = new CalculerResultatSimulationMaifUsecase(new SimulateurMaifRepositoryMock());
  const utilisateurId = utilisateurStore().utilisateur.id;

  onMounted(() => {
    recupererResultatSimulateurMaif.execute(
      utilisateurId,
      new SimulateurMaifPresenterImpl((vm: SimulateurMaifViewModel) => {
        simulateurMaifViewModel.value = vm;
      }),
    );
  });

  watch(
    () => coordonnees.value,
    () => {
      avecAdressePrivee.value = true;
      console.log('new coordonnées', coordonnees.value);
    },
  );

  function definirAdressePrincipale() {
    avecAdressePriveeEnregistree.value = true;
    console.log('adresse principale définie :', coordonnees.value, recherche.value);
  }
</script>
