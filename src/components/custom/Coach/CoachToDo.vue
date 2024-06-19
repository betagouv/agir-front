<template>
  <div>
    <div v-if="!bonusFinalRecupere">
      <h2 class="fr-mb-0">{{ todoList.titre }}</h2>
      <p class="fr-text--xl">Un objectif après l’autre</p>
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
        <div v-if="!isDisableBonusFinDeToDo()">
          <button
            class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-gift-fill fr-text--lg background--white"
            @click="showBonus"
          >
            Découvrir le bonus
          </button>
        </div>
      </div>
    </div>
    <div v-else>coucou</div>
    <!-- <CoachFinDeMission
      v-else
      @recuperer-points-todo="recupererPointsTodo"
      :nombre-de-points-a-gagner="todoList.pointFinDeMission"
      :titre-de-mission="todoList.titre"
    /> -->
  </div>
  <Teleport to="body">
    <Modale label="Modale de fin de missions" id="finDesMissions2" :radius="true" :is-footer-actions="false" size="m">
      <template v-slot:contenu>
        <CoachFinDeMission
          @recuperer-points-todo="recupererPointsTodo"
          :nombre-de-points-a-gagner="todoList.pointFinDeMission"
          :titre-de-mission="todoList.titre"
        />
      </template>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="finDesMissions2">
      Modale avec zone d'action
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CoachCardDone from '@/components/custom/Coach/CoachCardDone.vue';
  import CoachCardToDo from '@/components/custom/Coach/CoachCardToDo.vue';
  import CoachFinDeMission from '@/components/custom/Coach/CoachFinDeMission.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';
  import { useReveal } from '@/composables/useReveal';
  import { TodoListViewModel } from '@/domaines/toDoList/adapters/toDoList.presenter.impl';
  import { ToDoListRepositoryAxios } from '@/domaines/toDoList/adapters/toDoList.repository.axios';
  import { RecupererPointsToDoUsecase } from '@/domaines/toDoList/recupererPointsToDo.usecase';
  import { TerminerToDoListUsecase } from '@/domaines/toDoList/terminerToDoList.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { Fonctionnalites } from '@/shell/fonctionnalitesEnum';
  import { utilisateurStore } from '@/store/utilisateur';
  import { CelebrationRepositoryAxios } from '@/domaines/celebration/adapters/celebration.repository.axios';
  import { ValiderCelebrationUsecase } from '@/domaines/celebration/validerCelebration.usecase';

  const { selectionnerReveal } = useReveal();

  const props = defineProps<{ todoList: TodoListViewModel }>();
  let modaleActions: ModaleActions | null;

  const bonusFinalRecupere = ref(false);

  const showBonus = () => {
    modaleActions = new ModaleActions('finDesMissions2');
    modaleActions.open();
    // bonusFinalRecupere.value = true;
  };

  const isDisableBonusFinDeToDo = () => {
    if (props.todoList.aFaire.length > 0) return true;
    const todoARecolter = props.todoList.fait.find(elem => !elem.pointAEteRecolte);

    if (todoARecolter) return true;

    return false;
  };

  const recupererPointsTodo = async () => {
    new TerminerToDoListUsecase(new ToDoListRepositoryAxios(), ToDoListEventBusImpl.getInstance()).execute(
      utilisateurStore().utilisateur.id,
    );
    bonusFinalRecupere.value = false;
    new ValiderCelebrationUsecase(new CelebrationRepositoryAxios()).execute(
      utilisateurStore().utilisateur.id,
      celebrationId,
    );
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

    const tour = selectionnerReveal('aides' as Fonctionnalites);
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
