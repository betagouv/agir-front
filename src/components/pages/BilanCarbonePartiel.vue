<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-md-9">
      <section class="fr-py-2w">
        <h2 class="fr-h3">Ma première estimation</h2>
        <div v-if="bilanCarbonePartielViewModel.categories" class="fr-mb-4w">
          <div class="fr-col-md-6">
            <BilanPremiereEstimation :bilanPremiereEstimation="bilanCarbonePartielViewModel.categories" />
          </div>
        </div>
        <p class="fr-mb-0">
          ✨ Estimation complète à
          <span class="text--bleu">{{ bilanCarbonePartielViewModel.pourcentageCompletionTotal }}%</span>
        </p>
      </section>
      <section class="fr-py-2w">
        <BilanThematiquesListeCartes
          titre="Affinez mon <span class='text--bleu'>estimation</span>"
          sous-titre="Et obtenez un bilan détaillé de votre impact sur l’environnement"
          :thematiques-bilan="bilanCarbonePartielViewModel.thematiquesBilan"
          colonnes="fr-col-md-3 fr-col-6"
        />
      </section>
      <section class="fr-py-2w">
        <h2 class="fr-h3">Une question&nbsp;?</h2>
        <div class="fr-accordions-group background--white">
          <Accordeon name-id="bilan-carbone">
            <template #titre>Qu’est-ce qu’un bilan carbone ?</template>
            <template #contenu>
              <p>
                Que l’on se rende dans un magasin de quartier pour faire ses courses, qu’on allume la lumière ou qu’on
                chauffe son logement, l’ensemble de nos actions quotidiennes a un impact sur l’environnement. Cet
                impact, c’est ce que l’on appelle le <span class="text--bold">bilan environnemental</span>, comme une
                trace invisible que nous laissons derrière nous. L’empreinte mesure la quantité totale de gaz à effet de
                serre (dioxyde de carbone (CO2), protoxyde d'azote, méthane, ...) liés à notre consommation et permet
                donc de quantifier nos émissions selon notre mode de vie. Elle peut concerner les émissions d’un
                individu (son mode de vie), d’une entreprise (ses activités) ou d’une population, d'un territoire.<br />Calculer
                son
                <span class="text--bold">bilan environnemental</span>
                permet de comprendre quels sont nos usages qui contribuent le plus au changement climatique, et de
                saisir les actions qui auraient le plus d’impact pour le réduire.
              </p>
            </template>
          </Accordeon>
          <Accordeon name-id="bilan-empreinte">
            <template #titre> Comment est calculée mon empreinte ?</template>
            <template #contenu>
              <p>
                Votre bilan environnemental est calculé à partir de vos réponses grâce au calculateur carbone de
                <a href="https://nosgestesclimat.fr/documentation/bilan" target="_blank" rel="noopener noreferrer">
                  Nos Gestes Climat</a
                >
                développé par l’Agence de la transition écologique (ADEME) et beta.gouv.fr, en partenariat avec
                l’Association Bilan Carbone (ABC).
              </p>
            </template>
          </Accordeon>
        </div>
      </section>
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
  import BilanPremiereEstimation from '@/components/custom/BilanCarbone/BilanPremiereEstimation.vue';
  import BilanThematiquesListeCartes from '@/components/custom/BilanCarbone/BilanThematiquesListeCartes.vue';
  import ServiceAside from '@/components/custom/Service/ServiceAside.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { BilanCarbonePartielViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanCarbonePartielViewModel: BilanCarbonePartielViewModel;
  }>();
</script>
