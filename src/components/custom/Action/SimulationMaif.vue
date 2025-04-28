<template>
  <section class="fr-mb-4w border fr-p-4w">
    <h2 class="fr-h3">Choisissez une adresse</h2>

    <h2>Les chiffres clés de <span class="text--bleu">Bordeaux</span></h2>
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
  import { onMounted, ref } from 'vue';
  import CarteExterne from '@/components/dsfr/CarteExterne.vue';
  import {
    SimulateurMaifPresenterImpl,
    SimulateurMaifViewModel,
  } from '@/domaines/simulationMaif/adapters/simulateurMaif.presenter.impl';

  const simulateurMaifViewModel = ref<SimulateurMaifViewModel>();
  const simulateurMaifPresenterImpl = new SimulateurMaifPresenterImpl((vm: SimulateurMaifViewModel) => {
    simulateurMaifViewModel.value = vm;
  });

  onMounted(() => {
    simulateurMaifPresenterImpl.presente();
  });
</script>
