<template>
  <aside class="background-bleu-light border-radius--md border--bleu overflow--hidden">
    <img :src="image" alt="" class="img-object-fit-cover full-width display-block background--white" height="150" />
    <div class="fr-px-2w fr-py-3w">
      <h2 class="text--lh-1-3">
        <span class="text--normal text--bleu text--italic fr-text--md">Proposé par</span><br />
        {{ nom }}
      </h2>
      <p>{{ description }}</p>
      <p>
        <a :href="url" class="fr-link" target="_blank" rel="noopener">
          {{ url }}
        </a>
      </p>
      <img v-if="logo" :src="logo" alt="" class="display-block max-full-width" height="32px" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  defineProps<{ image: string; nom: string; description: string; url: string; logo: string }>();
</script>
