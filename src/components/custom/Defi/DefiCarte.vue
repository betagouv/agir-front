<template>
  <div :class="`defi full-height border-radius--md background--white shadow fr-p-3w border ${defi.couleurBordure}`">
    <span v-if="defi.badge" :class="`item__badge fr-badge text--transform-none ${defi.badge.style}`">
      {{ defi.badge.label }}
    </span>
    <h3 class="text--normal fr-text--lg">{{ defi.titre }}</h3>
    <router-link
      v-if="defi.link"
      :to="{ path: defi.url }"
      :class="`fr-btn ${defi.link.style}`"
      :title="defi.link.title"
    >
      {{ defi.link.label }}
    </router-link>
    <button
      v-if="defi.aEteRealisee"
      class="fr-btn fr-btn--secondary fr-text--md todo__bouton"
      :disabled="defi.pointAEteRecolte"
      @click="recolterPoints"
    >
      <span class="fr-hidden fr-unhidden-md"> Récolter vos </span> &nbsp;{{ defi.points }}
      <img src="/ic_score.svg" alt="points" width="16" class="fr-ml-1v" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { MissionDefiViewModel } from '@/domaines/thematiques/adapters/missionThematique.presenter.impl';

  const props = defineProps<{
    defi: MissionDefiViewModel;
    onRecolterPoints: (missionId: string) => void;
  }>();

  const recolterPoints = () => {
    props.onRecolterPoints(props.defi.id);
  };
</script>

<style scoped>
  .defi {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .item__badge {
    position: absolute;
    width: max-content;
    top: 0;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
</style>
