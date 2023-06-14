<template>
  <div class="consumption">
    <h3>{{ quizViewModel.titre }}</h3>
    <a href="#">Commencer</a>
  </div>
</template>
<script lang="ts">
import { QuizzViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";

export default {
  name: "QuizzCarte",
  props: {
    quizViewModel: {
      type: Object as () => QuizzViewModel,
      required: true,
      default: undefined,
    },
  },
};
</script>
<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.consumption {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

h3 {
  font-size: 18px;
  margin-right: 10px;
}

p {
  font-size: 24px;
  font-weight: bold;
  position: relative;
}

.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}

.trend-icon {
  width: 24px;
  height: 24px;
  margin-left: 10px;
  display: inline-block;
  background-size: contain;
  background-repeat: no-repeat;
}

.visually-hidden {
  position: absolute;
  clip: rect(0 0 0 0);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
}

.trend-icon--up {
  background-image: url("@/assets/vers-le-haut.png");
}

.trend-icon--down {
  background-image: url("@/assets/vers-le-bas.png");
}
</style>
