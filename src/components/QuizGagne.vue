<template>
  <div>
    <h2>Bravo, vous avez réussi le quiz !</h2>
    <router-link :to="{ name: 'dashboard' }"> Revenir au dashboard </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "QuizGagne",
};
</script>

<style scoped></style>
