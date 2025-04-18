<template>
  <aside class="background--white overflow--hidden shadow--light">
    <img :src="image" alt="" class="img-object-fit-cover full-width display-block background--white" height="150" />
    <div class="fr-px-2w fr-py-3w">
      <h2 class="text--lh-1-3 fr-h4">
        <span class="text--normal text--bleu text--italic fr-text--md">Proposé par</span><br />
        {{ nom }}
      </h2>
      <p>{{ description }}</p>
      <p>
        <a :href="url" class="fr-link" target="_blank" rel="noopener">
          {{ urlLabel }}
        </a>
      </p>
      <img v-if="logo" :src="logo" alt="" class="display-block max-full-width" height="24px" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  defineProps<{ image: string; nom: string; description: string; url: string; urlLabel?: string; logo: string }>();
</script>
