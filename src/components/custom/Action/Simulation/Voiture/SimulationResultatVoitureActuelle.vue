<template>
  <Accordeon name-id="simulation-resultat-voiture-actuelle">
    <template #titre>
      <div class="flex-column">
        <h3 class="text--black text--normal">
          Coût estimé de votre voiture&nbsp;:
          <span class="text--bold text--bleu">{{ resultatSimulationVoiture.coutAnnuel }}</span
          >&nbsp;<span class="text--bleu">par an</span>
        </h3>
        <p class="text--underline text--normal">Voir le détail du calcul</p>
      </div>
    </template>
    <template #contenu>
      <div class="">
        <h4>Hypothèses utilisées</h4>
        <p class="text--italic">
          Nous faisons des hypothèses sur différents paramètres utilisés pour le calcul à partir des données et études
          officielles en France. Vous pouvez modifier ces paramètres pour affiner le calcul !
        </p>
        <!-- TODO: ajouter un lien vers la documentation -->
        <ul>
          <li v-for="(hypothese, index) in resultatSimulationVoiture.hypotheses" :key="index">
            <span v-if="hypothese.valeur != null" class="text--bold">{{ hypothese.label }} :</span>
            <span v-if="hypothese.valeur != null" class="fr-ml-1w">
              <span class="text--bleu"> {{ hypothese.valeur }}</span
              >&nbsp<span v-if="hypothese.unite !== undefined" class="text--bleu"> {{ hypothese.unite }}</span>
            </span>
          </li>
        </ul>
      </div>
    </template>
  </Accordeon>
</template>

<script lang="ts" setup>
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { ResultatSimulationVoitureActuelleViewModel } from '@/domaines/simulationVoiture/adapters/resultatSimulationVoiture.presenter.impl';

  defineProps<{
    resultatSimulationVoiture: ResultatSimulationVoitureActuelleViewModel;
  }>();
</script>

<style scoped>
  .fr-accordion {
    background-color: #f6f7fa;
  }

  .fr-accordion::before,
  .fr-accordion__btn::after {
    display: none;
  }

  .fr-accordion__btn {
    position: relative;
    border-radius: 6px;
  }

  .fr-collapse.fr-collapse--expanded {
    padding: 1rem;
  }

  .fr-accordion__btn[aria-expanded='true'] {
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
  }

  .chevron-icon {
    position: absolute;
    right: 1rem;
    bottom: 1rem;
  }

  .fr-accordion__btn[aria-expanded='true'] .chevron-icon {
    transform: rotate(90deg);
  }
</style>
