<template>
  <CarteVierge class="text--center">
    <h5 class="fr-h6 fr-mb-1w">Votre bilan carbone</h5>
    <p class="fr-mb-0">
      <span class="fr-h3 fr-text--bold">{{ getImpactValue.bilan }}</span> tonnes de CO₂-e / an
    </p>
    <p class="fr-mb-2v">propulsé par <img src="/logo_ngc.png" alt="Nos gestes climat" /></p>
    <Accordeon nameId="accordeonBilan">
      <template v-slot:titre>Voir le détail</template>
      <template v-slot:contenu>
        <div v-for="detail in getImpactValue.details" :key="detail.libelle">
          <JaugeNosGestesClimat
            class="fr-mb-3v"
            :libelle="detail.libelle"
            :valeur="detail.valeur"
            :couleur="detail.couleur"
            :valeur-max="getImpactValue.valeurMax"
          />
        </div>
      </template>
    </Accordeon>
  </CarteVierge>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/custom/Accordeon.vue';
  import CarteVierge from '@/components/CarteVierge.vue';
  import JaugeNosGestesClimat from '@/components/JaugeNosGestesClimat.vue';
  import { EmpreinteViewModel } from '@/bilan/adapters/chargementEmpreinte.presenter.impl';

  defineProps<{
    getImpactValue: EmpreinteViewModel;
  }>();
</script>
