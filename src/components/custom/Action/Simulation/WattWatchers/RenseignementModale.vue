<template>
  <Teleport to="body">
    <Modale :id="modaleId" :is-footer-actions="true" :radius="false" labelId="label-id" size="s">
      <template v-slot:contenuEtFooter>
        <template v-if="connexionPrmStatus === ConnexionPRMStatus.EN_COURS">
          <BallLoader text="Localisation de votre compteur..." />
        </template>
        <template v-else-if="connexionPrmStatus === ConnexionPRMStatus.SUCCES">
          <ModaleSucces :modale-id="modaleId" :passer-etape-suivante="passerEtapeSuivante" />
        </template>
        <template v-else-if="connexionPrmStatus === ConnexionPRMStatus.ECHEC">
          <ModaleEchec :modale-id="modaleId" :modifier-numero="modifierNumero" :retour="retour" />
        </template>
        <template v-else-if="connexionPrmStatus === ConnexionPRMStatus.DEJA_ASSOCIE">
          <ModaleDejaAssocie :modale-id="modaleId" :retour="retour" />
        </template>
      </template>
    </Modale>
  </Teleport>
</template>

<script lang="ts" setup>
  import { ConnexionPRMStatus } from '@/components/custom/Action/Simulation/WattWatchers/connexionPrmStatus';
  import ModaleDejaAssocie from '@/components/custom/Action/Simulation/WattWatchers/ModaleDejaAssocie.vue';
  import ModaleEchec from '@/components/custom/Action/Simulation/WattWatchers/ModaleEchec.vue';
  import ModaleSucces from '@/components/custom/Action/Simulation/WattWatchers/ModaleSucces.vue';
  import BallLoader from '@/components/custom/BallLoader.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';

  defineProps<{
    modaleId: string;
    connexionPrmStatus: ConnexionPRMStatus;
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
