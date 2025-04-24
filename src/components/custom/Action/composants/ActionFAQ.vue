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
      <button class="fr-link text--underline fr-p-0 fr-mt-2w" @click.prevent="poserUneQuestion = true">
        Posez votre question
      </button>
      , notre equipe vous répond&nbsp;!

      <div v-if="poserUneQuestion" class="background--main fr-py-4w fr-px-2w fr-mt-2w">
        <p class="fr-h4">Posez une question</p>
        <div class="flex">
          <form class="fr-col-12 fr-col-md-8">
            <div class="fr-input-group">
              <label class="fr-label" for="textarea">
                Une question ou une difficulté pour réaliser cette action&nbsp;?
                <br />
                Notre équipe vous répondra par email&nbsp;!
              </label>
              <textarea id="textarea" class="fr-input" name="textarea"></textarea>
            </div>
            <button class="fr-btn fr-btn--secondary fr-btn--icon-right fr-icon-arrow-right-s-line">Envoyer</button>
          </form>
          <div class="fr-hidden fr-unhidden-md">
            <img alt="" class="width--fit-content" src="/ic_faq.svg" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { ActionFAQ } from '@/domaines/actions/ports/actions.repository';

  defineProps<{ questionsFaq: ActionFAQ[] }>();
  const poserUneQuestion = ref<boolean>(false);
</script>
