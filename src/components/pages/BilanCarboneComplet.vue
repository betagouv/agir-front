<template>
  <div class="fr-col-md-9">
    <BilanCarboneProgressBar
      :impact-tonne-annuel="bilanCarboneViewModel.nombreDeTonnesAnnuel"
      :pourcentage-progress-bar="bilanCarboneViewModel.pourcentageProgressBar"
      class="fr-mb-4w"
    />
  </div>
  <section>
    <h2 class="fr-h3">Mes principaux postes d'émission</h2>
    <ol>
      <li v-for="top in bilanCarboneViewModel.top3" :key="top.label" class="fr-text--xl fr-text--bold fr-ml-2v">
        <div class="fr-grid-row">
          <div>
            <div>
              {{ top.label }}
            </div>
            <span class="text--rouge"> {{ top.pourcentage }}% </span>
            <span class="fr-text--regular"> de mes émissions </span>
          </div>
          <span aria-hidden="true" class="text--3xl fr-p-md-2w fr-p-0w fr-ml-4w">{{ top.emoji }}</span>
        </div>
      </li>
    </ol>
  </section>
  <section class="fr-mb-4w">
    <h2 class="fr-h3">Voir le détail</h2>
    <div v-for="univers in bilanCarboneViewModel.univers" :key="univers.label" class="fr-col-12 fr-col-md-9">
      <Accordeon :name-id="univers.label">
        <template v-slot:titre>
          <span class="fr-grid-row flex-space-between full-width">
            <span class="fr-text--md text--black text--semi-bold">
              <span aria-hidden="true" class="fr-mr-2w">{{ univers.emoji }}</span> {{ univers.label }}
            </span>
            <span class="fr-text--md fr-mr-4w text--bleu text--bold">
              <span class="fr-sr-only">: </span>
              {{ univers.impactKgAnnuel.valeur }}
              <span class="fr-text--sm fr-text--regular">{{ univers.impactKgAnnuel.unite }}</span>
            </span>
          </span>
        </template>
        <template #contenu>
          <ul class="list-style-none">
            <li v-for="detail in univers.details" :key="detail.label" class="fr-grid-row align-items--center fr-mb-4w">
              <span class="fr-grid-row flex-space-between full-width fr-m-0">
                <span class="fr-text--md text--black text--semi-bold fr-m-0">
                  <span class="fr-mr-2w" aria-hidden="true">{{ detail.emoji }}</span> {{ detail.label }}
                </span>
                <span class="fr-text--md fr-mr-4w text--bleu text--bold fr-m-0">
                  {{ detail.impactKgAnnuel.valeur }}
                  <span class="fr-text--sm fr-text--regular">{{ detail.impactKgAnnuel.unite }}</span>
                </span>
              </span>
              <div class="full-width fr-ml-5w fr-mr-32v">
                <BarreDeProgression
                  :label="`Représente ${detail.pourcentage}% de votre empreinte carbone dans cette categorie`"
                  :value="detail.pourcentage"
                  :value-max="100"
                  couleur="#DF1451"
                  min-width="2%"
                />
              </div>
            </li>
          </ul>
        </template>
      </Accordeon>
    </div>
  </section>
  <section>
    <BilanThematiquesListeCartes
      :thematiques-bilan="bilanCarboneViewModel.thematiquesBilan"
      colonnes="fr-col-md-3 fr-col-6"
      sous-titre="Et obtenir des recommandations toujours plus personnalisées sur <span class='text--italic fr-text--bold'>J'agis</span>"
      titre="Affiner ou modifier mon bilan"
    />
  </section>
</template>

<script lang="ts" setup>
  import Accordeon from '@/components/custom/Aides/AccordeonAides.vue';
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import BilanCarboneProgressBar from '@/components/custom/BilanCarbone/BilanCarboneProgressBar.vue';
  import BilanThematiquesListeCartes from '@/components/custom/BilanCarbone/BilanThematiquesListeCartes.vue';
  import { BilanCarboneCompletViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{ bilanCarboneViewModel: BilanCarboneCompletViewModel }>();
</script>
