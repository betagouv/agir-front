<template>
  <div class="fr-container">
    <FilDAriane page-courante="Votre empreinte carbone" />
    <h1 class="fr-h2 fr-mb-0">Votre empreinte carbone</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!bilanCarboneViewModel">Problème de chargement de donées</p>
    <section v-else>
      <div class="fr-grid-row fr-grid-row--gutters fr-py-4w">
        <div class="fr-col-12 fr-col-md-9">
          <BilanCarboneHebdo
            class="fr-mb-4w"
            :impact-kg-annuel="bilanCarboneViewModel.impactKgAnnuel"
            :impact-kg-hebdomadaire="bilanCarboneViewModel.impactKgHebdomadaire"
          />
          <h2>Voir le détail</h2>
          <ol class="fr-p-0 list-style-none">
            <li
              v-for="detail in bilanCarboneViewModel.details"
              :key="detail.universLabel"
              class="fr-grid-row fr-grid-row--gutters flex-space-between fr-py-3v fr-m-0 fr-py-2w border--bottom--grey align-items--center"
            >
              <span class="fr-text--xl fr-text--bold fr-mb-0">{{ detail.universLabel }}</span>
              <span class="fr-text--bold text--bleu">{{ detail.impactKgAnnuel }}</span>
            </li>
          </ol>
        </div>
        <div class="fr-col-12 fr-col-md-3">
          <ServiceAside
            image="/bilan-carbone-ngc-screenshot.jpg"
            nom="Nos Gestes Climat"
            description="En 10 minutes, obtenez une estimation de votre empreinte carbone de consommation."
            url="https://nosgestesclimat.fr/"
            logo="/logo_ngc.png"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BilanCarboneHebdo from '@/components/custom/BilanCarbone/BilanCarboneHebdo.vue';
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    BilanCarbonePresenterImpl,
    BilanCarboneViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import { RecupererBilanCarboneUsecase } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const bilanCarboneViewModel = ref<BilanCarboneViewModel>();

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const recupererBilanCarboneUsecase = new RecupererBilanCarboneUsecase(new BilanCarboneRepositoryAxios());
    await recupererBilanCarboneUsecase.execute(
      utilisateurId,
      new BilanCarbonePresenterImpl(vm => (bilanCarboneViewModel.value = vm)),
    );
    isLoading.value = false;
  });
</script>
