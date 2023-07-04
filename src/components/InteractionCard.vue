<template>
  <div v-if="interactionViewModel" class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="card-item-container card-custom-body">
      <div class="fr-tile__title">
        <img class="interaction-logo-container" width="356" height="212" alt="interaction-item-logo" :src="interactionViewModel?.illustrationURL" />
        <p class="fr-badge fr-badge--sm badge-custom-container">{{ interactionViewModel?.categorie }}</p>
      </div>
      <h3 class="fr-tile__desc">
        {{ getDeviceType() == DeviceType.TABLET ? `${interactionViewModel?.titre.slice(0, 30)}...` : interactionViewModel?.titre }}
      </h3>
      <div class="fr-tile__desc grid-side-to-side-container">
        <div class="display-left">
          <p class="card-sub-title">{{ interactionViewModel?.sousTitre }}</p>
        </div>
        <div class="display-right">
          <img src="/leaf.svg" alt="leaf-logo" />
          <p class="card-sub-title-points">+ {{ interactionViewModel?.nombreDePointsAGagner }} points</p>
        </div>
      </div>
      <div class="interaction-footer">
        <a
          @click="interactionAEteCliquee(interactionViewModel.id)"
          :href="interactionViewModel?.url"
          :target="interactionViewModel?.isUrlExterne ? 'blank' : ''"
          >Commencer</a
        >
        <span class="interaction-duration">5 min</span>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
import { DeviceType, getDeviceType } from "@/DeviceType";
import { CliquerInteractionUsecase } from "@/interactions/cliquerInteraction.usecase";
import { InteractionsRepositoryAxios } from "@/interactions/adapters/interactionsRepository.axios";
import store from "@/store";

export default {
  name: "InteractionCard",
  computed: {
    DeviceType() {
      return DeviceType;
    },
  },
  props: {
    interactionViewModel: {
      type: Object as () => InteractionViewModel,
      required: true,
      default: undefined,
    },
  },
  methods: {
    getDeviceType,
    interactionAEteCliquee(interactionId: string) {
      const idUtilisateur = store.getters["utilisateur/getId"];
      const useCase = new CliquerInteractionUsecase(new InteractionsRepositoryAxios());
      useCase.execute(idUtilisateur, interactionId);
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

.card-custom-body {
  align-items: baseline;
  margin: 10px;
  padding: 0;
  text-align: left;
}

.interaction-logo-container {
  width: 100%;
  border-radius: 3px;
}
.badge-custom-container {
  border-radius: 15px;
}

.grid-side-to-side-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.display-left {
  float: left;
}

.display-right {
  float: right;
  display: flex;
}

.card-sub-title {
  font-size: 0.5rem;
}

.card-sub-title-points {
  font-size: 10px;
}

.interaction-footer {
  display: flex;
  align-items: center;
  margin-top: 10px;
  justify-content: space-between;
}
</style>
