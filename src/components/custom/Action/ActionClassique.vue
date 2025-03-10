<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction
      v-if="actionClassiqueViewModel.introduction"
      :introduction="actionClassiqueViewModel.introduction"
    />

    <ActionWidgetServices :commune="actionClassiqueViewModel.commune" :services="actionClassiqueViewModel.services" />

    <ActionAstuces v-if="actionClassiqueViewModel.astuces" :astuces="actionClassiqueViewModel.astuces" />

    <ActionAides v-if="actionClassiqueViewModel.aides?.length > 0" :aides="actionClassiqueViewModel.aides" />

    <ActionFAQ v-if="actionClassiqueViewModel.faq?.length > 0" :questions-faq="actionClassiqueViewModel.faq" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/ActionAides.vue';
  import ActionAstuces from '@/components/custom/Action/ActionAstuces.vue';
  import ActionFAQ from '@/components/custom/Action/ActionFAQ.vue';
  import ActionIntroduction from '@/components/custom/Action/ActionIntroduction.vue';
  import ActionWidgetServices from '@/components/custom/Action/ActionWidgetServices.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionClassiqueViewModel: ActionClassiqueViewModel }>();
</script>
