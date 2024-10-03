<template>
  <div class="fr-container fr-py-6w">
    <h1>Désabonnement des e-mails de J’agis</h1>
    <p v-html="messageAAfficher"></p>
  </div>
</template>
<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { NotificationsMailsRepositoryAxios } from '@/domaines/notificationsMails/adapters/notificationsMails.repository.axios';
  import {
    SeDesabonnerDesNotificationsMailsPresenterImpl,
    SeDesabonnerDesNotificationsMailsViewModel,
  } from '@/domaines/notificationsMails/adapters/seDesabonnerDesNotificationsMails.presenter.impl';
  import { SeDesabonnerDesNotificationsMailsUsecase } from '@/domaines/notificationsMails/seDesabonnerDesNotificationsMails.usecase';

  const messageAAfficher = ref<string>('');
  onMounted(() => {
    const route = useRoute();
    const usecase = new SeDesabonnerDesNotificationsMailsUsecase(new NotificationsMailsRepositoryAxios());
    usecase.execute(
      route.query.token as string,
      new SeDesabonnerDesNotificationsMailsPresenterImpl((viewModel: SeDesabonnerDesNotificationsMailsViewModel) => {
        messageAAfficher.value = viewModel.message;
      }),
    );
  });
</script>
