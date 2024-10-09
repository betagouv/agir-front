<template>
  <div class="border-radius--md fr-px-2w fr-pt-2w fr-px-md-4w fr-pt-md-4w full-height background--custom-bleu">
    <span
      :class="`${picto} fr-mb-1w fr-p-2w display-inline-block text--vert background--white border-radius--full`"
      aria-hidden="true"
    />
    <h3 class="fr-h3 fr-mb-1w">{{ titre }}</h3>
    <p class="text--lh-1-8 text--custom-bleu">{{ description }}</p>
    <img :src="image" class="img-object-fit-contain display-block full-width" alt="" />
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    picto: string;
    titre: string;
    description: string;
    image: string;
  }>();
</script>
