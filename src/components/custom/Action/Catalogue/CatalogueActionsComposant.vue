<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <section v-for="action in actions" :key="action.code" :class="cardClasses">
      <CarteCatalogueAction :action="action" />
    </section>
  </div>
</template>

<script lang="ts" setup>
  import CarteCatalogueAction from '@/components/custom/Action/Catalogue/CarteCatalogueAction.vue';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';

  defineProps<{
    actions: ActionViewModel[];
    cardClasses: string;
  }>();
</script>
