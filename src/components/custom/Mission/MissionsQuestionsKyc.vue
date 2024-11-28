<template>
  <MissionNavigation
    titre="Une question pour mieux vous connaître"
    :on-click-revenir-etape-precedente="revenirEtapePrecedente"
    :etape-actuelle="labelEtapeAffichee"
    :etape-totale="nombreEtapesMission"
  />
  <MissionQuestionKYC
    v-if="idKycCourante"
    :kyc-id="idKycCourante"
    :on-click-continuer="passerEtapeSuivante"
    :key="etapeCourante"
  />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import MissionNavigation from '@/components/custom/Mission/MissionNavigation.vue';
  import MissionQuestionKYC from '@/components/custom/Mission/MissionQuestionKYC.vue';
  import { MissionKycViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { scrollToMain } from '@/shell/scrollToMain';

  const props = defineProps<{
    kycs: MissionKycViewModel[];
    onKycTermine: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
  }>();

  const etapeCourante = ref<number>(props.etapeCouranteDefaut ?? 0);
  const labelEtapeAffichee = computed(() => etapeCourante.value + 1);
  const idKycCourante = computed(() => props.kycs[etapeCourante.value]?.id);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;

    if (etapeCourante.value === props.kycs.length) {
      props.onKycTermine();
    }
    scrollToMain();
  };

  const revenirEtapePrecedente = () => {
    etapeCourante.value--;

    if (etapeCourante.value === -1) {
      props.onClickRevenirEtapePrecedente();
    }
    scrollToMain();
  };
</script>
