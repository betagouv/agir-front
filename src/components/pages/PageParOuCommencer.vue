<template>
  <div class="fr-pt-4w fr-pb-8w fr-pb-1w background-bleu-975-25">
    <div class="fr-container">
      <div class="text--center">
        <h2 class="fr-h2 fr-mb-2w">Par où souhaitez-vous commencer ?</h2>
        <p v-if="syntheseThematiquesViewModel?.commune">
          D’après nos calculs, à
          <span class="text--bold text--bleu text--italic">{{ syntheseThematiquesViewModel.commune }}</span
          >, voici ce que nous pouvons vous proposer :
        </p>
      </div>

      <div v-if="syntheseThematiquesViewModel" class="fr-grid-row fr-grid-row--gutters">
        <CarteSyntheseThematique
          v-for="syntheseThematique in syntheseThematiquesViewModel.cartesThematiques"
          :key="syntheseThematique.id"
          :synthese-thematique="syntheseThematique"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import CarteSyntheseThematique from '@/components/custom/Thematiques/CarteSyntheseThematique.vue';
  import { SyntheseThematiquesPresenterImpl } from '@/domaines/thematiques/adapters/syntheseThematiques.presenter.impl';
  import { ThematiquesRepositoryAxios } from '@/domaines/thematiques/adapters/thematiques.repository.axios';
  import { SyntheseThematiquesViewModel } from '@/domaines/thematiques/ports/syntheseThematique.presenter';
  import { RecupererSyntheseThematiques } from '@/domaines/thematiques/recupererSyntheseThematiques.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const syntheseThematiquesViewModel = ref<SyntheseThematiquesViewModel>();
  const usecase = new RecupererSyntheseThematiques(new ThematiquesRepositoryAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      new SyntheseThematiquesPresenterImpl(vm => (syntheseThematiquesViewModel.value = vm)),
    );
  });
</script>

<style scoped>
  .background-bleu-975-25 {
    background-color: var(--blue-france-975-75);
  }
</style>
