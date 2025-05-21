<template>
  <iframe id="mesaidesreno" :src="url" allow="clipboard-read; clipboard-write" style="width: 100%"></iframe>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { AxiosFactory } from '@/axios.factory';
  import { utilisateurStore } from '@/store/utilisateur';

  const url = ref<string>('https://mesaidesreno.beta.gouv.fr/');

  window.addEventListener('message', (event: MessageEvent) => {
    if (event.data.kind === 'mesaidesreno-resize-height') {
      const iframe = document.getElementById('mesaidesreno') as HTMLIFrameElement;
      iframe.style.height = `${event.data.value}px`;
    }
  });

  onMounted(async () => {
    const axios = AxiosFactory.getAxios();
    const data = await axios.get(`/utilisateurs/${utilisateurStore().utilisateur.id}/mes_aides_reno/get_iframe_urls`);
    url.value = data.data.iframe_url;
  });
</script>

<style scoped></style>
