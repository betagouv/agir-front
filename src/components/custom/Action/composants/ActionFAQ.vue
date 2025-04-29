<template>
  <section v-if="questionsFaq?.length > 0" class="fr-p-2w fr-mt-2w">
    <h2>On répond à vos <span class="fr-text--bold"> questions ! </span></h2>
    <div class="fr-accordions-group">
      <Accordeon v-for="faq in questionsFaq" :key="faq.question" :name-id="faq.question">
        <template #titre>{{ faq.question }}</template>
        <template #contenu>
          <p v-html="faq.reponse"></p>
        </template>
      </Accordeon>
    </div>
    <div>
      <p>
        <button class="fr-link text--underline fr-p-0 fr-mt-2w" @click.prevent="questionEtat = QuestionEtat.OUVERTE">
          Posez votre question
        </button>
        , notre équipe vous répond&nbsp;!
      </p>

      <div v-if="questionEtat === QuestionEtat.OUVERTE" class="background--main fr-py-3w fr-px-2w fr-mt-2w">
        <div class="fr-grid-row fr-grid-row--gutters">
          <form class="fr-col-12 fr-col-md-9" @submit.prevent="envoyerReponse">
            <h3 id="question-label" class="fr-h4">Posez une question</h3>

            <p id="question-description">
              Une question ou une difficulté pour réaliser cette action&nbsp;?
              <br aria-hidden="true" />
              Notre équipe vous répondra par email&nbsp;!
            </p>

            <textarea
              id="textarea"
              v-model="question"
              aria-describedby="question-description"
              aria-labelledby="question-label"
              class="fr-input fr-mb-3w"
              maxlength="500"
              name="textarea"
            />

            <button class="fr-btn fr-btn--secondary fr-btn--icon-right fr-icon-arrow-right-s-line">Envoyer</button>
          </form>
          <div class="fr-col-md-3 fr-hidden fr-unhidden-md">
            <img alt="" class="full-width" src="/ic_faq.svg" />
          </div>
        </div>
      </div>

      <Alert
        v-if="questionEtat === QuestionEtat.ENVOYEE"
        :on-close="() => (questionEtat = QuestionEtat.PAS_OUVERTE)"
        message="Notre équipe en prendra connaissance très prochainement."
        titre="Merci pour votre retour !"
        type="success"
      />

      <Alert
        v-if="questionEtat === QuestionEtat.ERREUR"
        :message="erreur"
        :on-close="() => (questionEtat = QuestionEtat.OUVERTE)"
        titre="Une erreur est survenue"
        type="error"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { ActionFAQ, TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { FaqRepositoryAxios } from '@/domaines/faq/adapters/faq.repository.axios';
  import { EnvoyerQuestionFAQUsecase } from '@/domaines/faq/envoyerQuestionFAQ.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    questionsFaq: ActionFAQ[];
    actionId: string;
  }>();

  enum QuestionEtat {
    PAS_OUVERTE,
    OUVERTE,
    ENVOYEE,
    ERREUR,
  }

  const question = ref<string>('');
  const erreur = ref<string>('');

  const questionEtat = ref<QuestionEtat>(QuestionEtat.PAS_OUVERTE);

  function envoyerReponse() {
    const usecase = new EnvoyerQuestionFAQUsecase(new FaqRepositoryAxios());
    usecase
      .execute(utilisateurStore().utilisateur.id, props.actionId, TypeAction.CLASSIQUE, question.value)
      .then(() => {
        questionEtat.value = QuestionEtat.ENVOYEE;
      })
      .catch(e => {
        questionEtat.value = QuestionEtat.ERREUR;
        erreur.value = e.data.message;
      });
  }
</script>

<style scoped>
  textarea {
    resize: none;
    height: 7rem;
  }
</style>
