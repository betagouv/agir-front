<template>
  <div class="background--white border--bleu border-radius--md overflow--hidden">
    <p class="fr-mb-0 fr-p-3w fr-text--lg">
      <span class="text--3xl fr-text--bold text--bleu"
        >{{ impactKgHebdomadaire.valeur }}
        <span class="fr-text--lg fr-text--regular"> {{ impactKgHebdomadaire.unite }} </span>
      </span>
      cette
      <strong>semaine</strong>
    </p>
    <p class="fr-mb-0 fr-p-3w background--bleu-info">
      <span class="fr-icon-global-line" aria-hidden="true"></span>Soit
      <strong>{{ impactKgAnnuel.valeur }}</strong> CO₂-e chaque année.
    </p>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    impactKgHebdomadaire: {
      valeur: string;
      unite: string;
    };
    impactKgAnnuel: {
      valeur: string;
      unite: string;
    };
  }>();
</script>
