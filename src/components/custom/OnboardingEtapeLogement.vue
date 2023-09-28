<template>
  <form>
    <h3 class="fr-h4">Où habitez-vous ?</h3>
    <div class="fr-col-8 fr-mb-2w">
      <InputCodePostal />
    </div>
    <h3 class="fr-h4">Combien êtes-vous dans votre logement (vous inclus) ?</h3>
    <div class="fr-grid-row">
      <InputNumberHorizontal label="Adulte(s)" name="nombre-vol-avion" class="fr-mr-8w fr-mb-2w" />
      <InputNumberHorizontal label="Enfant(s)" name="nombre-vol-avion" class="fr-mb-2w" />
    </div>
    <h3 class="fr-h4">Votre logement</h3>
    <BoutonRadio
      legende="Votre résidence principale est ..."
      name="typeLogement"
      :options="['Une maison', 'Un appartement']"
      col="fr-col-4"
    />
    <h3 class="fr-h4">Quelle en est la superficie ?</h3>
    <BoutonRadio
      legende="Votre résidence principale est ..."
      name="superficieLogement"
      :options="['Moins de 50 m²', 'Entre 50 et 100 m²', 'Plus de 100 m²']"
      col="fr-col-4"
    />
    <h3 class="fr-h4">Quelle est votre mode de chauffage principal ?</h3>
    <BoutonRadio
      legende="Votre résidence principale est ..."
      name="superficieLogement"
      :options="['Électricité', 'Bois / Pellet', 'Fioul', 'Gaz', 'Autre', 'Je ne sais pas']"
      col="fr-col-4"
    />
    <button @click="retourEtapePrecedente">Précédent</button>
  </form>
</template>
<script setup lang="ts">
  import InputCodePostal from '@/components/dsfr/InputCodePostal.vue';
  import InputNumberHorizontal from '@/components/custom/InputNumberHorizontal.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';

  const emit = defineEmits(['retourEtapePrecedente']);

  const retourEtapePrecedente = () => {
    emit('retourEtapePrecedente');
  };
</script>
