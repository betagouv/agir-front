<template>
  <ActionAsideAFaire
    v-if="!actionBaseViewModel.realisee"
    sous-titre="Terminez votre simulateur et gagnez"
    :points="50"
  />
  <ActionAsideRealisee v-else sous-titre="Vous avez réalisé votre simulateur" :points="50" />

  <template v-if="actionBaseViewModel.nombreDeRealisations > 0">
    <hr />

    <p class="fr-mb-1w">
      <span class="text--bold">
        {{ actionBaseViewModel.nombreDeRealisations }}
        {{ gererPluriel(actionBaseViewModel.nombreDeRealisations, 'simulation terminée', 'simulations terminées') }}
      </span>
      par la communauté
    </p>
  </template>
</template>

<script lang="ts" setup>
  import ActionAsideAFaire from '@/components/custom/Action/Aside/ActionAsideAFaire.vue';
  import ActionAsideRealisee from '@/components/custom/Action/Aside/ActionAsideRealisee.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';
  import { gererPluriel } from '@/shell/pluriel';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();
</script>
