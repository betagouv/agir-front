<template>
  <div v-if="_impactDuJourViewModel" class="fr-container">
    <SuiviDuJourResultats :voir-seulement-levolution="true" :suivi-du-jour-resultats="_impactDuJourViewModel" />
  </div>
</template>
<script setup lang="ts">
  import { ResultatSuiviDuJourUsecase } from '@/suivi/resultatSuiviDuJour.usecase';
  import { SuiviDuJourRepositoryAxios } from '@/suivi/adapters/suiviDuJour.repository.axios';
  import { SuiviDuJourPresenterImpl, SuiviDuJourResultatsViewModel } from '@/suivi/adapters/suiviDuJour.presenter.impl';
  import { onMounted, ref } from 'vue';
  import SuiviDuJourResultats from '@/components/custom/SuiviDuJour/SuiviDuJourResultats.vue';
  import { utilisateurStore } from '@/store/utilisateur';

  const _impactDuJourViewModel = ref<SuiviDuJourResultatsViewModel>();
  const store = utilisateurStore();
  function mapImpactCarboneDuJour(impactDuJourViewModel: SuiviDuJourResultatsViewModel) {
    _impactDuJourViewModel.value = impactDuJourViewModel;
  }

  onMounted(async () => {
    const resultatSuiviDuJourUsecase = new ResultatSuiviDuJourUsecase(new SuiviDuJourRepositoryAxios());
    await resultatSuiviDuJourUsecase.execute(
      new SuiviDuJourPresenterImpl(mapImpactCarboneDuJour),
      store.utilisateur.id
    );
  });
</script>
<style scoped></style>
