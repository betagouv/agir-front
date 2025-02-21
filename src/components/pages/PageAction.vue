<template>
  <div class="fr-container fr-mt-3w">
    <router-link
      :to="{ name: RouteActionsName.CATALOGUE_ACTION }"
      class="fr-btn fr-btn--icon-left fr-btn--tertiary-no-outline fr-icon-arrow-left-line fr-pl-0"
    >
      Retour
    </router-link>

    <CarteSkeleton v-if="isLoading" />
    <ActionBase v-else-if="actionBaseViewModel" :action-base-view-model="actionBaseViewModel">
      <ActionClassique v-if="actionClassiqueViewModel" :action-classique-view-model="actionClassiqueViewModel" />
      <ActionQuiz v-if="actionQuizViewModel" :action-quiz-view-model="actionQuizViewModel" />
    </ActionBase>
    <p v-else>Une erreur est survenue</p>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import ActionBase from '@/components/custom/Action/ActionBase.vue';
  import ActionClassique from '@/components/custom/Action/ActionClassique.vue';
  import ActionQuiz from '@/components/custom/Action/ActionQuiz.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import { ActionPresenterImpl } from '@/domaines/actions/adapters/action.presenter.impl';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ChargerActionUsecase } from '@/domaines/actions/chargerAction.usecase';
  import { ChargerActionClassiqueUsecase } from '@/domaines/actions/chargerActionClassique.usecase';
  import { ChargerActionQuizUsecase } from '@/domaines/actions/chargerActionQuiz.usecase';
  import { ActionClassiqueViewModel, ActionQuizzesViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteActionsName } from '@/router/actions/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(false);
  const actionClassiqueViewModel = ref<ActionClassiqueViewModel>();
  const actionQuizViewModel = ref<ActionQuizzesViewModel>();
  const actionBaseViewModel = computed(() => actionQuizViewModel.value || actionClassiqueViewModel.value);

  onMounted(() => {
    const idUtilisateur = utilisateurStore().utilisateur.id;
    const idAction = useRoute().params.id.toString();
    const typeAction = useRoute().params.type.toString();
    isLoading.value = true;

    const usecase = new ChargerActionUsecase(
      new ChargerActionClassiqueUsecase(),
      new ChargerActionQuizUsecase(),
      new ActionsRepositoryAxios(),
      new ActionPresenterImpl(
        vm => (actionClassiqueViewModel.value = vm),
        vm => (actionQuizViewModel.value = vm),
      ),
    );
    usecase.execute(idUtilisateur, idAction, typeAction).finally(() => (isLoading.value = false));
  });
</script>
