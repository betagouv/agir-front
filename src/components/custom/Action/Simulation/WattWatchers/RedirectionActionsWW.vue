<template>
  <section
    v-if="nombreActions > 0"
    class="actions fr-mx-3w text--center fr-px-1w fr-py-2w jagis-background--bleu-light"
  >
    <h3 class="fr-h4 fr-mb-1w">Faites des économies</h3>
    <p class="fr-mb-2w">
      Découvrez des actions personnalisées pour réduire votre facture d’électricité sans sacrifier votre confort.
    </p>
    <router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION_WINTER }" class="fr-btn fr-btn--lg fr-mb-1w"
      >Découvrir {{ nombreActions }} {{ gererPluriel(nombreActions, 'action', 'actions') }}
    </router-link>
  </section>
</template>

<script lang="ts" setup>
  import { ResultatWWViewModel } from '@/domaines/simulationWattWatchers/adapters/resultatWattWatchers.presenter.impl';
  import { RouteActionsName } from '@/router/actions/routes';
  import { gererPluriel } from '@/shell/formatting/gererPluriel';

  defineProps<{ nombreActions: ResultatWWViewModel['nombreActions'] }>();
</script>
