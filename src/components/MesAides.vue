<template>
  <FilDAriane
    page-courante="Mes aides"
    :page-hierarchie="[{ label: 'Coach', url: 'coach' }]"
  />
  <h1 class="fr-h2">Vos aides personnalisées</h1>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div class="fr-col-12 fr-col-lg-8">
      <InteractionCard class="fr-mb-2w" :interaction-view-model="aideVeloViewModel" />
      <InteractionCard :interaction-view-model="aideRetrofitViewModel" />
    </div>
    <div class="fr-col-12 fr-col-lg-4">
      <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import FilDAriane from "@/components/dsfr/FilDAriane.vue";
  import InteractionCard from "@/components/custom/InteractionCard.vue";
  import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
  import { utilisateurStore } from "@/store/utilisateur";
  import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";

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
    idDuContenu: "",
  };
  const aideVeloViewModel: InteractionViewModel = {
    id: "",
    titre: "Simulez vos aides pour l'achat d'un vélo",
    sousTitre: "",
    categorie: "🚗 Transport du quotidien",
    nombreDePointsAGagner: "25",
    miseEnAvant: "",
    type: "AIDE",
    illustrationURL: "https://picsum.photos/200/300",
    url: "/mes-aides/velo",
    isUrlExterne: false,
    duree: "⏱️ 5 minutes",
    estBloquee: false,
    idDuContenu: "",
  };
</script>
