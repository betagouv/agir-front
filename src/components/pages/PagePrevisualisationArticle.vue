<template>
  <PageArticleComposant :article="article" />
</template>
<script setup lang="ts">
import PageArticleComposant from "@/components/PageArticleComposant.vue";
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { ArticleCMS, ChargerContenuCms } from "@/cms/chargerContenuCms";

const router = useRouter();

const article = ref<ArticleCMS>({
  titre: "",
  texte: "",
  sousTitre: "",
});

onMounted(async () => {
  const route = useRoute();
  const articleUsecase = await new ChargerContenuCms().charger(route.params.id);
  if (articleUsecase) {
    article.value = articleUsecase;
    console.log(article);
  } else {
    await router.push("/not-found");
  }
});
</script>
<style scoped></style>
