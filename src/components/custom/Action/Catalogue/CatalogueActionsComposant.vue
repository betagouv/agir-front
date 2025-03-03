<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <section v-for="action in actions" :key="action.code" :class="cardClasses">
      <div class="fr-card fr-enlarge-link fr-card--horizontal relative">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h2 class="fr-card__title">
              <router-link :to="action.url"><span v-html="action.titre" /></router-link>
            </h2>
            <ul class="fr-card__desc list-style-none fr-p-0 flex gap--small">
              <li v-if="action.nombreDePersonnes" class="text--bleu fr-icon-team-line">
                <span class="text--gris fr-pl-1w" v-html="action.nombreDePersonnes" />&nbsp;
              </li>
              <li v-if="action.aidesDisponibles" class="text--bleu fr-icon-money-euro-circle-line">
                <span class="text--gris fr-pl-1w" v-html="action.aidesDisponibles" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';

  defineProps<{
    actions: ActionViewModel[];
    cardClasses: string;
  }>();
</script>
