<template>
  <img src="/award.svg" alt="award-logo" />
  <p class="badge-container-desc">{{ badgeViewModel?.titre }}</p>
</template>

<script lang="ts">
import { BadgeViewModel } from "@/score/ports/chargementScorePresenter";

export default {
  name: "BadgeContainer",
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
.badge-container-desc {
  font-size: 12px;
  margin-left: 5px;
}
</style>
