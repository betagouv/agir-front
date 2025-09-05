<template>
  <section class="fr-mb-4w fr-p-2w background--white shadow">
    <template v-if="!estConnecte">
      <ContenuNonConnecteFallback contenu="quiz" />
    </template>

    <template v-else>
      <template v-if="indexQuestionActuelle < actionQuizViewModel.quizzes.length">
        <Navigation
          ref="navigationRef"
          :etape-actuelle="indexQuestionActuelle + 1"
          :etape-totale="actionQuizViewModel.quizzes.length"
          :on-click-revenir-etape-precedente="retournerQuestionPrecedente"
        />
        <ActionQuizComposant
          v-if="quizActuel"
          :key="indexQuestionActuelle"
          :article="quizActuel.articleAssocie ?? undefined"
          :est-derniere-question="indexQuestionActuelle + 1 === actionQuizViewModel?.quizzes.length"
          :on-click-continuer="passerQuestionSuivante"
          :question="quizActuel.question"
          :quiz-id="quizActuel.id"
        />
      </template>
      <ActionQuizTerminee
        v-else
        :felicitations="actionQuizViewModel.quizzFelicitations"
        :titre="actionQuizViewModel.titre"
      />
    </template>
  </section>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import ActionQuizComposant from '@/components/custom/Action/composants/ActionQuizComposant.vue';
  import ActionQuizTerminee from '@/components/custom/Action/composants/ActionQuizTerminee.vue';
  import ContenuNonConnecteFallback from '@/components/custom/Action/ContenuNonConnecteFallback.vue';
  import Navigation from '@/components/custom/Navigation.vue';
  import { ActionQuizViewModel, ActionQuizzesViewModel } from '@/domaines/actions/ports/action.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const estConnecte = utilisateurStore().estConnecte;
  const navigationRef = ref<InstanceType<typeof Navigation>>();
  const props = defineProps<{ actionQuizViewModel: ActionQuizzesViewModel }>();

  const indexQuestionActuelle = ref<number>(0);
  const quizActuel = computed<ActionQuizViewModel>(
    () => props.actionQuizViewModel.quizzes[indexQuestionActuelle.value],
  );

  const retournerQuestionPrecedente = () => {
    if (indexQuestionActuelle.value > 0) {
      indexQuestionActuelle.value--;
      navigationRef.value?.focus();
    }
  };

  const passerQuestionSuivante = () => {
    if (indexQuestionActuelle.value < props.actionQuizViewModel.quizzes.length) {
      indexQuestionActuelle.value++;
      navigationRef.value?.focus();
    }
  };
</script>
