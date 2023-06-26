<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <div class="fr-tile__title">
        <img alt="interaction-item-logo" style="width: 100%" :src="interactionViewModel?.illustrationURL" />
      </div>
      <h3 class="fr-tile__desc">
        {{ interactionViewModel?.titre }}
      </h3>
      <div style="display: flex" class="fr-tile__desc">
        <p style="font-size: 0.5rem; justify-content: left; text-align: left">{{ interactionViewModel?.sousTitre || "Aucun sous-titre" }}</p>
        <div style="display: flex; justify-content: right; text-align: right">
          <img src="../../public/leaf.svg" alt="leaf-logo" />
          <p style="font-size: 10px">{{ "+25" }} points</p>
        </div>
      </div>
    </div>
  </div>

  <!--<div>
    <img :src="interactionViewModel?.illustrationURL" />
    {{ interactionViewModel?.titre }}
    {{ interactionViewModel?.sousTitre }}
    {{ interactionViewModel?.categorie }}
  </div>-->
</template>
<script lang="ts">
import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";

export default {
  name: "InteractionCard",
  props: {
    interactionViewModel: {
      type: Object as () => InteractionViewModel,
      required: true,
      default: undefined,
    },
  },
};
</script>
<style scoped>
.dashboard-card-item {
  border: 1px solid #e8e8e8;
  border-radius: 3px;
  width: 100%;
}

.fr-tile {
  box-shadow: unset;
}
</style>
