<template>
  <div class="todo background--white fr-p-2w">
    <span class="fr-icon-checkbox-circle-line todo__picto text--success" aria-hidden="true"></span>
    <div class="fr-col fr-col-md-7">
      <h4 class="fr-text--bold fr-text--lg text--success fr-mb-0 display-block">{{ titre }}</h4>
      <div class="fr-col-6">
        <CoachCardTodoProgression
          :value="value"
          :value-max="value"
          label="Barre de progression: tâche terminé"
          couleur="#18753C"
        />
      </div>
    </div>
    <div class="todo__boutonContainer fr-ml-auto">
      <span v-if="!pointAEteRecolte" class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-text--bold"
        >Objectif réalisé</span
      >
      <button
        class="fr-btn fr-btn--secondary fr-text--md todo__bouton"
        @click="recupererPointsTodo"
        :disabled="pointAEteRecolte"
      >
        Récolter vos {{ nombrePoints }} <img src="/ic_score.svg" alt="points" width="16" class="fr-ml-1v" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CoachCardTodoProgression from '@/components/custom/Coach/CoachCardTodoProgression.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ToDoListRepositoryAxios } from '@/toDoList/adapters/toDoList.repository.axios';
  import { RecupererPointsToDoUsecase } from '@/toDoList/recupererPointsToDo.usecase';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const props = defineProps<{
    titre: string;
    value: number;
    nombrePoints: number;
    pointAEteRecolte: boolean;
    elementId: string;
  }>();

  const recupererPointsTodo = async () => {
    const utilisateurId: string = utilisateurStore().utilisateur.id;
    new RecupererPointsToDoUsecase(new ToDoListRepositoryAxios(), ToDoListEventBusImpl.getInstance()).execute(
      utilisateurId,
      props.elementId,
    );
  };
</script>

<style scoped>
  .todo {
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
