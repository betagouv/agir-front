<template>
  <section class="background--white border-radius--md fr-p-2w fr-mb-3w shadow">
    <section
      v-if="actionClassiqueViewModel.corps.introduction"
      class="action__corps-introduction fr-p-3w border-radius--md fr-mb-3w"
      v-html="actionClassiqueViewModel.corps.introduction"
    />

    <ActionWidgetServices :commune="actionClassiqueViewModel.commune" :services="actionClassiqueViewModel.services" />

    <section
      v-if="actionClassiqueViewModel.corps.astuces"
      class="action__corps-astuces fr-p-3w border-radius--md"
      v-html="actionClassiqueViewModel.corps.astuces"
    />

    <section v-if="actionClassiqueViewModel.aides?.length > 0" class="fr-p-2w fr-mt-2w">
      <h2>Aides et bons plans !</h2>
      <GrilleAidesDUneAction :aides="actionClassiqueViewModel.aides" />
    </section>

    <section v-if="actionClassiqueViewModel.faq?.length > 0" class="fr-p-2w fr-mt-2w">
      <h2>On répond à vos <span class="fr-text--bold"> questions ! </span></h2>
      <div class="fr-accordions-group">
        <Accordeon v-for="faq in actionClassiqueViewModel.faq" :key="faq.question" :name-id="faq.question">
          <template #titre>{{ faq.question }}</template>
          <template #contenu>
            <p v-html="faq.reponse"></p>
          </template>
        </Accordeon>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
  import ActionWidgetServices from '@/components/custom/Action/ActionWidgetServices.vue';
  import GrilleAidesDUneAction from '@/components/custom/Aides/GrilleAidesDUneAction.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
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
