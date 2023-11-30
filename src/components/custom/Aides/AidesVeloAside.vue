<template>
  <form>
    <InputNumberHorizontal
      :default-value="prixDuVelo"
      class="fr-mb-3w"
      :min-value="0"
      name="prix-du-velo"
      label="Prix du velo"
      size="md"
    />
    <button class="fr-btn fr-btn--lg fr-mb-3w display-block full-width" @click="relancerSimultation">
      Relancer la simulation
    </button>
  </form>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Données utilisées pour l’estimation
    </p>
    <ul>
      <li>Code postal: {{ codePostal }}</li>
      <li>Revenu fiscal de référence : {{ revenuFiscal }}</li>
      <li>Nombre de parts fiscales : {{ nombreDePartsFiscales }}</li>
    </ul>
    <router-link
      class="fr-link fr-icon-arrow-right-line fr-link--icon-right text--black-light"
      :to="{ name: 'mon-compte' }"
    >
      Modifier ces données
    </router-link>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';

  const props = defineProps<{
    codePostal: number;
    revenuFiscal: number;
    nombreDePartsFiscales: number;
    prixDuVelo: number;
  }>();

  const emit = defineEmits(['submit-simulation']);
  const relancerSimultation = () => {
    emit('submit-simulation', props.codePostal, props.revenuFiscal, props.nombreDePartsFiscales, props.prixDuVelo);
  };
</script>

<style scoped></style>
