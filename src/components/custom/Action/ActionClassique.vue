<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction
      :introduction="actionClassiqueViewModel.introduction"
      :sources="actionClassiqueViewModel.sources"
    />

    <ActionWidgetServices :commune="actionClassiqueViewModel.commune" :services="actionClassiqueViewModel.services" />

    <ActionAstuces :astuces="actionClassiqueViewModel.astuces" />

    <ActionAides :aides="actionClassiqueViewModel.aides" />

    <ActionFAQ :action-id="actionClassiqueViewModel.actionId" :questions-faq="actionClassiqueViewModel.faq" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionAstuces from '@/components/custom/Action/composants/ActionAstuces.vue';
  import ActionFAQ from '@/components/custom/Action/composants/ActionFAQ.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import ActionWidgetServices from '@/components/custom/Action/composants/ActionWidgetServices.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionClassiqueViewModel: ActionClassiqueViewModel }>();
</script>
