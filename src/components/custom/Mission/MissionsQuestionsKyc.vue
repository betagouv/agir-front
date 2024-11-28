<template>
  <MissionNavigation
    titre="Une question pour mieux vous connaître"
    :on-click-revenir-etape-precedente="revenirEtapePrecedente"
    :etape-actuelle="etapeAffichee"
    :etape-totale="nombreEtapesMission"
  />
  <MissionQuestionKYC :mission-id="idKycCourante" :on-click-continuer="passerEtapeSuivante" :key="etapeCourante" />
</template>

<script setup lang="ts">
  import { computed, ref } from 'vue';
  import MissionNavigation from '@/components/custom/Mission/MissionNavigation.vue';
  import MissionQuestionKYC from '@/components/custom/Mission/MissionQuestionKYC.vue';
  import { MissionKycViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';
  import { scrollToMain } from '@/shell/scrollToMain';

  const props = defineProps<{
    missions: MissionKycViewModel[];
    onClickFinKYC: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
  }>();

  const etapeCourante = ref<number>(props.etapeCouranteDefaut ?? 0);
  const etapeAffichee = computed(() => etapeCourante.value + 1);
  const idKycCourante = computed(() => props.missions[etapeCourante.value]?.id);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;

    if (etapeCourante.value === props.missions.length) {
      props.onClickFinKYC();
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

  // onMounted(async () => {
  //   const usecase = new RecupererQuestionsThematiqueUsecase(new QuestionRepositoryAxios());
  //   await usecase.execute(
  //     utilisateurStore().utilisateur.id,
  //     props.missionId,
  //     new ListesQuestionsThematiquePresenter(vm => (questionsViewModel.value = vm)),
  //   );
  //   isLoading.value = false;
  // });
</script>
