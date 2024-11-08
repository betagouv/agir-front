<template>
  <div class="fr-container fr-pb-2w">
    <FilDAriane page-courante="Mon bilan environnemental" />
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-9">
        <p v-if="isLoading">Chargement en cours ...</p>
        <template v-else-if="bilanCarboneViewModel || bilanCarbonePartielViewModel">
          <h1
            class="fr-h2"
            v-html="bilanCarboneViewModel?.titre ? bilanCarboneViewModel.titre : bilanCarbonePartielViewModel?.titre"
          />
          <BilanCarbone
            :bilan-carbone-complet="bilanCarboneViewModel"
            :bilan-carbone-partiel="bilanCarbonePartielViewModel"
          />
        </template>
        <p v-else>Problème de chargement des données</p>
      </div>
      <div class="fr-col-12 fr-col-md-3">
        <ServiceAside
          image="/bilan-carbone-ngc-screenshot.svg"
          nom="Nos Gestes Climat"
          description="Basé sur le calculateur carbone développé par l’Agence de la transition écologique (ADEME) et beta.gouv.fr, en partenariat avec l’Association Bilan Carbone (ABC)."
          url="https://nosgestesclimat.fr/"
          logo="/logo_ngc.webp"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BilanCarbone from '@/components/custom/BilanCarbone/BilanCarbone.vue';
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    BilanCarboneCompletViewModel,
    BilanCarbonePartielViewModel,
    BilanCarbonePresenterImpl,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import { RecupererBilanCarboneUsecase } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const bilanCarboneViewModel = ref<BilanCarboneCompletViewModel>();
  const bilanCarbonePartielViewModel = ref<BilanCarbonePartielViewModel>();

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    try {
      const recupererBilanCarboneUsecase = new RecupererBilanCarboneUsecase(new BilanCarboneRepositoryAxios());
      await recupererBilanCarboneUsecase.execute(
        utilisateurId,
        new BilanCarbonePresenterImpl(
          vm => (bilanCarboneViewModel.value = vm),
          vm => (bilanCarbonePartielViewModel.value = vm),
        ),
      );
    } finally {
      isLoading.value = false;
    }
  });
</script>
