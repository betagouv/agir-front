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

  defineProps<{
    missions: MissionQuizArticleViewModel[];
  }>();

  const passerEtapeSuivante = () => {
    etapeCourante.value++;
    // afficherFinKyc.value = etapeCourante.value === props.questionsViewModel.questions.length;
    // if (afficherFinKyc.value) props.onClickFinKYC();
  };
</script>
