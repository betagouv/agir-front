<template>
  <div class="fr-col fr-col-daily-carbon-value-card">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-daily-carbon-value" id="tile-6538">
        <div class="card-custom-body card-custom-body card-custom-body">
          <div class="fr-tile__title">
            <p class="daily-carbon-value-text">Impact carbone du jour</p>
          </div>
          <div class="fr-tile__desc grid-side-to-side-container carbon-impact-value-container">
            <p style="font-weight: bold; font-size: 3.5vh">+{{ empreinteCarboneDuJour?.valeur }}</p>
            <p style="font-weight: bold">&nbsp;kg&nbsp;</p>
            <p>de CO₂-e</p>
            <span style="margin-left: 5px" class="fr-icon-information-line" aria-hidden="true"></span>
          </div>
          <div>
            <div class="carbon-value-desc-text">
              <span :class="empreinteCarboneDuJour.pictoSens" aria-hidden="true"></span>
              <p style="margin-left: 5px; font-weight: bold">En hausse</p>
              &nbsp;
              <p>+7 kg CO₂-e par rapport au suivi précédent</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ImpactCarboneDuJourViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";

export default {
  name: "CarteEmpreinteDuJour",
  props: {
    empreinteCarboneDuJour: {
      type: Object as () => ImpactCarboneDuJourViewModel,
      required: true,
    },
  },
};
</script>
<style scoped>
.fr-col-daily-carbon-value-card {
  margin: 10px;
}

.carbon-value-desc-text {
  display: flex;
  text-align: left;
  margin: 10px;
}

.dashboard-daily-carbon-value {
  border: 0;
  border-radius: 3px;
  width: 100%;
  background-color: #e2e4fd;
}

.daily-carbon-value-text {
  color: #000c91;
  margin: 10px;
  font-size: 2.5vh;
}

.card-custom-body {
  color: #000c91;
}

.carbon-impact-value-container {
  display: flex;
  margin: 15px;
  color: #000c91;
}

.card-custom-body {
  align-items: baseline;
  margin: 10px;
  padding: 0;
  text-align: left;
}
</style>
