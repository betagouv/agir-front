<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <h3 class="fr-tile__desc">Votre score</h3>
      <ScoreContainer :score-value="scoreValue" />
      <br />
      <h3 class="fr-tile__desc">badges obtenus</h3>
      <div v-for="badge in badgeViewModel" :key="badge.titre" style="display: flex" class="fr-tile__desc">
        <BadgesContainer :badge-view-model="badge" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { BadgeViewModel } from "@/dashboard/ports/chargementDashboard.presenter";
import BadgeContainer from "@/components/BadgeContainer.vue";
import ScoreContainer from "@/components/ScoreContainer.vue";

export default {
  name: "MesResultats",
  components: { ScoreContainer, BadgesContainer: BadgeContainer },
  props: {
    badgeViewModel: {
      type: Object as () => BadgeViewModel[],
      required: true,
      default: undefined,
    },
    scoreValue: {
      required: true,
      default: 0,
    },
  },
};
</script>

<style scoped>
.card-item-container {
  align-items: flex-start;
  text-align: left;
}

.dashboard-card-item {
  border: 2px solid black;
  border-radius: 2px;
}

.fr-tile {
  box-shadow: unset;
}
</style>
