<template>
  <PageArticleComposant :article="article">
    <BilanNosGestesClimat :get-impact-value="store.valeurBilanCarbone" />
  </PageArticleComposant>
</template>
<script setup lang="ts">
import PageArticleComposant from "@/components/PageArticleComposant.vue";
import { utilisateurStore } from "@/store/utilisateur";
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ArticleCMS, ChargerContenuCms } from "@/cms/chargerContenuCms";
import BilanNosGestesClimat from "@/components/BilanNosGestesClimat.vue";

const store = utilisateurStore();
const router = useRouter();

const article = ref<ArticleCMS>({
  titre: "",
  texte: "",
  sousTitre: "",
});

onMounted(async () => {
  const articleUsecase = await new ChargerContenuCms().charger(store.interactionEnCours!.idDuContenu);
  if (articleUsecase) {
    article.value = articleUsecase;
  } else {
    await router.push("/not-found");
  }
});
</script>
