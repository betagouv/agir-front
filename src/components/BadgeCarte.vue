<template>
  <div v-if="badgeViewModel" id="card-1197" class="fr-card fr-enlarge-link item-card dashboard-card-container">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h2 class="fr-card__title">
          {{ badgeViewModel.titre }}
        </h2>
        <div class="fr-card__desc">
          <p class="item-desc">{{ badgeViewModel.date }}</p>
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
import { BadgeViewModel } from "@/dashboard/ports/chargementDashboard.presenter.ts";

export default {
  name: "BadgeCarte",
  props: {
    badgeViewModel: {
      type: Object as () => BadgeViewModel,
      required: true,
      default: undefined,
    },
  },
};
</script>

<style scoped>
.item-desc {
  color: #0a76f6;
  font-weight: bold;
}

.item-card {
  border-radius: 5px;
  border: 2px black solid;
}
</style>
