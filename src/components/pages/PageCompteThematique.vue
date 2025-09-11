<template>
  <CompteSkeleton page-courante="Mon Compte - Mes réponses">
    <h1 class="fr-h2" v-text="thematique.labelDansLeMenu" />

    <CompteLogement v-if="thematiqueId === ClefThematiqueAPI.logement" :clefThematique="thematiqueId" />

    <!--    <template v-if="questionsViewModel.length > 0">-->
    <!--      <div class="fr-grid-row fr-grid-row&#45;&#45;gutters">-->
    <!--        <div class="fr-col-md-6 fr-col-12" v-for="questionViewModel in questionsViewModel" :key="questionViewModel.id">-->
    <!--          <ReponseCarte :question="questionViewModel" />-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </template>-->
    <!--    <p v-else>Vous n'avez pas encore répondu à nos questions pour mieux vous connaître.</p>-->
  </CompteSkeleton>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import CompteLogement from '@/components/custom/Compte/CompteLogement.vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  // import ReponseCarte from '@/components/custom/Compte/ReponseCarte.vue';
  // import { ListeQuestionsDansLeComptePresenter } from '@/domaines/kyc/adapters/listeQuestionsDansLeCompte.presenter';
  // import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  // import { QuestionDansLeCompteViewModel } from '@/domaines/kyc/ports/listeQuestions.presenter';
  // import { RecupererListeQuestionsReponduesUsecase } from '@/domaines/kyc/recupererListeQuestionsRepondues.usecase';
  import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import useHeadProperties from '@/shell/useHeadProperties';
  // import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(route.params.thematiqueId as string));
  const thematiqueId = ref<ClefThematiqueAPI>(thematique.value.clefTechniqueAPI as ClefThematiqueAPI);

  useHead({
    ...useHeadProperties,
    title: computed(() => thematique.value && `Mes réponses: ${thematique.value.labelDansLeMenu}`),
  });

  // const questionsViewModel = ref<QuestionDansLeCompteViewModel[]>([]);
  //
  // new RecupererListeQuestionsReponduesUsecase(new QuestionRepositoryAxios()).execute(
  //   utilisateurStore().utilisateur.id,
  //   new ListeQuestionsDansLeComptePresenter(questions => {
  //     questionsViewModel.value = questions;
  //   }),
  // );
</script>
