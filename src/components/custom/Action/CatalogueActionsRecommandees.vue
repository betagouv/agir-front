<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mt-2w">
    <section v-for="action in catalogueViewModel?.actions" :key="action.code" :class="cardClasses">
      <div class="fr-card fr-card--horizontal relative">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h2 class="fr-card__title" v-html="action.titre"></h2>
            <ul class="fr-card__desc list-style-none fr-p-0 flex gap--small">
              <li v-if="action.nombreDePersonnes" class="text--bleu fr-icon-team-line">
                <span class="text--gris fr-pl-1w" v-html="action.nombreDePersonnes" />&nbsp;
              </li>
              <li v-if="action.aidesDisponibles" class="text--bleu fr-icon-money-euro-circle-line">
                <span class="text--gris fr-pl-1w" v-html="action.aidesDisponibles" />
              </li>
            </ul>
          </div>
          <div class="fr-card__footer">
            <ul class="fr-btns-group fr-btns-group--inline fr-btns-group--sm fr-btns-group--icon-left">
              <li>
                <button
                  class="fr-btn fr-btn--tertiary-no-outline fr-icon-refresh-line fr-icon--sm fr-btn--icon-left fr-mx-0"
                >
                  Proposez-moi autre chose
                </button>
              </li>

              <li>
                <router-link class="fr-btn" :to="action.url">Découvrir</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { CatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';

  defineProps<{
    catalogueViewModel: CatalogueActionsViewModel;
    cardClasses: string;
  }>();
</script>
