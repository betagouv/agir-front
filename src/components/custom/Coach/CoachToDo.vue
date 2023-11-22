<template>
  <div>
    <h2 class="fr-mb-0">Vos missions</h2>
    <p class="fr-text--xl">Un pas après l’autre</p>
    <div v-if="todoList.fait.length > 0">
      <h3 class="todoList__title fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">déjà fait</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.fait" :key="todo.titre" class="fr-mb-2w">
          <CoachCardDone
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :nombre-points="todo.nombreDePointsAGagner"
            :point-a-ete-recolte="todo.pointAEteRecolte"
          />
        </li>
      </ul>
    </div>
    <div v-if="todoList.aFaire.length > 0">
      <h3 class="todoList__title fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">à faire</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.aFaire" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :id="todo.id"
            :id-du-contenu="todo.contentId"
            :type="todo.type"
            :nombre-de-points-a-gagner="todo.nombreDePointsAGagner"
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :value-max="todo.progession.etapeTotal"
            :url="todo.url"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import { TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';

  defineProps<{ todoList: TodoListViewModel }>();
</script>

<style scoped>
  .todoList__title {
    text-transform: uppercase;
  }
</style>
