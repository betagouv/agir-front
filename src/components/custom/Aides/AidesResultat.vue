<template>
  <h1 class="fr-h2">{{ titre }}</h1>
  <div v-show="!simulationAidesViewModel">
    <slot name="formulaire"></slot>
  </div>
  <div v-if="simulationAidesViewModel" class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-lg-4 fr-col-12">
      <slot name="asideResultatAides"></slot>
    </div>
    <div class="fr-col-lg-8 fr-col-12">
      <div class="background--white border border-radius--md fr-p-3w">
        <h2 class="fr-h4">{{ sousTitre }}</h2>
        <div v-for="(aides, index) in simulationAidesViewModel" :key="index">
          <Accordeon v-if="aides.length" :nameId="`aides-${index}`">
            <template v-slot:titre>{{ titreCategorieAide }} {{ index }}</template>
            <template v-slot:contenu>
              <ul class="list-style-none fr-m-0 fr-p-0">
                <li v-for="(aide, index) in aides" :key="index">
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
    </div>
  </div>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/custom/Accordeon.vue';
  import AidesDetail from '@/components/custom/Aides/AidesDetail.vue';
  import { SimulationAideResultatViewModel } from '@/aides/ports/simulationAideResultat';
  defineProps<{
    titre: string;
    sousTitre: string;
    simulationAidesViewModel: SimulationAideResultatViewModel | null;
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
