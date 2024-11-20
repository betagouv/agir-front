<template>
  <div class="fr-container fr-py-6w">
    <div class="bg-fin-mission fr-p-4w text--center border-radius--md">
      <div class="conteneur-drapeaux fr-mb-2w">
        <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
        <span class="fr-icon-flag-fill text--bleu big" aria-hidden="true" />
        <span class="fr-icon-flag-fill text--bleu" aria-hidden="true" />
      </div>
      <h1 class="fr-mt-2w">
        <span class="text--uppercase">Bravo !</span><br />
        <span class="text--bleu fr-text--lead text--normal">
          Vous avez terminé la mission<br />
          "<span class="fr-text--bold">{{ titre }}</span
          >" !
        </span>
      </h1>
      <router-link @click="terminerLaMission" :to="`/thematique/${useRoute().params.id}`" class="fr-btn"
        >Retourner à la liste des missions</router-link
      >
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { TerminerMissionUsecase } from '@/domaines/missions/terminerMission.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ titre: string }>();

  const missionId = useRoute().params.missionId;

  const terminerLaMission = async () => {
    const terminerMissionUsecase = new TerminerMissionUsecase(new MissionsRepositoryAxios());
    await terminerMissionUsecase.execute(missionId as string, utilisateurStore().utilisateur.id);
  };
</script>

<style scoped>
  .bg-fin-mission {
    background-image: url('/bg_fin-des-missions.webp');
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
