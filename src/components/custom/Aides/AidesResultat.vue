<template>
  <h1 class="fr-h2">{{ titre }}</h1>
  <div v-show="!simulationAidesViewModel">
    <slot name="formulaire"></slot>
  </div>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-4 fr-col-12">
      <slot name="asideResultatAides"></slot>
    </div>
    <div class="fr-col-lg-8 fr-col-12">
      <div v-if="!isLoading" class="background--white border border-radius--md fr-p-3w">
        <h2 class="fr-h4">{{ sousTitre }}</h2>
        <p v-if="simulationAidesViewModel.aucunResultat">Aucune aide n'est disponible dans votre situation.</p>
        <div v-else v-for="(aides, index) in simulationAidesViewModel.resultats" :key="index">
          <Accordeon v-if="aides.aides.length" :nameId="`aides-${index}`">
            <template v-slot:titre>
              <div class="fr-grid-row flex-space-between full-width fr-pr-4w">
                <span>{{ aides.titre }}</span>
                <span class="fr-ml-4w text--normal text--black-light">
                  Éligible à <span class="text--bold">{{ aides.montantTotal }} €</span>
                </span>
              </div>
            </template>
            <template v-slot:contenu>
              <ul class="list-style-none fr-m-0 fr-p-0">
                <li v-for="(aide, index) in aides.aides" :key="index">
                  <AidesDetail
                    :titre="aide.libelle"
                    :description="aide.description"
                    :url-externe="aide.lien"
                    :valeur-aide="aide.montant"
                    :url-logo="aide.logo"
                  />
                </li>
              </ul>
            </template>
          </Accordeon>
        </div>
      </div>
      <CarteSkeleton v-else />
    </div>
  </div>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/custom/Aides/AccordeonAides.vue';
  import AidesDetail from '@/components/custom/Aides/AidesDetail.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import { SimulationAideResultatViewModel } from '@/domaines/aides/ports/simulationAideResultat';
  defineProps<{
    isLoading: boolean;
    titre: string;
    sousTitre: string;
    simulationAidesViewModel: SimulationAideResultatViewModel;
    titreCategorieAide: string;
  }>();
</script>

<style scoped>
  li {
    padding-bottom: 1.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }

  li:last-child {
    padding: 0;
    margin: 0;
    border: none;
  }
</style>
