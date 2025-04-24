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
        , notre equipe vous répond&nbsp;!
      </p>

      <div v-if="questionEtat === QuestionEtat.OUVERTE" class="background--main fr-py-3w fr-px-2w fr-mt-2w">
        <div class="fr-grid-row fr-grid-row--gutters">
          <form class="fr-col-12 fr-col-md-9">
            <h3 id="question-label" class="fr-h4">Posez une question</h3>

            <p id="question-description">
              Une question ou une difficulté pour réaliser cette action&nbsp;?
              <br aria-hidden="true" />
              Notre équipe vous répondra par email&nbsp;!
            </p>

            <textarea
              aria-labelledby="question-label"
              aria-describedby="question-description"
              id="textarea"
              class="fr-input fr-mb-3w"
              name="textarea"
              maxlength="500"
            />

            <button
              class="fr-btn fr-btn--secondary fr-btn--icon-right fr-icon-arrow-right-s-line"
              @click="envoyerReponse"
            >
              Envoyer
            </button>
          </form>
          <div class="fr-col-md-3 fr-hidden fr-unhidden-md">
            <img alt="" class="full-width" src="/ic_faq.svg" />
          </div>
        </div>
      </div>

      <Alert
        v-if="questionEtat === QuestionEtat.ENVOYEE"
        titre="Merci pour votre retour !"
        message="Notre équipe en prendra connaissance très prochainement."
        type="success"
        :on-close="() => (questionEtat = QuestionEtat.PAS_OUVERTE)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { ActionFAQ } from '@/domaines/actions/ports/actions.repository';

  defineProps<{ questionsFaq: ActionFAQ[] }>();
  enum QuestionEtat {
    PAS_OUVERTE,
    OUVERTE,
    ENVOYEE,
  }

  const questionEtat = ref<QuestionEtat>(QuestionEtat.PAS_OUVERTE);

  function envoyerReponse() {
    questionEtat.value = QuestionEtat.ENVOYEE;
  }
</script>

<style scoped>
  textarea {
    resize: none;
    height: 7rem;
  }
</style>
