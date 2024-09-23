<template>
  <div class="fr-container">
    <FilDAriane page-courante="Votre empreinte carbone" />
    <h1 class="fr-h2 fr-mb-0">Votre empreinte carbone</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!bilanCarboneViewModel">Problème de chargement de donées</p>
    <section v-else>
      <div class="fr-grid-row fr-grid-row--gutters fr-py-4w">
        <div class="fr-col-12 fr-col-md-9">
          <BilanCarboneHebdo
            class="fr-mb-4w"
            :impact-kg-annuel="bilanCarboneViewModel.impactKgAnnuel"
            :impact-kg-hebdomadaire="bilanCarboneViewModel.impactKgHebdomadaire"
          />
          <h2>Vos principaux postes d'émission</h2>
          <ol>
            <li v-for="top in bilanCarboneViewModel.top3" :key="top.label" class="fr-text--xl fr-text--bold fr-ml-2v">
              <div class="fr-grid-row">
                <div>
                  <div>
                    {{ top.label }}
                  </div>
                  <span class="text--rouge"> {{ top.pourcentage }}% </span>
                  <span class="fr-text--regular"> de vos émissions </span>
                </div>
                <span class="text--3xl fr-p-md-2w fr-p-0w fr-ml-4w">{{ top.emoji }}</span>
              </div>
            </li>
          </ol>
          <h2>Voir le détail</h2>
          <div v-for="univers in bilanCarboneViewModel.univers" :key="univers.label" class="fr-col-12">
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
            logo="/logo_ngc.png"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Accordeon from '@/components/custom/Accordeon.vue';
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import BilanCarboneHebdo from '@/components/custom/BilanCarbone/BilanCarboneHebdo.vue';
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    BilanCarbonePresenterImpl,
    BilanCarboneViewModel,
  } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';
  import { BilanCarboneRepositoryAxios } from '@/domaines/bilanCarbone/adapters/bilanCarbone.repository.axios';
  import { RecupererBilanCarboneUsecase } from '@/domaines/bilanCarbone/recupererBilanCarbone.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const bilanCarboneViewModel = ref<BilanCarboneViewModel>();

  onMounted(async () => {
    const { id: utilisateurId } = utilisateurStore().utilisateur;
    const recupererBilanCarboneUsecase = new RecupererBilanCarboneUsecase(new BilanCarboneRepositoryAxios());
    await recupererBilanCarboneUsecase.execute(
      utilisateurId,
      new BilanCarbonePresenterImpl(vm => (bilanCarboneViewModel.value = vm)),
    );
    isLoading.value = false;
  });
</script>
