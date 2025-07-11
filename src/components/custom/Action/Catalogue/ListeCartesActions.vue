<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <div v-for="action in actions" :key="action.code" :class="cardClasses">
      <div class="fr-card fr-enlarge-link fr-card--horizontal fr-card--sm relative">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <component :is="headingLevel" class="fr-card__title">
              <router-link :to="action.url">
                <span class="text--black" v-html="action.titre" />
              </router-link>
            </component>
            <ul class="fr-card__desc list-style-none fr-p-0 flex gap--small flex-wrap">
              <li v-if="action.url.params.type === 'quizz'" class="fr-pb-0">
                <span class="fr-badge background-bleu-light text--bleu fr-pl-1w">QUIZ</span>&nbsp;
              </li>
              <li v-if="action.url.params.type === 'simulateur'" class="fr-pb-0">
                <span class="fr-badge background-bleu-light text--bleu fr-pl-1w">SIMULATEUR</span>&nbsp;
              </li>
              <li v-if="action.aidesDisponibles" class="text--bleu fr-icon-money-euro-circle-line fr-pb-0">
                <span class="text--gris fr-pl-1w" v-html="action.aidesDisponibles" />
              </li>
              <li v-else-if="action.nombreDePersonnes" class="text--bleu fr-icon-team-line fr-pb-0">
                <span class="text--gris fr-pl-1w" v-html="action.nombreDePersonnes" />&nbsp;
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { computed } from 'vue';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';

  const props = withDefaults(
    defineProps<{
      cardClasses: string;
      actions: ActionViewModel[];
      headingType?: 'h2' | 'h3';
    }>(),
    {
      headingType: 'h2',
    },
  );

  const headingLevel = computed(() => props.headingType);
</script>
<style scoped>
  .fr-card__content {
    padding-bottom: 2.5rem !important;
  }
</style>
