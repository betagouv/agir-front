<template>
  <section>
    <EmpreinteEcologiqueEncart :progression="100" :tonnes="5" />
  </section>

  <section>
    <RecommandationAccueilConnecte />
  </section>

  <section class="background--white">
    <ArticlesRecommandees class="fr-container fr-py-5w fr-py-md-10w" />
  </section>

  <section class="background--olive-clair zindex-3">
    <Raccourcis :commune="accueilConnecteViewModel?.commune" :liste-raccourcis="accueilConnecteViewModel?.raccourcis" />
  </section>

  <section class="background--brown-cafe-creme-main-782">
    <RedirectionMobile />
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ArticlesRecommandees from '@/components/custom/AccueilConnectee/ArticlesRecommandees.vue';
  import EmpreinteEcologiqueEncart from '@/components/custom/AccueilConnectee/EmpreinteEcologiqueEncart.vue';
  import Raccourcis from '@/components/custom/AccueilConnectee/Raccourcis.vue';
  import RecommandationAccueilConnecte from '@/components/custom/AccueilConnectee/RecommandationAccueilConnecte.vue';
  import RedirectionMobile from '@/components/custom/AccueilConnectee/RedirectionMobile.vue';
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

<style scoped>
  .background--brown-cafe-creme-main-782 {
    background: var(--brown-cafe-creme-main-782);
  }

  .zindex-3 {
    position: relative;
    z-index: 3;
  }
</style>
