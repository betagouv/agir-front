<template>
  <section class="actions fr-m-3w text--center fr-px-1w fr-py-2w jagis-background--bleu-light">
    <h3 class="fr-h4 fr-mb-1w">Faites des économies</h3>
    <p class="fr-mb-2w">
      Découvrez des actions personnalisées pour réduire votre facture d’électricité sans sacrifier votre confort.
    </p>
    <!--    todo-->
    <a href="#" class="fr-btn fr-btn--lg fr-mb-1w">Découvrir {{ nombreActions }} actions</a>
  </section>
</template>

<script lang="ts" setup>
  import { ResultatWWViewModel } from '@/domaines/simulationWattWatchers/adapters/resultatWattWatchers.presenter.impl';

  defineProps<{ nombreActions: ResultatWWViewModel['nombreActions'] }>();
</script>
