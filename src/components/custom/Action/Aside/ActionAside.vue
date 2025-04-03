<template>
  <aside>
    <div class="shadow fr-mb-2w">
      <div class="background--white fr-p-2w">
        <slot />
      </div>
      <BandeauAimezVousCettePage v-model:notation="premiereNotation" />
    </div>

    <ActionModaleFeedback :notation="premiereNotation" />
  </aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ActionModaleFeedback from '@/components/custom/Action/Aside/ActionModaleFeedback.vue';
  import BandeauAimezVousCettePage from '@/components/custom/Action/Aside/BandeauAimezVousCettePage.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const premiereNotation = ref<number>(0);
</script>
