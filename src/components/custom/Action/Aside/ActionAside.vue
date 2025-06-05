<template>
  <aside>
    <div class="shadow fr-mb-2w">
      <div class="background--white fr-p-2w">
        <slot />
      </div>
      <BandeauAimezVousCettePage v-model:notation="notation" :feedback-note="feedbackNote" />
    </div>

    <ActionModaleFeedback
      :notation="notation"
      :action-id="actionBaseViewModel.actionId"
      @feedback-envoye="updateNotation"
    />

    <ExplicationsRecommandations
      v-if="actionBaseViewModel.explicationsRecommandation"
      :explications-recommandation="actionBaseViewModel.explicationsRecommandation"
    />
  </aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ActionModaleFeedback from '@/components/custom/Action/Aside/ActionModaleFeedback.vue';
  import BandeauAimezVousCettePage from '@/components/custom/Action/Aside/BandeauAimezVousCettePage.vue';
  import ExplicationsRecommandations from '@/components/custom/Action/Aside/ExplicationsRecommandations.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const notation = ref<number>(0);
  const feedbackNote = ref<number>(-1);

  function updateNotation(note: number) {
    notation.value = note;
    feedbackNote.value = note;
  }
</script>
