<template>
  <button
    class="fr-mb-2w fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line"
    @click="revenirEtapePrecedente"
  >
    Retour
  </button>
  <div v-for="(item, index) in missions" :key="item.idDuContenu">
    <div v-if="etapeCourante === index">
      Etape {{ index + 1 + nombreDetapesPrecendentes }} sur {{ nombreEtapesMission }}
    </div>

    <MissionArticle
      v-if="item.type === 'article' && etapeCourante === index"
      :article-id="item.idDuContenu"
      :on-click-continuer="passerEtapeSuivante"
    />
    <MissionQuiz
      v-if="item.type === 'quiz' && etapeCourante === index"
      :quiz-id="item.idDuContenu"
      :on-click-continuer="passerEtapeSuivante"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import MissionArticle from '@/components/custom/Mission/MissionArticle.vue';
  import MissionQuiz from '@/components/custom/Mission/MissionQuiz.vue';
  import { MissionQuizArticleViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  const etapeCourante = ref<number>(0);

  const props = defineProps<{
    missions: MissionQuizArticleViewModel[];
    onClickFinQuizArticle: () => void;
    onClickRevenirEtapePrecedente: () => void;
    etapeCouranteDefaut?: number;
    nombreEtapesMission: number;
    nombreDetapesPrecendentes: number;
  }>();

  etapeCourante.value = props.etapeCouranteDefaut ?? 0;
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
