<template>
  <div class="action fr-my-1w">
    <h1 class="action__titre text--normal fr-mb-3w" v-html="actionBaseViewModel.titreAffiche" />
    <p v-if="actionBaseViewModel.sousTitre" class="fr-text--lg fr-mb-4w" v-html="actionBaseViewModel.sousTitre" />

    <div class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-12 fr-col-lg-8">
        <slot name="contenu" />
        <ActionArticlesRecommandees :action-base-view-model="actionBaseViewModel" />
      </div>

      <ActionAside :action-base-view-model="actionBaseViewModel" class="fr-col-12 fr-col-lg-4">
        <slot name="aside" />
      </ActionAside>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed } from 'vue';
  import ActionArticlesRecommandees from '@/components/custom/Action/ActionArticlesRecommandees.vue';
  import ActionAside from '@/components/custom/Action/Aside/ActionAside.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  const { actionBaseViewModel } = defineProps<{ actionBaseViewModel: ActionBaseViewModel }>();

  useHead({
    title: computed(() => actionBaseViewModel.titrePropre && `${actionBaseViewModel.titrePropre} - J'agis`),
  });
</script>
