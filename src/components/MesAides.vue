<template>
  <div class="mes-aides-container">
    <h1>Retrouvez ici toutes les aides que vous pouvez obtenir</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-6 fr-col-lg-4">
        <div id="card-1197" class="fr-card item-card aide-card-item">
          <div class="fr-card__body">
            <div class="fr-card__content">
              <h2 class="fr-card__title">Mes aides retrofit</h2>
              <p class="fr-card__desc">
                <router-link :to="{ name: 'mes-aides-retrofit' }">Simuler mes aides Retrofit</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "MesAides",
});
</script>
<style scoped>
.mes-aides-container {
  margin: 20px;
}

.aide-card-item {
  border: 2px solid black;
  border-radius: 2px;
}
</style>
