<template>
  <div>
    <h2 class="fr-mb-0">{{ todoList.titre }}</h2>
    <div v-if="todoList.fait.length > 0">
      <p class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w fr-text--bold">déjà fait</p>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.fait" :key="todo.titre" class="fr-mb-2w">
          <CoachCardDone
            :titre="todo.titre"
            :value="todo.progression.etapeCourante"
            :nombre-points="todo.nombreDePointsAGagner"
            :point-a-ete-recolte="todo.pointAEteRecolte"
            :element-id="todo.id"
            :url="todo.url"
            :hash="todo.hash"
            :on-recolter-points="onRecolterPoints"
          />
        </li>
      </ul>
    </div>
    <div v-if="todoList.aFaire.length > 0">
      <p class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-text--bold fr-mb-1w">à faire</p>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.aFaire" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :titre="todo.titre"
            :value="todo.progression.etapeCourante"
            :value-max="todo.progression.etapeTotal"
            :url="todo.url"
            :hash="todo.hash!"
            :picto="todo.picto"
          />
        </li>
      </ul>
    </div>
    <div class="fr-py-1w">
      <h3 class="fr-mb-2w fr-text--md text--gris-dark before--path">
        <button class="fr-text--bold" type="button" aria-describedby="tooltip-feature-debloquee">
          <span class="fr-icon-gift-fill" aria-hidden="true"></span>
          {{ todoList.featureDebloquee?.titre }}
        </button>
      </h3>
      <span class="fr-tooltip fr-placement" id="tooltip-feature-debloquee" role="tooltip" aria-hidden="true">
        Pensez à récolter vos points
      </span>
      <router-link
        v-if="!isDisableBonusFinDeToDo"
        :to="{ name: todoList.featureDebloquee?.url }"
        class="fr-btn fr-btn--lg"
        @click="onDecouvrirFeature"
      >
        Découvrir
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/tooltip/tooltip.min.css';
  import { computed } from 'vue';
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { TodoListViewModel } from '@/domaines/toDoList/adapters/toDoList.presenter.impl';
  import { ToDoListRepositoryAxios } from '@/domaines/toDoList/adapters/toDoList.repository.axios';
  import { RecupererPointsToDoUsecase } from '@/domaines/toDoList/recupererPointsToDo.usecase';
  import { TerminerToDoListUsecase } from '@/domaines/toDoList/terminerToDoList.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ todoList: TodoListViewModel }>();

  const isDisableBonusFinDeToDo = computed(() => {
    if (props.todoList.aFaire.length > 0) return true;

    const todoARecolter = props.todoList.fait.find(elem => !elem.pointAEteRecolte);
    return todoARecolter;
  });

  const onRecolterPoints = async (missionId: string): Promise<void> => {
    const usecase = new RecupererPointsToDoUsecase(new ToDoListRepositoryAxios(), ToDoListEventBusImpl.getInstance());
    await usecase.execute(utilisateurStore().utilisateur.id, missionId);
  };

  const onDecouvrirFeature = async (): Promise<void> => {
    const usecase = new TerminerToDoListUsecase(
      new ToDoListRepositoryAxios(),
      new SessionRepositoryStore(),
      ToDoListEventBusImpl.getInstance(),
    );
    await usecase.execute(utilisateurStore().utilisateur.id, props.todoList.featureDebloquee!.id);
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
