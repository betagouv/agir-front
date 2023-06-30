<template>
  <div class="fr-grid-row">
    <div class="fr-col fr-col-daily-carbon-value">
      <div class="col-demo">
        <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-daily-carbon-value" id="tile-6538">
          <div class="card-custom-body">
            <div class="fr-tile__title">
              <p style="color: #b34001">Impact carbone du jour</p>
            </div>
            <div class="fr-tile__desc grid-side-to-side-container"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-col fr-col-daily-carbon-value">
      <div class="col-demo">
        <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md daily-carbon-value-details" id="tile-6538">
          <div class="card-custom-body">
            <div class="fr-tile__title">
              <p>Addition carbone du jour</p>
            </div>
            <div class="fr-tile__desc grid-side-to-side-container"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <br />
  <button
    style="margin: 0 auto; background-color: white; color: #000091; border: 1px solid rgba(0, 0, 0, 0.19)"
    class="fr-btn continue-step-button fr-btn-not-rounded"
    title="Suivant"
  >
    Partager vos résultats
  </button>
</template>

<script lang="ts">
export default {
  name: "SuiviDuJourResultats",
};
</script>

<style scoped>
.dashboard-daily-carbon-value {
  border: 0;
  border-radius: 3px;
  width: 100%;
  background-color: #ffe8e5;
}

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
</style>
