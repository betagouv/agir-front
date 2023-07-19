<template>
  <div>
    <strong style="font-size: 20px">Bien joué !</strong>
  </div>
  <div style="margin-top: 10px">
    <strong>Vous avez trouvé la bonne réponse.</strong>
  </div>
  <div v-if="etapeCourante == quizViewModel?.questions.length">
    <div style="margin-top: 10px">
      <strong>Vous avez gagné</strong>
      <div style="display: flex; margin-top: 5px">
        <img src="/leaf.svg" alt="leaf-logo" />
        <strong>+ {{ getScore }} points</strong>
      </div>
    </div>
    <br />
    <router-link v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }" class="fr-btn fr-btn-not-rounded redirect-coach-link">
      Revenir au coach
    </router-link>
  </div>
  <div v-else>
    <br />
    <button @click="passerALaQuestionSuivante" class="fr-btn" title="Continuer">Continuer</button>
  </div>
</template>
<script lang="ts">
export default {
  name: "QuizReponseCorrecte",
  props: {
    etapeCourante: {},
    getScore: {},
    passerALaQuestionSuivante: {},
    quizViewModel: {},
  },
};
</script>
<style scoped>
.stepper-actions span:hover {
  cursor: pointer;
}
</style>
