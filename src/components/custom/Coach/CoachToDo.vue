<template>
  <div>
    <h2 class="fr-mb-0">Vos missions</h2>
    <p class="fr-text--xl">Un pas après l’autre</p>
    <div v-if="todoList.done.length > 0">
      <h3 class="todoList__title fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">déjà fait</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.done" :key="todo.titre" class="fr-mb-2w">
          <CoachCardDone
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :nombre-points="todo.nombreDePointsAGagner"
            :point-a-ete-recolte="todo.pointAEteRecolte"
          />
        </li>
      </ul>
    </div>
    <div v-if="todoList.todo.length > 0">
      <h3 class="todoList__title fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">à faire</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.todo" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :value-max="todo.progession.etapeTotal"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';

  defineProps<{ todoList: TodoListViewModel }>();

  interface TodoViewModel {
    id: string;
    titre: string;
    url: string;
    contentId: string;
    progession: {
      etapeCourante: number;
      etapeTotal: number;
    };
    nombreDePointsAGagner: number;
    type: string;
    thematique: string;
    pointAEteRecolte: boolean;
  }

  interface TodoListViewModel {
    todo: TodoViewModel[];
    done: TodoViewModel[];
  }
</script>

<style scoped>
  .todoList__title {
    text-transform: uppercase;
  }
</style>
