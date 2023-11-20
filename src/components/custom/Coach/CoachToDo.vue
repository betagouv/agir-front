<template>
  <div>
    <h2>Mission Agir !</h2>
    <p class="fr-text--xl">Un pas après l’autre</p>
    <div v-if="todoList.done.length > 0">
      <h3 class="todoList__title fr-mb-0 fr-text--xs text-disabled-grey">déjà fait</h3>
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
      <h3 class="todoList__title fr-mb-0 fr-text--xs text-disabled-grey">à faire</h3>
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

  const todoList: TodoListViewModel = {
    todo: [
      {
        id: 'test',
        titre: 'Réussir 1 quiz “Environnement et climat” Très Facile',
        url: 'test',
        contentId: 'test',
        progession: {
          etapeCourante: 2,
          etapeTotal: 3,
        },
        nombreDePointsAGagner: 25,
        type: 'test',
        thematique: 'quizz',
        pointAEteRecolte: false,
      },
      {
        id: 'test 2',
        titre: 'test 2',
        url: 'test 2',
        contentId: 'test 2',
        progession: {
          etapeCourante: 7,
          etapeTotal: 10,
        },
        nombreDePointsAGagner: 25,
        type: 'test 2',
        thematique: 'quizz',
        pointAEteRecolte: false,
      },
    ],
    done: [
      {
        id: 'test 2',
        titre: 'test 2',
        url: 'test 2',
        contentId: 'test 2',
        progession: {
          etapeCourante: 7,
          etapeTotal: 10,
        },
        nombreDePointsAGagner: 12,
        type: 'test 2',
        thematique: 'quizz',
        pointAEteRecolte: false,
      },

      {
        id: 'test 2',
        titre: 'test 2',
        url: 'test 2',
        contentId: 'test 2',
        progession: {
          etapeCourante: 7,
          etapeTotal: 10,
        },
        nombreDePointsAGagner: 12,
        type: 'test 2',
        thematique: 'quizz',
        pointAEteRecolte: true,
      },
    ],
  };
</script>

<style scoped>
  .todoList__title {
    text-transform: uppercase;
  }
</style>
