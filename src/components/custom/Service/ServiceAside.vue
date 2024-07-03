<template>
  <aside class="background-bleu-light border-radius--md border--bleu overflow--hidden">
    <img
      :src="serviceAsideViewModel.screenshot"
      alt=""
      class="img-object-fit-cover full-width display-block"
      height="150"
    />
    <div class="fr-px-2w fr-py-3w">
      <h2 class="text--lh-1-3">
        <span class="text--normal text--bleu text--italic fr-text--md">Proposé par</span><br />
        {{ serviceAsideViewModel.nom }}
      </h2>
      <p>{{ serviceAsideViewModel.description }}</p>
      <p>
        <a :href="serviceAsideViewModel.url" class="fr-link" target="_blank" rel="noopener">
          {{ serviceAsideViewModel.url }}
        </a>
      </p>
      <img :src="serviceAsideViewModel.logo" alt="" class="display-block max-full-width" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ServiceRechercheViewModelBase } from '@/domaines/serviceRecherche/adapters/serviceRechercheViewModel';

  defineProps<{ serviceAsideViewModel: ServiceRechercheViewModelBase['aside'] }>();
</script>
