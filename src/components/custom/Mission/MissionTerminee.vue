<template>
  <div
    class="fr-grid-row fr-grid-row--gutters align-items--center background--white border-radius--md shadow fr-p-3w border"
  >
    <img :src="urlImage" class="border-radius--md img-object-fit-cover" width="120" height="100" alt="" />
    <h1 class="fr-col fr-h4 fr-m-0 fr-ml-1w">{{ titre }}</h1>
    <span v-if="estTerminee" class="fr-ml-md-auto fr-mt-md-0 fr-mt-2w text--semi-bold text--bleu"
      >Mission terminée</span
    >
    <button
      v-else
      class="fr-ml-md-auto fr-mt-md-0 fr-mt-2w fr-btn fr-btn--secondary"
      :disabled="!estTerminable"
      data-fr-opened="false"
      :aria-controls="modaleId"
      @click="terminerMission"
    >
      Terminer la mission
    </button>
  </div>

  <Teleport to="body" v-if="estTerminable">
    <Modale label="Modale de fin de mission" :id="modaleId" :radius="true" :is-footer-actions="false" size="s">
      <template v-slot:contenu>
        <div class="fr-grid-row fr-grid-row--gutters modale-mission-terminee">
          <div class="fr-col-7">
            <h1 :id="modaleId">Bravo !</h1>
            <p class="fr-text--lg text--bleu fr-mb-0">Vous avez gagné votre carte mission</p>
          </div>
          <MissionCarteTerminee class="fr-col-5" :titre="titre" :urlImage="urlImage" />
        </div>
        <div class="fr-py-3w text--center">
          <h2 class="fr-text--lg fr-mb-2w">Découvrez de nouvelles missions</h2>
          <router-link
            :to="`/thematique/${MenuThematiques.getThematiqueData(thematiqueId as ClefThematiqueAPI).url}`"
            class="fr-btn fr-btn--lg"
          >
            Revenir à la thémathique
          </router-link>
        </div>
      </template>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import MissionCarteTerminee from '@/components/custom/Mission/MissionCarteTerminee.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import { MissionsRepositoryAxios } from '@/domaines/missions/adapters/missions.repository.axios';
  import { TerminerMissionUsecase } from '@/domaines/missions/terminerMission.usecase';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    urlImage: string;
    titre: string;
    estTerminee: boolean;
    estTerminable: boolean;
    thematiqueId: string;
    missionId: string;
  }>();

  const estTerminee = ref<boolean>(props.estTerminee);

  const modaleId = 'terminer-mission-modale';
  const terminerMission = async () => {
    const terminerMissionUsecase = new TerminerMissionUsecase(new MissionsRepositoryAxios());
    await terminerMissionUsecase.execute(props.missionId, utilisateurStore().utilisateur.id);
    estTerminee.value = true;
  };
</script>

<style scoped>
  .modale-mission-terminee {
    padding: 1rem;
    flex-direction: row-reverse;
    background-image: url('/bg_fin-de-mission.webp');
    background-size: cover;
    background-position: center;
  }
</style>
