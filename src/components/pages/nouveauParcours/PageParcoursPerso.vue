<template>
  <section class="fr-container fr-my-6w">
    <p class="fr-text--lg fr-mb-5w">Bonjour <span class="text--bold">Marcella</span>,</p>

    <CarteSkeleton v-if="isLoading" />

    <template v-else-if="nouveauParcoursViewmodel">
      <section class="fr-grid-row fr-grid-row--gutters full-width fr-mb-7w">
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
      </section>

      <section class="propositions text--center">
        <h1 class="fr-h2 fr-mb-1w">Par où souhaitez-vous commencer ?</h1>
        <p class="fr-mb-5w fr-mt-0">
          D’après nos calculs 🧮, dans le
          <span class="codePostal">{{ codePostal }}</span
          >, voici ce que nous pouvons vous proposer :
        </p>

        <div class="fr-grid-row fr-grid-row--gutters">
          <CarteDecouverte
            v-for="proposition in nouveauParcoursViewmodel.propositions"
            :key="proposition.titre"
            :titre-emoji="proposition.emoji"
            :titre-texte="proposition.titre"
            :lien-bouton="proposition.lien"
          >
            <ul>
              <li v-for="item in proposition.contenu" :key="item" v-html="item"></li>
            </ul>
          </CarteDecouverte>
        </div>
      </section>
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CarteDecouverte from '@/components/custom/NouveauParcours/CarteDecouverte.vue';
  import Objectif from '@/components/custom/NouveauParcours/Objectif.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
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

<style scoped>
  .codePostal {
    color: #43904d;
    font-weight: bold;
    font-style: italic;
  }

  .propositions li:first-letter {
    text-transform: capitalize;
  }
</style>
