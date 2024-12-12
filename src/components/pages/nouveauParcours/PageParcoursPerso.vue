<template>
  <section class="fr-container fr-my-6w">
    <p class="fr-text--lg fr-mb-5w">Bonjour <span class="text--bold">Marcella</span>,</p>

    <CarteSkeleton v-if="isLoading" />

    <div v-else-if="nouveauParcoursViewmodel" class="fr-grid-row fr-grid-row--gutters full-width">
      <Objectif
        :nombre-inscription="nouveauParcoursViewmodel.nombreInscrits"
        :objectif-inscription="objectifInscription"
        class="fr-col-12 fr-col-md-8 full-height"
      >
        <ul>
          <li>
            <span class="text--bold">{{ nouveauParcoursViewmodel.nombrePointsMoyen }}</span> points moyens obtenus par
            les utilisateurs
          </li>
          <li><span class="text--bold">??</span> articles lus en moyenne</li>
          <li><span class="text--bold">??</span> kg de bilan carbone en moyenne</li>
        </ul>
      </Objectif>

      <div class="fr-col-12 fr-col-md-4 full-height">
        <div class="flex flex-column">
          <div>niveaux</div>
          <div class="fr-grid-row fr-grid-row--gutters">
            <div class="fr-col">données 1</div>
            <div class="fr-col">données 2</div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CarteSkeleton from '@/components/CarteSkeleton.vue';
  import Objectif from '@/components/custom/NouveauParcours/Objectif.vue';
  import { NouveauParcoursPresenterImpl } from '@/domaines/nouveauParcours/adapters/nouveauParcours.presenter.impl';
  import { NouveauParcoursRepositoryAxios } from '@/domaines/nouveauParcours/adapters/nouveauParcours.repository.axios';
  import { NouveauParcoursViewModel } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
  import { RecuperationDonneesNouveauParcoursUsecase } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

  const isLoading = ref<boolean>(true);
  const nouveauParcoursViewmodel = ref<NouveauParcoursViewModel>();

  const route = useRoute();
  const codePostal = route.query.codePostal as string;

  const objectifInscription = nouveauParcoursViewmodel.value?.nombreInscrits
    ? Math.min(nouveauParcoursViewmodel.value?.nombreInscrits * 2, 50)
    : 50;

  onMounted(() => {
    const usecase = new RecuperationDonneesNouveauParcoursUsecase(new NouveauParcoursRepositoryAxios());
    usecase
      .execute(codePostal, new NouveauParcoursPresenterImpl(vm => (nouveauParcoursViewmodel.value = vm)))
      .finally(() => {
        isLoading.value = false;
      });
  });
</script>

<style scoped></style>
