<template>
  <div>
    <h2>Dommage, vous avez perdu !</h2>
    <router-link :to="{ name: 'quiz', params: { id: quizId } }"> Recommencer </router-link>
    <router-link :to="{ name: 'dashboard' }"> Revenir au dashboard </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "QuizzPerdu",
  setup() {
    const quizId = history.state.quizId

    return {
      quizId: quizId
    }
  }
};
</script>

<style scoped></style>