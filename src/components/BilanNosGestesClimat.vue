<template>
  <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
    <div class="fr-tile__body card-item-container">
      <h3 class="fr-tile__desc">Votre bilan carbone</h3>
      <br />
      <p class="valeur">
        <span class="impact-value">{{ getImpactValue }}</span> <span class="impact-tonne">tonnes de CO₂-e / an</span>
      </p>
      <br />
      <div class="fr-tile__desc">propulsé par <img src="/logo_ngc.png" alt="impact-logo" /></div>
      <div class="accordion-container">
        <section class="fr-accordion">
          <h3 class="fr-accordion__title">
            <span class="fr-accordion__btn accordion-btn-area" aria-expanded="false" aria-controls="accordion-607">Voir le détail</span>
          </h3>
          <div class="fr-collapse" id="accordion-607">
            <JaugeNosGestesClimat class="fr-mb-3v" libelle="🥦 Alimentation" :valeur="3.4" couleur="#F28622" />
            <JaugeNosGestesClimat class="fr-mb-3v" libelle="🚗 Transports" :valeur="2" couleur="#474EFF" />
            <JaugeNosGestesClimat class="fr-mb-3v" libelle="🏛️ Services sociétaux" :valeur="2" couleur="#809769" />
            <JaugeNosGestesClimat class="fr-mb-3v" libelle="🏡 Logement" :valeur="0.5" couleur="#F8BE00" />
            <JaugeNosGestesClimat class="fr-mb-3v" libelle="🛒 Consommation" :valeur="0.5" couleur="#5C26D1" />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import JaugeNosGestesClimat from "@/components/JaugeNosGestesClimat.vue";

export default {
  name: "BilanNosGestesClimat",
  components: { JaugeNosGestesClimat },
  props: {
    getImpactValue: {},
  },
};
</script>
<style scoped>
.impact-value {
  color: #161616;
  font-size: 1.5rem;
}

.impact-tonne {
  color: #161616;
  font-size: 1rem;
  font-weight: 300;
  line-height: 1.5rem;
}

.accordion-container {
  width: 100%;
  margin-top: 5px;
}

.accordion-btn-area {
  color: #0a76f6;
  font-size: 0.9rem;
}

.accordion-area-desc {
  font-size: 12px;
}

.accordion-area-desc {
  font-size: 12px;
}

.accordion-area-desc:hover {
  cursor: pointer;
}

div.accordion-container > section > h3 > span:hover {
  cursor: pointer;
}
</style>
