<template>
  <div>
    <h1>{{ contenuDeLaPage?.titre }}</h1>
    <div class="cms__content" v-html="contenuDeLaPage?.texte"></div>
  </div>
</template>
<script setup lang="ts">
  import {
    PageConformite,
    PageConformiteType,
    RecupererPageConformiteUsecase,
  } from '@/conformites/recupererPageConformite.usecase';
  import { onMounted, ref } from 'vue';
  import { ConformiteRepositoryCms } from '@/conformites/adapters/conformite.repository.cms';

  const props = defineProps<{ type: PageConformiteType }>();
  const contenuDeLaPage = ref<PageConformite | null>();

  onMounted(async () => {
    const usecase = new RecupererPageConformiteUsecase(new ConformiteRepositoryCms());
    contenuDeLaPage.value = await usecase.execute(props.type);
  });
</script>
<style scoped></style>
