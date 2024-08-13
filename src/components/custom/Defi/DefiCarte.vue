<template>
  <div
    class="defi full-height position--relative border-radius--md background--white shadow fr-p-3w border"
    :class="estEnCours ? 'border--green-light' : estRecommande && !aEteRealise ? 'border--bleu-info-dark' : ''"
  >
    <span v-if="estEnCours" class="item__badge fr-badge background--green-light text--black text--transform-none">
      En cours !
    </span>
    <span
      v-else-if="estRecommande && !aEteRealise"
      class="item__badge fr-badge background--bleu-info-dark text--white text--transform-none"
    >
      Recommandé pour vous !
    </span>
    <h3 class="text--normal fr-text--lg">{{ titre }}</h3>
    <router-link
      v-if="!aEteRealise"
      :to="{ path: url }"
      :class="`${estEnCours ? 'fr-btn--secondary' : ''} fr-btn`"
      :title="`Aller à l'action : ${titre}`"
    >
      Aller à l'action
    </router-link>
    <button
      v-else
      class="fr-btn fr-btn--secondary fr-text--md todo__bouton"
      :disabled="pointAEteRecolte"
      @click="recolterPoints"
    >
      <span class="fr-hidden fr-unhidden-md"> Récolter vos </span> &nbsp;{{ points }}
      <img src="/ic_score.svg" alt="points" width="16" class="fr-ml-1v" />
    </button>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    id: string;
    titre: string;
    url: string;
    estRecommande?: boolean;
    estEnCours?: boolean;
    aEteRealise: boolean;
    points?: number;
    pointAEteRecolte: boolean;
    onRecolterPoints: (missionId: string) => void;
  }>();

  const recolterPoints = () => {
    props.onRecolterPoints(props.id);
  };
</script>

<style scoped>
  .defi {
    display: flex;
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
