<template>
  <div class="fr-container fr-py-6w">
    <h1>{{ contenuDeLaPage?.titre }}</h1>
    <div class="cms__content" v-html="contenuDeLaPage?.texte"></div>
  </div>
</template>
<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/table/table.min.css';
  import { onMounted, ref } from 'vue';
  import { ConformiteRepositoryCms } from '@/domaines/conformites/adapters/conformite.repository.cms';
  import {
    PageConformite,
    PageConformiteType,
    RecupererPageConformiteUsecase,
  } from '@/domaines/conformites/recupererPageConformite.usecase';

  const props = defineProps<{ type: PageConformiteType }>();
  const contenuDeLaPage = ref<PageConformite | null>();

  onMounted(async () => {
    const usecase = new RecupererPageConformiteUsecase(new ConformiteRepositoryCms());
    contenuDeLaPage.value = await usecase.execute(props.type);
  });
</script>
<style scoped></style>
