<template>
  <section>
    <CompletionAccueilConnecte :progression="accueilConnecteViewModel?.progression" />
  </section>

  <section class="background--white">
    <ThematiquesAccueilConnecte :commune="accueilConnecteViewModel?.commune" />
  </section>

  <section class="background--olive-clair">
    <Raccourcis :commune="accueilConnecteViewModel?.commune" :liste-raccourcis="accueilConnecteViewModel?.raccourcis" />
  </section>

  <section class="background--vert">
    <CompteurActionsNationales :aides-nationales-realisees="accueilConnecteViewModel?.totalActionsRealisees" />
  </section>

  <ArticlesRecommandees />
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ArticlesRecommandees from '@/components/custom/AccueilConnectee/ArticlesRecommandees.vue';
  import CompletionAccueilConnecte from '@/components/custom/AccueilConnectee/CompletionAccueilConnecte.vue';
  import CompteurActionsNationales from '@/components/custom/AccueilConnectee/CompteurActionsNationales.vue';
  import Raccourcis from '@/components/custom/AccueilConnectee/Raccourcis.vue';
  import ThematiquesAccueilConnecte from '@/components/custom/AccueilConnectee/ThematiquesAccueilConnecte.vue';
  import { AccueilConnectePresenterImpl } from '@/domaines/accueilConnecte/adapters/accueilConnecte.presenter.impl';
  import { AccueilConnecteRepositoryAxios } from '@/domaines/accueilConnecte/adapters/accueilConnecte.repository.axios';
  import { AccueilConnecteViewModel } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
  import { RecupererAccueilConnecteUsecase } from '@/domaines/accueilConnecte/recupererAccueilConnecteUsecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const accueilConnecteViewModel = ref<AccueilConnecteViewModel>();
  const recupererAccueilConnecteUsecase = new RecupererAccueilConnecteUsecase(new AccueilConnecteRepositoryAxios());

  onMounted(async () => {
    await recupererAccueilConnecteUsecase.execute(
      utilisateurStore().utilisateur.id,
      new AccueilConnectePresenterImpl(vm => (accueilConnecteViewModel.value = vm)),
    );
  });
</script>

<style>
  .background--olive-clair {
    background: #ecebe0;
  }
</style>
