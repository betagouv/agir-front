<template>
  <div class="fr-tabs">
    <ul class="fr-tabs__list" role="tablist" :aria-label="labelAria">
      <li v-for="(tab, index) in tabPanel" :key="tab" role="presentation">
        <button
          :id="`tabpanel-${tab}`"
          class="fr-tabs__tab"
          :tabindex="index === 0 ? 0 : -1"
          role="tab"
          :aria-selected="index === 0"
          :aria-controls="`tabpanel-${index}-panel`"
        >
          {{ tab }}
        </button>
      </li>
    </ul>
    <div
      v-for="(tab, index) in tabPanel"
      :key="tab"
      :id="`tabpanel-${index}-panel`"
      role="tabpanel"
      tabindex="0"
      class="fr-tabs__panel"
      :class="index === 0 ? 'fr-tabs__panel--selected' : ''"
      :aria-labelledby="`tabpanel-${tab}`"
    >
      <slot :name="`tab-${index}`" />
    </div>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/tab/tab.min.css';

  defineProps<{
    labelAria: string;
    tabPanel: string[];
  }>();
</script>
