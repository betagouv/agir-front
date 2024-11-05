<template>
  <section>
    <ul class="list-style-none fr-pl-0">
      <li>
        <span class="fr-icon-check-line text--bleu" aria-hidden="true" />
        Suivez votre <strong>consommation</strong> au quotidien
      </li>
      <li>
        <span class="fr-icon-check-line text--bleu" aria-hidden="true" /> Détectez des potentielles
        <strong>anomalies</strong>
      </li>
      <li>
        <span class="fr-icon-check-line text--bleu" aria-hidden="true" />
        Réduisez votre <strong>facture</strong> énergétique
      </li>
    </ul>
    <div class="display-inline-block background--white fr-p-2w border-radius--md shadow fr-my-2w">
      <img src="/service-linky-a-configurer.webp" height="300" alt="" />
    </div>
    <h2 class="fr-h3">Activer le service</h2>
    <LinkyFormConfiguration :prm="prm" />
  </section>
</template>

<script setup lang="ts">
  defineProps<{ prm: string }>();

  import LinkyFormConfiguration from '@/components/custom/Linky/LinkyFormConfiguration.vue';
</script>
