<template>
  <div v-if="!bonusFinalRecupere">
    <h2 class="fr-mb-0">{{ todoList.titre }}</h2>
    <p class="fr-text--xl">Un pas après l’autre</p>
    <div v-if="todoList.fait.length > 0">
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">déjà fait</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.fait" :key="todo.titre" class="fr-mb-2w">
          <CoachCardDone
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :nombre-points="todo.nombreDePointsAGagner"
            :point-a-ete-recolte="todo.pointAEteRecolte"
            :element-id="todo.id"
          />
        </li>
      </ul>
    </div>
    <div v-if="todoList.aFaire.length > 0">
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">à faire</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.aFaire" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :interactionId="todo.interactionId"
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
    <div class="fr-py-1w">
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w before--path">
        <span class="fr-icon-gift-fill" aria-hidden="true"></span>
        Bonus de fin de mission
      </h3>
      <div v-if="!isDisableBonusFinDeToDo()">
        <button
          class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-gift-fill fr-text--lg background--white"
          @click="showBonus"
        >
          Découvrir le bonus
        </button>
        <div id="container-survey"></div>
      </div>
    </div>
  </div>
  <CoachFinDeMission
    v-else
    @recuperer-points-todo="recupererPointsTodo"
    :nombre-de-points-a-gagner="todoList.pointFinDeMission"
    :titre-de-mission="todoList.titre"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import CoachFinDeMission from '@/components/custom/Coach/CoachFinDeMission.vue';
  import { TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';
  import { TerminerToDoListUsecase } from '@/toDoList/terminerToDoList.usecase';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ToDoListRepositoryAxios } from '@/toDoList/adapters/toDoList.repository.axios';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import {publierEvenementHotjar, HotjarEvenement} from '@/shell/publierEvenementHotjar';

  const props = defineProps<{ todoList: TodoListViewModel }>();

  const bonusFinalRecupere = ref(false);

  const showBonus = () => {
    bonusFinalRecupere.value = true;
    if(props.todoList && props.todoList.derniere){
      publierEvenementHotjar(HotjarEvenement.DEBRIEF)
    }
  };

  const isDisableBonusFinDeToDo = () => {
    if (props.todoList.aFaire.length > 0) return true;
    const todoARecolter = props.todoList.fait.find(elem => !elem.pointAEteRecolte);

    if (todoARecolter) return true;

    return false;
  };

  const recupererPointsTodo = async () => {
    const utilisateurId = utilisateurStore().utilisateur.id;
    new TerminerToDoListUsecase(new ToDoListRepositoryAxios(), ToDoListEventBusImpl.getInstance()).execute(
      utilisateurId
    );
    bonusFinalRecupere.value = false;
  };
</script>

<style scoped>
  .before--path {
    position: relative;
  }

  .before--path::before {
    content: '';
    position: absolute;
    top: -22px;
    left: 10px;
    display: block;
    width: 0;
    height: 20px;
    border: 1px dashed var(--text-disabled-grey);
  }
</style>
