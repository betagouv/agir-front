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
  </section>
</template>

<script lang="ts" setup>
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { ActionFAQ } from '@/domaines/actions/ports/actions.repository';

  defineProps<{ questionsFaq: ActionFAQ[] }>();
</script>
