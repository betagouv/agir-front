<template>
  <div class="todo background--white fr-p-2w shadow">
    <span class="fr-icon-checkbox-circle-line todo__picto text--success" aria-hidden="true"></span>
    <div class="fr-col fr-col-md-7">
      <h3 class="fr-text--bold fr-text--lg text--success fr-mb-0 display-block">
        <router-link :to="{ path: url, hash: hash }" class="background--none fr-mb-0">
          <span v-html="titre" />
        </router-link>
      </h3>
    </div>
    <div class="todo__boutonContainer fr-ml-auto">
      <span v-if="!pointAEteRecolte" class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-text--bold">
        Objectif réalisé
      </span>
      <button
        class="fr-btn fr-btn--secondary fr-text--md todo__bouton"
        @click="recolterPoints"
        :disabled="pointAEteRecolte"
      >
        <span class="fr-hidden fr-unhidden-md"> Récolter vos </span> &nbsp;{{ nombrePoints }}
        <img src="/ic_score.svg" alt="points" width="16" class="fr-ml-1v" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  const props = defineProps<{
    titre: string;
    value?: number;
    url: string;
    hash?: string;
    nombrePoints: number;
    pointAEteRecolte: boolean;
    elementId: string;
    onRecolterPoints: (missionId: string) => void;
  }>();

  const recolterPoints = () => {
    props.onRecolterPoints(props.elementId);
  };
</script>

<style scoped>
  .todo {
    position: relative;
    display: flex;
    gap: 1rem;
    align-items: center;
    border-radius: 8px;
  }

  .todo__picto::before {
    --icon-size: 2rem;
  }

  .todo__boutonContainer {
    display: grid;
    text-align: center;
  }

  .todo__bouton:not([disabled]) {
    animation: shake 3s cubic-bezier(0.455, 0.03, 0.515, 0.955) infinite both;
  }

  @keyframes shake {
    0%,
    60% {
      transform: rotate(0deg);
      transform-origin: 50% 100%;
    }
    5% {
      transform: rotate(1deg);
    }
    10%,
    20%,
    30% {
      transform: rotate(-2deg);
    }
    15%,
    25%,
    35% {
      transform: rotate(2deg);
    }
    50% {
      transform: rotate(-2deg);
    }
    60% {
      transform: rotate(1deg);
    }
  }
</style>
