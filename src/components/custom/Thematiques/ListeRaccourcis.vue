<template>
  <ul v-if="listeRaccourcis" class="list-style-none flex flex-wrap fr-pl-0">
    <li v-for="information in listeRaccourcis" :key="information.label">
      <router-link
        v-if="information.to"
        :to="information.to"
        class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
      >
        {{ information.label }}
      </router-link>
      <a
        target="_blank"
        rel="noopener noreferrer"
        v-else-if="information.href"
        :href="information.href"
        class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
      >
        {{ information.label }}
      </a>
    </li>
  </ul>
</template>
<script lang="ts" setup>
  import { Raccourci } from '@/domaines/thematiques/ports/thematiqueResume.presenter';

  defineProps<{
    listeRaccourcis: Raccourci[];
  }>();
</script>
