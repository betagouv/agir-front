<template>
  <MissionNavigation
    :on-click-revenir-etape-precedente="revenirEtapePrecedente"
    :etape-actuelle="etapeAffichee"
    :etape-totale="nombreEtapesMission"
  />
  <MissionArticle
    v-if="missionAffichee.type === 'article'"
    :key="etapeCourante"
    :article-id="missionAffichee.idDuContenu"
    :on-click-continuer="passerEtapeSuivante"
  />
  <MissionQuiz
    v-if="missionAffichee.type === 'quiz'"
    :key="etapeCourante"
    :quiz-id="missionAffichee.idDuContenu"
    :on-click-continuer="passerEtapeSuivante"
  />
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue';
  import MissionArticle from '@/components/custom/Mission/MissionArticle.vue';
  import MissionNavigation from '@/components/custom/Mission/MissionNavigation.vue';
  import MissionQuiz from '@/components/custom/Mission/MissionQuiz.vue';
  import { MissionQuizArticleViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  const props = defineProps<{
    missions: MissionQuizArticleViewModel[];
    onClickFinQuizArticle: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
    nombreDetapesPrecendentes: number;
  }>();

  const etapeCourante = ref<number>(props.etapeCouranteDefaut ?? 0);

  const missionAffichee = computed(() => props.missions[etapeCourante.value]);
  const etapeAffichee = computed(() => etapeCourante.value + 1 + props.nombreDetapesPrecendentes);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;

    if (etapeCourante.value === props.missions.length) {
      props.onClickFinQuizArticle();
    }
  };

  const revenirEtapePrecedente = () => {
    etapeCourante.value--;

    if (etapeCourante.value === -1) {
      props.onClickRevenirEtapePrecedente();
    }
  };
</script>
