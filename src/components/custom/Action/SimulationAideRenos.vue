<template>
  <iframe
    v-if="iframe_href !== null"
    ref="iframe_ref"
    id="mesaidesreno-iframe"
    :src="iframe_href"
    allow="clipboard-read; clipboard-write"
    style="width: 100%"
  ></iframe>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watchEffect } from 'vue';
  import { AxiosFactory } from '@/axios.factory';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { SimulateursSupportes } from '@/shell/simulateursSupportes';
  import { utilisateurStore } from '@/store/utilisateur';

  const iframe_href = ref<string | null>(null);
  const iframe_ref = ref<HTMLIFrameElement | null>(null);
  const situation = ref<object | null>(null);
  const axios = AxiosFactory.getAxios();

  window.addEventListener('message', (event: MessageEvent) => {
    switch (event.data.kind) {
      case 'mesaidesreno-resize-height': {
        if (iframe_ref.value && event.data.value) {
          iframe_ref.value.style.height = `${event.data.value}px`;
        }
        break;
      }
      case 'mesaidesreno-eligibility-done':
        situation.value = event.data.situation;
        break;
    }
  });

  onMounted(async () => {
    const res = await axios.get(`/utilisateurs/${utilisateurStore().utilisateur.id}/mes_aides_reno/get_iframe_urls`);
    iframe_href.value = res.data.iframe_url;
  });

  watchEffect(async () => {
    if (situation.value) {
      await onEligiliteAtteinte(situation.value);
      situation.value = null; // Reset situation after processing
    }
  });

  const onEligiliteAtteinte = async (situation: object) => {
    await axios.post(`/utilisateurs/${utilisateurStore().utilisateur.id}/mes_aides_reno/nouvelle_situation`, {
      situation,
    });

    const terminerActionUsecase = new TerminerActionUsecase(
      new ActionsRepositoryAxios(),
      ActionsEventBus.getInstance(),
    );
    await terminerActionUsecase.execute(
      utilisateurStore().utilisateur.id,
      SimulateursSupportes.MES_AIDES_RENO,
      TypeAction.SIMULATEUR,
    );
  };
</script>

<style scoped></style>
