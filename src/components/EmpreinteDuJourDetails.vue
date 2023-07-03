<template>
  <div class="fr-col fr-col-daily-carbon-value">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md daily-carbon-value-details" id="tile-6538">
        <div class="card-custom-body">
          <div class="fr-tile__title">
            <p>Addition carbone du jour</p>
          </div>
          <div class="fr-tile__desc grid-side-to-side-container">
            <div class="fr-grid-row" v-for="item in impactCarbonDuJour.details">
              <div class="fr-col-2">
                <div class="col-demo">
                  <p :class="item.value > 1 ? ['carbon-value-item-primary'] : ['carbon-value-item-secondary']">+&nbsp;{{ item.equivalent }} kg</p>
                </div>
              </div>
              <div class="fr-col-10">
                <div class="col-demo">
                  <p :class="item.value > 1 ? ['carbon-value-item-primary'] : ['carbon-value-item-secondary']">
                    {{ item.value > 0 ? item.value : "" }} {{ item.nature == "aliment" ? "" : item.value != "" ? "km de" : "" }} {{ item.comment }}
                  </p>
                </div>
              </div>
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
  name: "EmptreinteDuJourDetails",
  props: {
    impactCarbonDuJour: {
      type: Object as () => ImpactCarbonDuJour,
      required: true,
    },
  },
};
</script>
<style scoped>
.daily-carbon-value-details {
  border: 0;
  border-radius: 3px;
  width: 100%;
  background-color: #f6f6f6;
}

.card-custom-body {
  align-items: baseline;
  margin: 10px;
  padding: 0;
  text-align: left;
}

.fr-col-daily-carbon-value {
  margin: 10px;
}

.carbon-value-item-primary {
  font-size: 1.4vh;
  font-weight: bold;
}

.carbon-value-item-secondary {
  font-size: 1.2vh;
}
</style>
