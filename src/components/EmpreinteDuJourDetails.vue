<template>
  <div class="fr-col-12 fr-col-md-6 fr-col-daily-carbon-value">
    <div class="col-demo">
      <div class="fr-tile fr-enlarge-link daily-carbon-value-details" id="tile-6538">
        <div class="carbon-card-custom-body fr-p-md-2w fr-p-1w">
          <div class="fr-tile__title fr-mb-md-2w daily-carbon-value-text">
            Addition carbone du jour
          </div>
          <div class="fr-tile__desc grid-side-to-side-container">
            <div class="fr-grid-row" v-for="impactCarboneItem in suiviDuJourResultats.additionCarbone">
              <div class="fr-col-3">
                <div class="col-demo">
                  <p :class="impactCarboneItem.styleFont">
                    {{ impactCarboneItem.impactCarbone }}
                  </p>
                </div>
              </div>
              <div class="fr-col-9">
                <div class="col-demo">
                  <p :class="impactCarboneItem.styleFont">
                    {{ impactCarboneItem.valeur }}
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
import { SuiviDuJourResultatsViewModel } from "@/suivi/adapters/suiviDuJour.presenter.impl";

export default {
  name: "EmptreinteDuJourDetails",
  props: {
    suiviDuJourResultats: {
      type: Object as () => SuiviDuJourResultatsViewModel,
      required: true,
    },
  },
  computed: {},
  setup() {
    function getSuiviCategory(categorie: string) {
      if (categorie == "voiture" || categorie == "moto" || categorie == "train" || categorie == "metro/tramway" || categorie == "velo") {
        return "transport";
      }
      return "repas";
    }
    function getEquivalentCarbone(element: string, value: string) {
      const categorie = getSuiviCategory(element);

      if (categorie == "transport") {
        return parseInt(value) * 0.125;
      }
      return parseInt(value);
    }
    return { getSuiviCategory, getEquivalentCarbone };
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

.carbon-card-custom-body {
  align-items: baseline;
  /*margin: 10px;*/
  padding: 0;
  text-align: left;
  min-height: 17vh;
}


.carbon-value-item-primary {
  font-size: 0.8em;
  font-weight: bold;
}

.carbon-value-item-secondary {
  font-size: 0.7em;
}

.daily-carbon-value-text {
  font-size: 0.9em;

}
@media only screen and (min-width: 768px) {
  .daily-carbon-value-text {
    font-size: 1.6em;
  }
  .carbon-value-item-primary {
    font-size: 0.9em;
    font-weight: bold;
  }

  .carbon-value-item-secondary {
    font-size: 0.8em;
  }
}

</style>
