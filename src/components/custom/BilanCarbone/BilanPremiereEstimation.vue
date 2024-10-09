<template>
  <div class="fr-grid-row background--white fr-p-2w shadow border-radius--md">
    <ul class="list-style-none full-width fr-p-0 fr-p-md-2w fr-m-0">
      <li
        v-for="(categorie, index) in bilanPremiereEstimation"
        :key="categorie.label"
        :class="bilanPremiereEstimation.length - 1 === index ? 'fr-mb-0' : 'fr-mb-4w'"
      >
        <div class="fr-grid-row fr-grid-row--gutters flex-space-between align-items--center fr-mb-1v">
          <span class="fr-text--bold fr-col-auto">{{ categorie.label }}</span>
          <span
            :class="`${categorie.tag.classes} text--lh-1-3 fr-col-auto fr-py-1v fr-px-1w fr-mb-0 fr-mr-1w fr-text--sm border-radius--xs`"
          >
            {{ categorie.tag.wording }}
          </span>
        </div>
        <div :class="`${categorie.progressBarStyle}  border-radius--md`" aria-hidden="true" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { BilanCarbonePartielViewModel } from '@/domaines/bilanCarbone/adapters/bilanCarbone.presenter.impl';

  defineProps<{
    bilanPremiereEstimation: BilanCarbonePartielViewModel['categories'];
  }>();
</script>

<style scoped>
  ul {
    --text-tag-faible: #105a06;
    --background-tag-faible: #f1ffe3;
    --text-tag-moyen: #784000;
    --background-tag-moyen: #fffae3;
    --text-tag-fort: #950704;
    --background-tag-fort: #fff3e3;
    --text-tag-tres-fort: #910501;
    --background-tag-tres-fort: #ffe3e3;

    --gradient-progress-faible: #a6dd00;
    --gradient-progress-moyen: #ff9d00;
    --gradient-progress-fort: #ff6200;
    --gradient-progress-tres-fort: #df1451;
  }

  .tag-impact-faible {
    color: var(--text-tag-faible);
    background-color: var(--background-tag-faible);
  }

  .tag-impact-moyen {
    color: var(--text-tag-moyen);
    background-color: var(--background-tag-moyen);
  }

  .tag-impact-fort {
    color: var(--text-tag-fort);
    background-color: var(--background-tag-fort);
  }

  .tag-impact-tres-fort {
    color: var(--text-tag-tres-fort);
    background-color: var(--background-tag-tres-fort);
  }

  [class*='progress-bar'] {
    height: 0.5rem;
  }

  .progress-bar-impact-faible {
    width: 25%;
    background: var(--gradient-progress-faible);
  }

  .progress-bar-impact-moyen {
    width: 50%;
    background: linear-gradient(to right, var(--gradient-progress-faible), var(--gradient-progress-moyen));
  }

  .progress-bar-impact-fort {
    width: 75%;
    background: linear-gradient(
      to right,
      var(--gradient-progress-faible),
      var(--gradient-progress-moyen) 50%,
      var(--gradient-progress-fort)
    );
  }

  .progress-bar-impact-tres-fort {
    width: 100%;
    background: linear-gradient(
      to right,
      var(--gradient-progress-faible),
      var(--gradient-progress-moyen) 50%,
      var(--gradient-progress-tres-fort) 75%,
      var(--gradient-progress-tres-fort)
    );
  }
</style>
