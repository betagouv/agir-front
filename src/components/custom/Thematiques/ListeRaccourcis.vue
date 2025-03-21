<template>
  <ul v-if="listeRaccourcis" class="list-style-none flex flex-wrap fr-pl-0 liste">
    <li v-for="raccourci in listeRaccourcis" :key="raccourci.label">
      <router-link
        v-if="raccourci.to"
        :to="raccourci.to"
        class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
      >
        <span v-if="raccourci.emoji" aria-hidden="true">{{ raccourci.emoji }}&nbsp;</span>
        {{ raccourci.label }}
      </router-link>
      <a
        target="_blank"
        rel="noopener noreferrer"
        v-else-if="raccourci.href"
        :href="raccourci.href"
        class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
      >
        <span v-if="raccourci.emoji" aria-hidden="true">{{ raccourci.emoji }}&nbsp;</span>
        {{ raccourci.label }}
      </a>
    </li>
  </ul>
</template>
<script lang="ts" setup>
  import { RaccourciViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

  defineProps<{
    listeRaccourcis: RaccourciViewModel[];
  }>();
</script>

<style scoped>
  .liste {
    gap: 1rem;
  }
</style>
