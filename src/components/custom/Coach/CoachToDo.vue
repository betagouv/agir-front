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
    <div>
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text-disabled-grey fr-mb-1w">Bonus débolqué !</h3>
      <button
        class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-gift-fill fr-text--lg border-radius--md background--white"
        :disabled="isDisableBonusFinDeToDo()"
        @click="showBonus"
      >
        Découvrir le bonus
      </button>
    </div>
  </div>
  <div
    v-else
    class="fr-grid-row fr-grid-row--center fr-grid-row--middle fr-grid-row--gutters background--white fr-py-10w border-radius--lg"
  >
    <span class="fr-h1 fr-mb-0">🎉</span>
    <span class="fr-h4 fr-mb-0 fr-px-4w">Bonus !</span>
    <button class="fr-btn fr-btn--secondary fr-text--md" @click="recupererPointsTodo">
      Récolter vos 20 <img src="/ic_score.svg" alt="points" width="16" class="fr-ml-1v" />
    </button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import { TodoListViewModel } from '@/toDoList/adapters/toDoList.presenter.impl';
  import { TerminerToDoListUsecase } from '@/toDoList/terminerToDoList.usecase';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ToDoListRepositoryAxios } from '@/toDoList/adapters/toDoList.repository.axios';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const props = defineProps<{ todoList: TodoListViewModel }>();

  const bonusFinalRecupere = ref(false);

  const showBonus = () => {
    bonusFinalRecupere.value = true;
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
