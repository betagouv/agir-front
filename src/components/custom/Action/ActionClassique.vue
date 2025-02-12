<template>
  <section class="background--white border-radius--md fr-p-2w fr-mb-3w shadow">
    <section
      v-if="actionClassiqueViewModel.corps.introduction"
      class="action__corps-introduction fr-p-3w border-radius--md fr-mb-3w"
      v-html="actionClassiqueViewModel.corps.introduction"
    />

    <ActionWidgetServices :services="actionClassiqueViewModel.services" :commune="actionClassiqueViewModel.commune" />

    <section
      v-if="actionClassiqueViewModel.corps.astuces"
      class="action__corps-astuces fr-p-3w border-radius--md"
      v-html="actionClassiqueViewModel.corps.astuces"
    />
  </section>
</template>

<script setup lang="ts">
  import ActionWidgetServices from '@/components/custom/Action/ActionWidgetServices.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ actionClassiqueViewModel: ActionClassiqueViewModel }>();
</script>

<style scoped>
  .action__corps-introduction {
    background-color: rgba(0, 0, 145, 0.03);
    border: 1px solid #e5e5f8;
  }

  .action__corps-astuces {
    background-color: rgba(249, 251, 251, 1);
    border: 1px solid rgba(57, 130, 108, 0.2);
  }
</style>
