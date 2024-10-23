<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-py-4w">
    <div class="fr-col-12 fr-col-md-9">
      <div class="fr-col-md-9">
        <BilanCarboneProgressBar
          :impact-tonne-annuel="bilanCarboneViewModel.nombreDeTonnesAnnuel"
          :pourcentage-progress-bar="bilanCarboneViewModel.pourcentageProgressBar"
          class="fr-mb-4w"
        />
      </div>
      <h2>Mes principaux postes d'émission</h2>
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
            <span class="text--3xl fr-p-md-2w fr-p-0w fr-ml-4w">{{ top.emoji }}</span>
          </div>
        </li>
      </ol>
      <h2>Voir le détail</h2>
      <div v-for="univers in bilanCarboneViewModel.univers" :key="univers.label" class="fr-col-12 fr-col-md-9">
        <Accordeon :name-id="univers.label">
          <template v-slot:titre>
            <span class="fr-grid-row flex-space-between full-width">
              <span class="fr-text--md text--black text--semi-bold">
                <span class="fr-mr-2w">{{ univers.emoji }}</span> {{ univers.label }}
              </span>
              <span class="fr-text--md fr-mr-4w text--bleu text--bold">
                {{ univers.impactKgAnnuel.valeur }}
                <span class="fr-text--sm fr-text--regular">{{ univers.impactKgAnnuel.unite }}</span>
              </span>
            </span>
          </template>
          <template #contenu>
            <ul class="list-style-none">
              <li
                v-for="detail in univers.details"
                :key="detail.label"
                class="fr-grid-row align-items--center fr-mb-4w"
              >
                <span class="fr-grid-row flex-space-between full-width fr-m-0">
                  <span class="fr-text--md text--black text--semi-bold fr-m-0">
                    <span class="fr-mr-2w">{{ detail.emoji }}</span> {{ detail.label }}
                  </span>
                  <span class="fr-text--md fr-mr-4w text--bleu text--bold fr-m-0">
                    {{ detail.impactKgAnnuel.valeur }}
                    <span class="fr-text--sm fr-text--regular">{{ detail.impactKgAnnuel.unite }}</span>
                  </span>
                </span>
                <div class="full-width fr-ml-5w fr-mr-32v">
                  <BarreDeProgression
                    :value="detail.pourcentage"
                    :value-max="100"
                    :label="`Représente ${detail.pourcentage}% de votre empreinte carbone dans cette categorie`"
                    couleur="#DF1451"
                    min-width="2%"
                  />
                </div>
              </li>
            </ul>
          </template>
        </Accordeon>
      </div>
    </div>
    <div class="fr-col-12 fr-col-md-3">
      <ServiceAside
        image="/bilan-carbone-ngc-screenshot.svg"
        nom="Nos Gestes Climat"
        description="Basé sur le calculateur carbone développé par l’Agence de la transition écologique (ADEME) et beta.gouv.fr, en partenariat avec l’Association Bilan Carbone (ABC)."
        url="https://nosgestesclimat.fr/"
        logo="/logo_ngc.webp"
      />
    </div>
  </div>
</template>
<script setup lang="ts">
  import Accordeon from '@/components/custom/Aides/AccordeonAides.vue';
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import BilanCarboneProgressBar from '@/components/custom/BilanCarbone/BilanCarboneProgressBar.vue';
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import { BilanCarboneCompletViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{ bilanCarboneViewModel: BilanCarboneCompletViewModel }>();
</script>
