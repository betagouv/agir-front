<template>
  <div class="fr-container">
    <FilDAriane page-courante="Votre bilan environnemental" />
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else-if="!isLoading && (bilanCarboneViewModel || bilanCarbonePartielViewModel)">
      <h1
        class="fr-h2 fr-mb-0"
        v-html="bilanCarboneViewModel?.titre ? bilanCarboneViewModel?.titre : bilanCarbonePartielViewModel?.titre"
      />
      <section>
        <BilanCarboneComplet v-if="bilanCarboneViewModel" :bilan-carbone-view-model="bilanCarboneViewModel" />
        <BilanCarbonePartiel
          v-else-if="bilanCarbonePartielViewModel"
          :bilan-carbone-partiel-view-model="bilanCarbonePartielViewModel"
        />
      </section>
    </div>
    <p v-else>Problème de chargement de donées</p>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import BilanCarboneComplet from '@/components/pages/BilanCarboneComplet.vue';
  import BilanCarbonePartiel from '@/components/pages/BilanCarbonePartiel.vue';
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
    const recupererBilanCarboneUsecase = new RecupererBilanCarboneUsecase(new BilanCarboneRepositoryAxios());
    await recupererBilanCarboneUsecase.execute(
      utilisateurId,
      new BilanCarbonePresenterImpl(
        vm => (bilanCarboneViewModel.value = vm),
        vm => (bilanCarbonePartielViewModel.value = vm),
      ),
    );
    isLoading.value = false;
  });
</script>
