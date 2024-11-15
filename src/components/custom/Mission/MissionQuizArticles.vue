<template>
  <div v-for="(item, index) in missions" :key="item.idDuContenu">
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
  }>();

  const passerEtapeSuivante = () => {
    etapeCourante.value++;

    if (etapeCourante.value === props.missions.length) {
      props.onClickFinQuizArticle();
    }
  };
</script>
