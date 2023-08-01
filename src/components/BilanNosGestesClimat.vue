<template>
  <CarteVierge>
    <h5 class="fr-h6 fr-mb-1w">Votre bilan carbone</h5>
    <p class="fr-mb-0">
      <span class="fr-h3 fr-text--bold">{{ getImpactValue.bilan }}</span> tonnes de CO₂-e / an
    </p>
    <p class="fr-mb-2v">propulsé par <img src="/logo_ngc.png" alt="Nos gestes climat" /></p>
    <Accordeon nameId="accordeonBilan">
      <JaugeNosGestesClimat class="fr-mb-3v" libelle="🥦 Alimentation" :valeur="getImpactValue.detail.alimentation" couleur="#F28622" />
      <JaugeNosGestesClimat class="fr-mb-3v" libelle="🚗 Transports" :valeur="getImpactValue.detail.transport" couleur="#474EFF" />
      <JaugeNosGestesClimat class="fr-mb-3v" libelle="🏛️ Services sociétaux" :valeur="getImpactValue.detail.servicesSocietaux" couleur="#809769" />
      <JaugeNosGestesClimat class="fr-mb-3v" libelle="🏡 Logement" :valeur="getImpactValue.detail.logement" couleur="#F8BE00" />
      <JaugeNosGestesClimat class="fr-mb-3v" libelle="🛒 Consommation" :valeur="getImpactValue.detail.divers" couleur="#5C26D1" />
    </Accordeon>
  </CarteVierge>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import CarteVierge from '@/components/CarteVierge.vue';
  import JaugeNosGestesClimat from "@/components/JaugeNosGestesClimat.vue";
  import { EmpreinteViewModel } from "@/bilan/adapters/chargementEmpreinte.presenter.impl";

  defineProps<{
    getImpactValue: EmpreinteViewModel
  }>();
</script>
