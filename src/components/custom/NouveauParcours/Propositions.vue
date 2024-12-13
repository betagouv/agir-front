<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <CarteDecouverte v-if="longueVieAuxObjets.tout > 0" titre-emoji="📺" titre-texte="Mes achats" lien-bouton="#">
      <ul>
        <li v-if="longueVieAuxObjets.reparer">
          <span class="fr-text--bold">{{ longueVieAuxObjets.reparer }}</span>
          {{ gererPluriel(longueVieAuxObjets.reparer, 'point de réparation', 'points de réparations') }} à proximité
        </li>
        <li v-if="longueVieAuxObjets.louer">
          <span class="fr-text--bold">{{ longueVieAuxObjets.louer }}</span>
          {{ gererPluriel(longueVieAuxObjets.louer, 'point de location', 'points de locations') }} près de chez moi
        </li>
        <li v-if="longueVieAuxObjets.emprunter">
          <span class="fr-text--bold">{{ longueVieAuxObjets.emprunter }}</span>
          {{ gererPluriel(longueVieAuxObjets.emprunter, "point d'emprunt", "point d'emprunts") }} à proximité
        </li>
        <li v-if="longueVieAuxObjets.donner">
          <span class="fr-text--bold">{{ longueVieAuxObjets.donner }}</span>
          {{ gererPluriel(longueVieAuxObjets.donner, 'point de don', 'points de dons') }} près de chez moi
        </li>
        <li v-if="longueVieAuxObjets.tout">
          Pour un ensemble de
          <span class="fr-text--bold">{{
            longueVieAuxObjets.tout === 200 ? 'plus de 200' : longueVieAuxObjets.tout
          }}</span>
          {{ gererPluriel(longueVieAuxObjets.tout, 'point', 'points') }} à proximité
        </li>
      </ul>
    </CarteDecouverte>

    <CarteDecouverte titre-emoji="🍛" titre-texte="Me nourrir" lien-bouton="#">
      <ul>
        <li v-if="presDeChezNous.circuitCourt">
          <span class="fr-text--bold">{{ presDeChezNous.circuitCourt }}</span>
          {{ gererPluriel(presDeChezNous.circuitCourt, 'point', 'points') }} de circuit court près de chez moi
        </li>
        <li v-if="presDeChezNous.epicerieSuperette">
          <span class="fr-text--bold">{{ presDeChezNous.epicerieSuperette }}</span>
          {{ gererPluriel(presDeChezNous.epicerieSuperette, 'épicerie ou supérette', 'épiceries ou supérettes') }} à
          proximité
        </li>
        <li v-if="presDeChezNous.marcheLocal">
          <span class="fr-text--bold">{{ presDeChezNous.marcheLocal }}</span>
          {{ gererPluriel(presDeChezNous.marcheLocal, 'marché local', 'marchés locaux') }}
        </li>
        <li v-if="presDeChezNous.zeroDechet">
          <span class="fr-text--bold">{{ presDeChezNous.zeroDechet }}</span>
          {{ gererPluriel(presDeChezNous.zeroDechet, 'point', 'points') }} zéro-déchet à proximité
        </li>
      </ul>
    </CarteDecouverte>

    <CarteDecouverte v-if="aides.nombreAidesTotal > 0" titre-emoji="💸 " titre-texte="Vos aides" lien-bouton="#">
      <ul>
        <li v-if="aides.nombreAidesNatTotal">
          <span class="text--bold">{{ aides.nombreAidesNatTotal }}</span>
          {{ gererPluriel(aides.nombreAidesNatTotal, 'aide nationale', 'aides nationales') }}
        </li>
        <li v-if="aides.nombreAidesRegionTotal">
          <span class="text--bold">{{ aides.nombreAidesRegionTotal }}</span>
          {{ gererPluriel(aides.nombreAidesRegionTotal, 'aide régionale', 'aides régionales') }}
        </li>
        <li v-if="aides.nombreAidesDepartementTotal">
          <span class="text--bold">{{ aides.nombreAidesDepartementTotal }}</span>
          {{ gererPluriel(aides.nombreAidesDepartementTotal, 'aide départementale', 'aides départementales') }}
        </li>
        <li v-if="aides.nombreAidesCommuneTotal">
          <span class="text--bold">{{ aides.nombreAidesCommuneTotal }}</span>
          {{ gererPluriel(aides.nombreAidesCommuneTotal, 'aide communale', 'aides communales') }}
        </li>
        <li v-if="aides.nombreAidesTotal">
          Pour un total de
          <span class="text--bold">{{ aides.nombreAidesTotal === 200 ? 'plus de 200' : aides.nombreAidesTotal }}</span>
          {{ gererPluriel(aides.nombreAidesTotal, 'aide', 'aides') }} !
        </li>
      </ul>
    </CarteDecouverte>
  </div>
</template>

<script setup lang="ts">
  import CarteDecouverte from '@/components/custom/NouveauParcours/CarteDecouverte.vue';
  import { NouveauParcoursViewModel } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';

  defineProps<{
    aides: NouveauParcoursViewModel['aides'];
    presDeChezNous: NouveauParcoursViewModel['presDeChezNous'];
    longueVieAuxObjets: NouveauParcoursViewModel['longueVieAuxObjets'];
  }>();

  function gererPluriel(nombre: number, singulier: string, pluriel: string) {
    return `${nombre === 1 ? singulier : pluriel}`;
  }
</script>

<style scoped>
  ul {
    line-height: 1.75;
  }
</style>
