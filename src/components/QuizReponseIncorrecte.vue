<template>
  <div style="margin: 10px" v-html="item.texteExplication" />
  <br />
  <router-link v-if="etapeCourante == quizViewModel?.questions.length" :to="{ name: 'coach' }" class="fr-btn fr-btn-not-rounded redirect-coach-link">
    Revenir au coach
  </router-link>
</template>
<script lang="ts">
export default {
  name: "QuizReponseIncorrecte",
  props: {
    etapeCourante: {},
    item: {},
    quizViewModel: {},
  },
};
</script>
<style scoped>
.stepper-actions span:hover {
  cursor: pointer;
}
</style>
