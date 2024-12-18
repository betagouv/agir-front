<template>
  <ExamenNavigation
    :etape-actuelle="etapeAffichee"
    :etape-totale="nombreEtapesMission"
    :on-click-revenir-etape-precedente="revenirEtapePrecedente"
  />
  <Examen
    :key="etapeCourante"
    :on-click-continuer="passerEtapeSuivante"
    :quiz-id="missionAffichee.idDuContenu"
    :titre-examen="titre"
  />
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import Examen from '@/components/custom/Mission/Examen/Examen.vue';
  import ExamenNavigation from '@/components/custom/Mission/Examen/ExamenNavigation.vue';
  import { ExamenQuizViewModel } from '@/domaines/missions/adapters/examen.presenter.impl';
  import { scrollToMain } from '@/shell/scrollToMain';

  const props = defineProps<{
    quizz: ExamenQuizViewModel[];
    onClickFinQuizArticle: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
    nombreDetapesPrecendentes: number;
    titre: string;
  }>();

  const etapeCourante = ref<number>(props.etapeCouranteDefaut ?? 0);

  const missionAffichee = computed(() => props.quizz[etapeCourante.value]);
  const etapeAffichee = computed(() => etapeCourante.value + props.nombreDetapesPrecendentes);

  const passerEtapeSuivante = () => {
    etapeCourante.value++;

    if (etapeCourante.value === props.quizz.length) {
      props.onClickFinQuizArticle();
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
