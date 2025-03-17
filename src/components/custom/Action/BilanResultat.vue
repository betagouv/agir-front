<template>
  <div v-if="bilanThematiqueViewModel">
    <div v-for="detail in bilanThematiqueViewModel.details" :key="detail.label">
      <BilanCarboneProgressBar
        :impact-tonne-annuel="detail.impactAnnuelEnKg"
        :pourcentage-progress-bar="detail.pourcentage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import BilanCarboneProgressBar from '@/components/custom/BilanCarbone/BilanCarboneProgressBar.vue';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import {
    BilanThematiquePresenterImpl,
    BilanThematiqueViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanThematique.presenter.impl';
  import { RecupererBilanDepuisThematiqueUsecase } from '@/domaines/bilanCarbone/recupererBilanDepuisThematique.usecase';
  import { ClefThematiqueAPI } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    thematique: ClefThematiqueAPI;
  }>();
  const bilanThematiqueViewModel = ref<BilanThematiqueViewModel>();
  const usecase = new RecupererBilanDepuisThematiqueUsecase(new BilanCarboneRepositoryAxios());
  onMounted(() => {
    usecase.execute(
      utilisateurStore().utilisateur.id,
      props.thematique,
      new BilanThematiquePresenterImpl(vm => {
        bilanThematiqueViewModel.value = vm;
      }),
    );
  });
</script>

<style scoped></style>
