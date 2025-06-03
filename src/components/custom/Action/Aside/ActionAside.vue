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

    <div class="shadow recommandations fr-mb-2w" v-if="actionBaseViewModel.explicationsRecommandation">
      <div class="background--white fr-p-2w">
        <h2 class="fr-h4 text--normal fr-mb-2w" v-html="actionBaseViewModel.explicationsRecommandation.titre" />
        <ul class="flex flex-column gap--small fr-pl-0">
          <li
            v-for="justification in actionBaseViewModel.explicationsRecommandation.justifications"
            :key="justification"
            class="fr-tag fr-tag--recommandations"
          >
            {{ justification }}
          </li>
        </ul>
      </div>
    </div>
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

  const notation = ref<number>(0);
  const feedbackNote = ref<number>(-1);

  function updateNotation(note: number) {
    notation.value = note;
    feedbackNote.value = note;
  }
</script>

<style scoped>
  .recommandations {
    border-left: 4px solid rgb(57, 130, 108);
  }

  .fr-tag--recommandations {
    background-color: rgba(57, 130, 108, 0.1);
  }
</style>
