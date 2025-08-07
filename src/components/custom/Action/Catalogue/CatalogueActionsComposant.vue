<template>
  <div class="fr-grid-row fr-grid-row--gutters">
    <template v-for="(item, index) in cards" :key="isCustomCard(item) ? 'custom-' + index : item.code">
      <section v-if="isCustomCard(item)" :class="cardClasses">
        <slot name="custom-card"></slot>
      </section>
      <section v-else :class="cardClasses">
        <CarteCatalogueAction :action="item" />
      </section>
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ComputedRef } from 'vue';
  import CarteCatalogueAction from '@/components/custom/Action/Catalogue/CarteCatalogueAction.vue';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';

  const props = defineProps<{
    actions: ActionViewModel[];
    cardClasses: string;
    insertCustomCardAt?: number;
  }>();

  type CustomCard = { isCustom: true };
  type CardItem = ActionViewModel | CustomCard;
  function isCustomCard(item: CardItem): item is CustomCard {
    return 'isCustom' in item && item.isCustom;
  }

  const cards: ComputedRef<CardItem[]> = computed(() => {
    const position = props.insertCustomCardAt;
    if (!position) return [...props.actions];

    const cardsList: CardItem[] = [...props.actions];
    if (position >= 0 && position <= cardsList.length) {
      cardsList.splice(position, 0, { isCustom: true });
    }
    return cardsList;
  });
</script>
