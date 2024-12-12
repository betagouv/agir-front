<template>
  <section class="fr-container fr-mt-4w">
    <p>Bonjour <span class="text--bold">Marcella</span></p>

    <div class="fr-grid-row fr-grid-row--gutters full-width">
      <div class="fr-col-12 fr-col-md-8 full-height">
        <h1>Prochain objectif :</h1>
        <p>{{ objectifInscription }} inscrits sur J'agis dans votre commune</p>
        <BarreDeProgression
          label="test"
          :value="objectifInscription"
          :value-max="objectifInscription"
          couleur="green"
        />
        <ul>
          <li>
            <span class="text--bold">{{ nouveauParcoursViewmodel?.nombrePointsMoyen }}</span> points moyens obtenus par
            les utilisateurs
          </li>
          <li><span class="text--bold">??</span> articles lus en moyenne</li>
          <li><span class="text--bold">??</span> kg de bilan carbone en moyenne</li>
        </ul>
      </div>
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
  import { ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import { NouveauParcoursPresenterImpl } from '@/domaines/nouveauParcours/adapters/nouveauParcours.presenter.impl';
  import { NouveauParcoursRepositoryAxios } from '@/domaines/nouveauParcours/adapters/nouveauParcours.repository.axios';
  import { NouveauParcoursViewModel } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
  import { RecuperationDonneesNouveauParcoursUsecase } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

  const route = useRoute();
  const codePostal = route.query.codePostal as string;
  const nouveauParcoursViewmodel = ref<NouveauParcoursViewModel>();

  // Pas de loader encore
  const objectifInscription = nouveauParcoursViewmodel.value?.nombreInscrits
    ? nouveauParcoursViewmodel.value?.nombreInscrits * 2
    : 50;

  const usecase = new RecuperationDonneesNouveauParcoursUsecase(new NouveauParcoursRepositoryAxios());
  usecase.execute(codePostal, new NouveauParcoursPresenterImpl(vm => (nouveauParcoursViewmodel.value = vm)));
</script>

<style scoped></style>
