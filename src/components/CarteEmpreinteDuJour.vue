<template>
  <div class="fr-col-12 fr-col-md-6 fr-col-daily-carbon-value-card">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-daily-carbon-value" id="tile-6538">
        <div class="card-custom-body fr-p-md-2w fr-p-1w">
          <div class="fr-tile__title ">
            <p class="daily-carbon-value-text">Impact carbone du jour</p>
          </div>
          <div class="fr-tile__desc carbon-impact-value-container">
            <p style="font-weight:bolder; font-size: 4.5vh">+{{ suiviDuJourResultats.impactCarbonDuJour.valeur }}</p>
            <p style="font-weight: bold">&nbsp;kg&nbsp;</p>
            <p>de CO₂-e</p>
            <span style="margin-left: 5px" class="fr-icon-information-line" aria-hidden="true"></span>
          </div>
          <div class="carbon-value-desc-text">
            <div class="picto">
              <span :class="suiviDuJourResultats.impactCarbonDuJour.pictoSens" aria-hidden="true"></span>
            </div>
            <div class="commentaire">
              <p style="font-weight: bold">{{ suiviDuJourResultats.impactCarbonDuJour.commentaire }}</p>
              <span style="font-weight: bold">{{ suiviDuJourResultats.impactCarbonDuJour.variation }}</span>
              <span style="display:inline-block">&nbsp;kg CO₂-e<wbr>
              &nbsp;par rapport au suivi précédent</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { SuiviDuJourResultatsViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";

export default {
  name: "CarteEmpreinteDuJour",
  props: {
    suiviDuJourResultats: {
      type: Object as () => SuiviDuJourResultatsViewModel,
      required: true,
    },
  },
};
</script>

<style scoped>
.fr-col-daily-carbon-value-card {
  /*margin: 10px 10px 10px 0px;*/
}

.carbon-value-desc-text {
  display: flex;
  text-align: left;
  /*margin: 10px -5px 10px 10px;*/
  line-height: 1rem;
  font-size: 0.8rem;
}

.dashboard-daily-carbon-value {
  border: 0;
  border-radius: 3px;
  width: 100%;
  background-color: #e2e4fd;
}

.card-custom-body {
  color: #000c91;
}

.carbon-impact-value-container {
  display: flex;
  margin: 25px 10px 25px 0;
  color: #000c91;
}

.card-custom-body {
  align-items: baseline;
  /*margin: 10px;*/
  padding: 0;
  text-align: left;
}
.picto {
  display: flex;
  align-items: center;
}

.commentaire {
  margin-left: 5px;
}
.daily-carbon-value-text {
  color: #000c91;
  font-size: 1.2em;
}

@media only screen and (min-width: 768px) {
  .daily-carbon-value-text {
    font-size: 1.6em;
  }
}


</style>
