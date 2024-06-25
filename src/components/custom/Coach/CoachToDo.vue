<template>
  <div>
    <h2 class="fr-mb-0">{{ todoList.titre }}</h2>
    <div v-if="todoList.fait.length > 0">
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w">déjà fait</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.fait" :key="todo.titre" class="fr-mb-2w">
          <CoachCardDone
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :nombre-points="todo.nombreDePointsAGagner"
            :point-a-ete-recolte="todo.pointAEteRecolte"
            :element-id="todo.id"
            :on-recolter-points="onRecolterPoints"
          />
        </li>
      </ul>
    </div>
    <div v-if="todoList.aFaire.length > 0">
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w">à faire</h3>
      <ul class="list-style-none fr-p-0 fr-m-0">
        <li v-for="todo in todoList.aFaire" :key="todo.titre" class="fr-mb-2w">
          <CoachCardToDo
            :titre="todo.titre"
            :value="todo.progession.etapeCourante"
            :value-max="todo.progession.etapeTotal"
            :url="todo.url"
            :hash="todo.hash"
            :picto="todo.picto"
          />
        </li>
      </ul>
    </div>
    <div class="fr-py-1w">
      <h3 class="text--uppercase fr-mb-0 fr-text--xs text--gris-dark fr-mb-1w before--path">
        <span class="fr-icon-gift-fill" aria-hidden="true"></span>
        Bonus de fin de mission
      </h3>
      <div v-if="!isDisableBonusFinDeToDo">
        <button
          class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-gift-fill fr-text--lg background--white animation__button--shake"
          aria-controls="finDesMissions"
          data-fr-opened="false"
        >
          Découvrir le bonus
        </button>
        <Teleport to="body">
          <Modale
            label="Modale de fin de missions"
            id="finDesMissions"
            :radius="true"
            :is-footer-actions="false"
            size="m"
          >
            <template v-slot:contenu>
              <CoachFinDeMission
                @recuperer-points-todo="recupererPointsTodo"
                :nombre-de-points-a-gagner="todoList.pointFinDeMission"
                :titre-de-mission="todoList.titre"
                :titre-feature-debloquee="todoList.featureDebloquee?.titre"
                :description-feature-debloquee="todoList.featureDebloquee?.description"
              />
            </template>
          </Modale>
        </Teleport>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import CoachFinDeMission from '@/components/custom/Coach/CoachFinDeMission.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';
  import { useReveal } from '@/composables/useReveal';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { TodoListViewModel } from '@/domaines/toDoList/adapters/toDoList.presenter.impl';
  import { ToDoListRepositoryAxios } from '@/domaines/toDoList/adapters/toDoList.repository.axios';
  import { RecupererPointsToDoUsecase } from '@/domaines/toDoList/recupererPointsToDo.usecase';
  import { TerminerToDoListUsecase } from '@/domaines/toDoList/terminerToDoList.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { utilisateurStore } from '@/store/utilisateur';

  const { selectionnerReveal } = useReveal();

  const props = defineProps<{ todoList: TodoListViewModel }>();
  let modaleActions: ModaleActions | null;

  const isDisableBonusFinDeToDo = computed(() => {
    if (props.todoList.aFaire.length > 0) return true;

    const todoARecolter = props.todoList.fait.find(elem => !elem.pointAEteRecolte);
    return todoARecolter;
  });

  const recupererPointsTodo = async () => {
    const usecase = new TerminerToDoListUsecase(
      new ToDoListRepositoryAxios(),
      new SessionRepositoryStore(),
      ToDoListEventBusImpl.getInstance(),
    );
    await usecase.execute(utilisateurStore().utilisateur.id, props.todoList.featureDebloquee!.feature);
    revealFonctionnalite();
  };

  function onRecolterPoints(missionId: string) {
    new RecupererPointsToDoUsecase(new ToDoListRepositoryAxios(), ToDoListEventBusImpl.getInstance()).execute(
      utilisateurStore().utilisateur.id,
      missionId,
    );
  }

  function revealFonctionnalite() {
    modaleActions?.close();

    const tour = selectionnerReveal(props.todoList.featureDebloquee!.feature as Fonctionnalites);
    tour.start();

    // Ajout d'un écouteur pour fermer le tour lors du clic sur l'overlay
    setTimeout(() => {
      document.addEventListener(
        'click',
        function () {
          tour.cancel();
        },
        { once: true },
      );
    }, 0);
  }
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
