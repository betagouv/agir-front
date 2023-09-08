<template>
  <div class="fr-container">
    <FilDAriane
      :page-courante="`Article: ${article.titre}`"
      :page-hierarchie="[
        {
          label: 'Coach',
          url: '/coach',
        },
      ]"
    />
    <h1>{{ article.titre }}</h1>
    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-md-8">
        <div class="article fr-p-6v background--white border-radius--md" v-html="article.texte" />
      </div>
      <div class="fr-col-12 fr-col-md-4">
        <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import BilanNosGestesClimat from "./BilanNosGestesClimat.vue";
import FilDAriane from "./dsfr/FilDAriane.vue";
import { utilisateurStore } from "@/store/utilisateur";
import { useRouter } from "vue-router";
import { ArticleCMS, ChargerContenuCms } from "@/cms/chargerContenuCms";

const store = utilisateurStore();
const router = useRouter();

const article = ref<ArticleCMS>({
  titre: "",
  texte: "",
});

onMounted(async () => {
  const articleUsecase = await new ChargerContenuCms().charger(store.interactionEnCours!.idDuContenu);
  if (articleUsecase) {
    article.value = articleUsecase;
    console.log(article);
  } else {
    await router.push("/not-found");
  }
});
</script>

<style>
.article {
  border: 1px solid rgba(0, 0, 0, 0.19);
}
</style>
