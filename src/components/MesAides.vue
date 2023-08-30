<template>
  <h1 class="fr-h2">Vos aides personnalisées</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <div>
          <InteractionCard :interaction-view-model="aideRetrofitViewModel" />
        </div>
      </div>
    <div class="fr-col-12 fr-col-lg-4">
      <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import InteractionCard from "@/components/custom/InteractionCard.vue";
  import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
  import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
  import { utilisateurStore } from "@/store/utilisateur";

  const store = utilisateurStore();
  const aideRetrofitViewModel: InteractionViewModel = {
    id: "",
    titre: "Simulez vos aides pour convertir votre voiture thermique en électrique",
    sousTitre: "",
    categorie: "🚗 Transport du quotidien",
    nombreDePointsAGagner: "25",
    miseEnAvant: "",
    type: "AIDE",
    illustrationURL: "https://picsum.photos/200/300",
    url: "/mes-aides/retrofit",
    isUrlExterne: false,
    duree: "⏱️ 5 minutes",
    estBloquee: false,
  };
</script>
