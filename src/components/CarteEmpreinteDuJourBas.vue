<template>
  <div class="fr-col fr-col-daily-carbon-value">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-daily-carbon-value-green" id="tile-6538">
        <div class="card-custom-body-red card-custom-body card-custom-body-green">
          <div class="fr-tile__title">
            <p class="daily-carbon-value-text-green">Impact carbone du jour</p>
          </div>
          <div class="fr-tile__desc grid-side-to-side-container carbon-impact-value-container-green">
            <p style="font-weight: bold; font-size: 3.5vh">+{{ impactCarbonDuJour.suiviDuJOur }}</p>
            <p style="font-weight: bold">&nbsp;kg&nbsp;</p>
            <p>de CO₂-e</p>
          </div>
          <div>
            <div class="carbon-value-desc-text">
              <span class="fr-icon-arrow-right-up-circle-fill" aria-hidden="true"></span>
              <p style="margin-left: 5px; font-weight: bold">En hausse</p>
              &nbsp;
              <p>+7 kg CO₂-e par rapport au suivi précédent</p>
            </div>
            <div style="display: flex; text-align: left; margin: 10px">
              <span class="fr-icon-arrow-right-down-circle-fill" aria-hidden="true"></span>
              <p style="margin-left: 5px; font-weight: bold">En dessous de la moyenne des autres utilisateurs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ImpactCarbonDuJour } from "@/suivi/ImpactCarbone";

export default {
  name: "CarteEmpreinteDuJourBas",
  props: {
    impactCarbonDuJour: {
      type: Object as ImpactCarbonDuJour,
      required: true,
    },
  },
};
</script>
<style scoped>
.fr-col-daily-carbon-value {
  margin: 10px;
}

.carbon-value-desc-text {
  display: flex;
  text-align: left;
  margin: 10px;
}

.dashboard-daily-carbon-value-green {
  border: 0;
  border-radius: 3px;
  width: 100%;
  background-color: #00e8e5;
}

.daily-carbon-value-text-green {
  color: white;
  margin: 10px;
}

.card-custom-body-red {
  color: #b34001;
}

.card-custom-body-green {
  color: white;
}

.carbon-impact-value-container-green {
  display: flex;
  margin: 15px;
  color: white;
}

.card-custom-body {
  align-items: baseline;
  margin: 10px;
  padding: 0;
  text-align: left;
}
</style>
