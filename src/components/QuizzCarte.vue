<template>
  <div v-if="quizViewModel" id="card-1197" class="fr-card fr-enlarge-link item-card dashboard-card-container">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h2 class="fr-card__title">
          {{ quizViewModel.titre }}
        </h2>
        <div class="fr-card__desc">
          <p class="dashboard-desc">Commencer le quiz</p>
          <p class="dashboard-desc">
            <a href="https://nosgestesclimat.fr/simulateur/bilan" target="_blank">Cliquez ici</a>
          </p>
          <img
            alt="quiz-logo"
            src="data:image/png;base64,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"
          />
        </div>
      </div>
    </div>
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

.dashboard-desc {
  font-size: 15px;
}

.item-card {
  border-radius: 5px;
  border: 2px black solid;
}
</style>
