<template>
  <div ref="containerRef" tabindex="-1">
    <SimulationWwIntroduction
      v-if="etapeActuelle === EtapeSimulateur.INTRODUCTION"
      :passer-etape-suivante="
        () => {
          etapeActuelle = EtapeSimulateur.RENSEIGNEMENT;
          resetFocus();
        }
      "
    />

    <SimulationWwRenseignement
      v-if="etapeActuelle === EtapeSimulateur.RENSEIGNEMENT"
      :passer-etape-suivante="
        () => {
          etapeActuelle = EtapeSimulateur.SIMULATEUR;
          resetFocus();
        }
      "
    />

    <KyCsAction
      v-if="etapeActuelle === EtapeSimulateur.SIMULATEUR"
      :action-id="SimulateursSupportes.WINTER"
      :idEnchainementKycs="idEnchainementKycs"
      :type-action="TypeAction.SIMULATEUR"
      class="fr-px-2w fr-mb-2w"
      @fin-kyc-atteinte="onFin"
    />

    <SimulationResultatWW
      v-else-if="etapeActuelle === EtapeSimulateur.RESULTAT"
      :on-recommencer-clicked="onRecommencerClicked"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import SimulationResultatWW from '@/components/custom/Action/Simulation/WattWatchers/SimulationResultatWW.vue';
  import SimulationWwIntroduction from '@/components/custom/Action/Simulation/WattWatchers/SimulationWWIntroduction.vue';
  import SimulationWwRenseignement from '@/components/custom/Action/Simulation/WattWatchers/SimulationWWRenseignement.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository.js';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { EtatPrm, RecupererEtatPrmUsecase } from '@/domaines/simulationWattWatchers/recupererEtatPrm.usecase';
  import {
    EtapeSimulateur,
    recupererEtapeSimulateurEtMessage,
  } from '@/domaines/simulationWattWatchers/utils/recupererEtapeSimulateurEtMessage';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes.js';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    idEnchainementKycs: string;
    aDejaEteSimule: boolean;
  }>();

  const aDejaEteSimuleRef = ref<boolean>(props.aDejaEteSimule);
  const etatPrm = ref<EtatPrm>();
  const etapeActuelle = ref<EtapeSimulateur>();
  const messageWarning = ref<string>();

  onMounted(async () => {
    const recupererEtatPrmUsecase = new RecupererEtatPrmUsecase(new LogementRepositoryAxios());
    etatPrm.value = await recupererEtatPrmUsecase.execute(utilisateurStore().utilisateur.id);

    const { etape, message } = recupererEtapeSimulateurEtMessage(etatPrm.value, props.aDejaEteSimule);
    etapeActuelle.value = etape;
    messageWarning.value = message;
  });

  const onRecommencerClicked = () => {
    aDejaEteSimuleRef.value = false;
    etapeActuelle.value = EtapeSimulateur.SIMULATEUR;
  };

  const onFin = () => {
    aDejaEteSimuleRef.value = true;
    etapeActuelle.value = EtapeSimulateur.SIMULATEUR;
  };

  const containerRef = ref<HTMLDivElement>();
  const resetFocus = () => {
    containerRef.value?.focus();
  };
</script>
