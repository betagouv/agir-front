<template>
  <Teleport to="body">
    <Modale :id="modaleId" :is-footer-actions="true" :radius="false" labelId="label-id" size="s">
      <template v-slot:contenuEtFooter>
        <template v-if="connexionPrmStatus === ConnexionPRMStatus.EN_COURS">
          <BallLoader text="Localisation de votre compteur..." />
        </template>
        <template v-else-if="connexionPrmStatus === ConnexionPRMStatus.SUCCES">
          <ModaleSucces
            :modale-id="modaleId"
            :numero-compteur-input="numeroCompteurInput"
            :passer-etape-suivante="passerEtapeSuivante"
            :retour="retour"
          />
        </template>
        <template v-else-if="connexionPrmStatus === ConnexionPRMStatus.ECHEC">
          <ModaleEchec :modale-id="modaleId" :modifier-numero="modifierNumero" :retour="retour" />
        </template>
      </template>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import { ConnexionPRMStatus } from '@/components/custom/Action/Simulation/WattWatchers/connexionPrmStatus';
  import ModaleEchec from '@/components/custom/Action/Simulation/WattWatchers/ModaleEchec.vue';
  import ModaleSucces from '@/components/custom/Action/Simulation/WattWatchers/ModaleSucces.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';

  defineProps<{
    modaleId: string;
    connexionPrmStatus: ConnexionPRMStatus;
    numeroCompteurInput: string;
    passerEtapeSuivante: () => void;
    modifierNumero: () => void;
    retour: () => void;
  }>();
</script>

<style scoped>
  .accordeon-prm img {
    height: 7.5rem;
  }

  .accordeon-prm h4 {
    font-size: 1.1rem;
  }
</style>
