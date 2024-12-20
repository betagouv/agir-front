<template>
  <div class="fr-container fr-py-6w">
    <h1>{{ contenuDeLaPage?.titre }}</h1>
    <div class="cms__content" v-html="contenuDeLaPage?.texte"></div>
  </div>
</template>
<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/table/table.min.css';
  import { onMounted, ref } from 'vue';
  import { ConformiteRepositoryAxios } from '@/domaines/conformites/adapters/conformite.repository.axios';
  import {
    PageConformite,
    PageConformiteType,
    RecupererPageConformiteUsecase,
  } from '@/domaines/conformites/recupererPageConformite.usecase';

  const props = defineProps<{ type: PageConformiteType }>();
  const contenuDeLaPage = ref<PageConformite | null>();

  onMounted(async () => {
    const usecase = new RecupererPageConformiteUsecase(new ConformiteRepositoryAxios());
    contenuDeLaPage.value = await usecase.execute(props.type);
  });
</script>
<style scoped></style>
