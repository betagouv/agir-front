<template>
  <div class="fr-container fr-mt-3w">
    <BoutonRetour />

    <CarteSkeleton v-if="isLoading" />
    <ActionBase v-else-if="actionBaseViewModel" :action-base-view-model="actionBaseViewModel">
      <template #contenu>
        <ActionClassique v-if="actionClassiqueViewModel" :action-classique-view-model="actionClassiqueViewModel" />
        <ActionQuiz v-if="actionQuizViewModel" :action-quiz-view-model="actionQuizViewModel" />
        <ActionSimulateur v-if="actionSimulateurViewModel" :action-simulateur-view-model="actionSimulateurViewModel" />
        <ActionBilan v-if="actionBilanViewModel" :action-bilan-view-model="actionBilanViewModel" />
      </template>

      <template #aside>
        <ActionAsideClassique v-if="actionClassiqueViewModel" :action-base-view-model="actionBaseViewModel" />
        <ActionAsideQuiz v-if="actionQuizViewModel" :action-base-view-model="actionBaseViewModel" />
        <ActionAsideSimulateur v-if="actionSimulateurViewModel" :action-base-view-model="actionBaseViewModel" />
        <ActionAsideBilan v-if="actionBilanViewModel" :action-base-view-model="actionBaseViewModel" />
      </template>
    </ActionBase>
    <p v-else>Une erreur est survenue</p>
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ActionBase from '@/components/custom/Action/ActionBase.vue';
  import ActionBilan from '@/components/custom/Action/ActionBilan.vue';
  import ActionClassique from '@/components/custom/Action/ActionClassique.vue';
  import ActionQuiz from '@/components/custom/Action/ActionQuiz.vue';
  import ActionSimulateur from '@/components/custom/Action/ActionSimulateur.vue';
  import ActionAsideBilan from '@/components/custom/Action/Aside/ActionAsideBilan.vue';
  import ActionAsideClassique from '@/components/custom/Action/Aside/ActionAsideClassique.vue';
  import ActionAsideQuiz from '@/components/custom/Action/Aside/ActionAsideQuiz.vue';
  import ActionAsideSimulateur from '@/components/custom/Action/Aside/ActionAsideSimulateur.vue';
  import BoutonRetour from '@/components/custom/BoutonRetour.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ChargerActionStrategyFactory, ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
  import { ChargerActionBilanUsecase } from '@/domaines/actions/chargerActionBilan.usecase';
  import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
  import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
  import { ChargerActionSimulateurUsecase } from '@/domaines/actions/chargerActionSimulateur.usecase';
  import {
    ActionBilanViewModel,
    ActionClassiqueViewModel,
    ActionQuizzesViewModel,
    ActionSimulateurViewModel,
  } from '@/domaines/actions/ports/action.presenter';
  import useHeadProperties from '@/shell/useHeadProperties';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(false);
  const actionClassiqueViewModel = ref<ActionClassiqueViewModel>();
  const actionQuizViewModel = ref<ActionQuizzesViewModel>();
  const actionSimulateurViewModel = ref<ActionSimulateurViewModel>();
  const actionBilanViewModel = ref<ActionBilanViewModel>();
  const actionBaseViewModel = computed(
    () =>
      actionQuizViewModel.value ||
      actionClassiqueViewModel.value ||
      actionSimulateurViewModel.value ||
      actionBilanViewModel.value,
  );

  useHead({
    ...useHeadProperties,
    title: computed(() => actionBaseViewModel.value?.titrePropre && `${actionBaseViewModel.value.titrePropre}`),
  });

  onMounted(async () => {
    const idUtilisateur = utilisateurStore().utilisateur.id;
    const idAction = useRoute().params.id.toString();
    const typeAction = useRoute().params.type.toString();
    isLoading.value = true;

    const usecase = new ChargerActionUsecase(
      new ChargerActionStrategyFactory(
        new ChargerActionClassiqueUsecase(),
        new ChargerActionQuizUsecase(),
        new ChargerActionSimulateurUsecase(),
        new ChargerActionBilanUsecase(),
      ),
      new ActionsRepositoryAxios(),
      new ActionPresenterImpl(
        vm => (actionClassiqueViewModel.value = vm),
        vm => (actionQuizViewModel.value = vm),
        vm => (actionSimulateurViewModel.value = vm),
        vm => (actionBilanViewModel.value = vm),
      ),
    );
    await usecase.execute(idUtilisateur, idAction, typeAction).finally(() => (isLoading.value = false));
  });
</script>
