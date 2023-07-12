<template>
  <div>
    <h2>Bravo, vous avez réussi le quiz !</h2>
    <router-link :to="{ name: 'coach' }"> Revenir au coach</router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: "QuizGagne",
};
</script>

<style scoped></style>
