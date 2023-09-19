<template>
  <MesAides
    :aides="aides"
    :valeurBilanCarbone="store.valeurBilanCarbone"
  />
</template>

<script setup lang="ts">
  import { utilisateurStore } from '@/store/utilisateur';
  import MesAides from '@/components/MesAides.vue';

  const store = utilisateurStore();
  const aides = [
    {
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
    },
    {
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
    }
  ]
</script>
