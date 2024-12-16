<template>
  <div v-if="scoreExamen" class="fr-container fr-py-6w">
    <div class="bg-fin-mission fr-p-4w text--center border-radius--md">
      <div class="conteneur-drapeaux fr-mb-2w">
        <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
        <span class="fr-icon-flag-fill text--bleu big" aria-hidden="true" />
        <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
      </div>
      <h1 class="fr-mt-2w">
        <span class="text--uppercase">Bravo !</span><br />
        <span class="text--bleu fr-text--lead text--normal">
          Vous avez terminé le quiz<br />
          "<span class="fr-text--bold">{{ titre }}</span
          >" !
        </span>
      </h1>
      <p>
        Vous avez obtenu un score de <span class="text--bold">{{ scoreExamen.pourcentageDeReussite }}</span>
      </p>
      <p>{{ scoreExamen.phrase }}</p>
      <router-link :to="`/thematique/${useRoute().params.id}`" class="fr-btn"> Retourner à la thématique </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import { ExamenRepositoryAxios } from '@/domaines/examens/adapters/examen.repository.axios';
  import {
    ScoreExamenPresenterImpl,
    ScoreExamenViewModel,
  } from '@/domaines/examens/adapters/scoreExamen.presenter.impl';
  import { TerminerExamenUsecase } from '@/domaines/examens/terminerExamen.usecase';
  import { MissionEventBusImpl } from '@/domaines/missions/missionEventBus.impl';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ titre: string }>();

  const scoreExamen = ref<ScoreExamenViewModel>();

  const missionId = useRoute().params.missionId;

  onMounted(() => {
    terminerLaMission();
  });

  const terminerLaMission = async () => {
    const terminerExamenUsecase = new TerminerExamenUsecase(
      new ExamenRepositoryAxios(),
      MissionEventBusImpl.getInstance(),
    );
    await terminerExamenUsecase.execute(
      missionId as string,
      utilisateurStore().utilisateur.id,
      new ScoreExamenPresenterImpl(vm => (scoreExamen.value = vm)),
    );
  };
</script>

<style scoped>
  .bg-fin-mission {
    background-image: url('/bg_fin-des-missions.webp');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .conteneur-drapeaux {
    width: 100%;
    display: flex;
    align-items: flex-end;
    justify-content: center;
  }

  .fr-icon-flag-fill::before {
    --icon-size: 1.5rem;
  }

  .big::before {
    --icon-size: 3.5rem;
  }
</style>
