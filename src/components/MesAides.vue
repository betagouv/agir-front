<template>
  <div>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <div class="fr-container--fluid">
          <div class="fr-grid-row fr-grid-row--gutters fr-mt-2w fr-mx-0 fr-mb-0">
            <h1 class="fr-h2 fr-col-12 fr-m-0">Vos aides personnalisées</h1>
            <div class="fr-col-12">
              <InteractionCard :interaction-view-model="aideVeloViewModel" />
            </div>
            <div class="fr-col-12">
              <InteractionCard :interaction-view-model="aideRetrofitViewModel" />
            </div>
          </div>
        </div>
      </div>
      <div class="fr-col-12 fr-col-lg-4">
        <div class="fr-container--fluid">
          <div class="fr-grid-row fr-grid-row--gutters card-item-list-container fr-mt-10w">
            <div class="fr-col-12">
              <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import InteractionCard from "@/components/custom/InteractionCard.vue";
import { InteractionViewModel } from "@/interactions/adapters/interactions.presenter.impl";
import CarteSkeleton from "@/components/CarteSkeleton.vue";
import MesResultats from "@/components/MesResultats.vue";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";
import { utilisateurStore } from "@/store/utilisateur";

export default defineComponent({
  name: "MesAides",
  components: { BilanNosGestesClimat, MesResultats, CarteSkeleton, InteractionCard },
  setup() {
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
    };
    return {
      aideVeloViewModel,
      aideRetrofitViewModel,
      store,
    };
  },
});
</script>