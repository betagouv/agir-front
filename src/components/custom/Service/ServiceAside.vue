<template>
  <aside class="background-bleu-light border-radius--md border--bleu overflow--hidden">
    <img
      :src="serviceFooterViewModel.screenshot"
      alt=""
      class="img-object-fit-cover full-width display-block"
      height="150"
    />
    <div class="fr-px-2w fr-py-3w">
      <h2 class="text--lh-1-3">
        <span class="text--normal text--bleu text--italic fr-text--md">Proposé par</span><br />
        {{ serviceFooterViewModel.nom }}
      </h2>
      <p>{{ serviceFooterViewModel.description }}</p>
      <p>
        <a :href="serviceFooterViewModel.url" class="fr-link" target="_blank" rel="noopener">
          {{ serviceFooterViewModel.url }}
        </a>
      </p>
      <img :src="serviceFooterViewModel.logo" alt="" class="display-block max-full-width" />
    </div>
  </aside>
</template>

<script setup lang="ts">
  import { ServiceRechercheViewModel } from '@/domaines/serviceRecherche/adapters/serviceRecherche.presenter.impl';

  defineProps<{ serviceFooterViewModel: ServiceRechercheViewModel['aside'] }>();
</script>
