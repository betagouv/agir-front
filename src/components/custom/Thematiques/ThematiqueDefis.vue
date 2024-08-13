<template>
  <ul class="fr-grid fr-grid-row fr-grid-row--gutters list-style-none">
    <li v-for="defi in defis" :key="defi.id" class="fr-col-4">
      <MissionCarteBloquee v-if="defi.estBloquee" :picto-mission="defi.picto" />
      <DefiCarte
        v-else
        :id="defi.id"
        :titre="defi.titre"
        :est-en-cours="defi.estEnCours"
        :est-recommande="defi.estRecommande"
        :points="defi.points"
        :url="defi.url"
        :a-ete-realise="defi.aEteRealisee"
        :point-a-ete-recolte="defi.pointAEteRecolte"
        :on-recolter-points="onRecolterPoints"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
  import DefiCarte from '@/components/custom/Defi/DefiCarte.vue';
  import MissionCarteBloquee from '@/components/custom/Mission/MissionCarteBloquee.vue';
  import { MissionItemViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';
  import { ThematiqueRepositoryAxios } from '@/domaines/thematiques/adapters/thematique.repository.axios';
  import { RecupererPointsMissionThematiqueUsecase } from '@/domaines/thematiques/recupererPointsMissionThematique.usecase';
  import { ThematiqueEventBusImpl } from '@/domaines/thematiques/thematiqueEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{ defis: MissionItemViewModel[] }>();

  function onRecolterPoints(missionId: string) {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    new RecupererPointsMissionThematiqueUsecase(
      new ThematiqueRepositoryAxios(),
      ThematiqueEventBusImpl.getInstance(),
    ).execute(utilisateurId, missionId);
  }
</script>
