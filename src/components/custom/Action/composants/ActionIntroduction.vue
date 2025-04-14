<template>
  <section v-if="introduction" class="action__corps-introduction action--cms fr-p-3w fr-mb-3w">
    <div v-html="introduction" />
    <div v-if="sources.length > 0" class="fr-mt-2w fr-mb-4w print-hidden">
      <hr />
      <p v-if="sources.length === 1" class="fr-text--xs">
        <span class="fr-mr-1w text--bold">Source :</span>
        <a :href="sources[0].url" rel="noopener noreferrer" target="_blank">{{ sources[0].label }}</a>
      </p>
      <div v-else class="fr-text--xs">
        <span class="fr-mr-1w text--bold">Sources :</span>
        <ul>
          <li v-for="source in sources" :key="source.label">
            <a :href="source.url" rel="noopener noreferrer" target="_blank">{{ source.label }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    introduction: ActionBaseViewModel['introduction'];
    sources: ActionBaseViewModel['sources'];
  }>();
</script>

<style scoped>
  .action__corps-introduction {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid #e5e5f8;
  }
</style>
