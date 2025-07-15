<template>
  <div class="fr-container">
    <h1 class="fr-h1 fr-mt-4w fr-mb-1w">Explorer la personnalisation</h1>
    <form action="" @submit.prevent="chargerActionsPersonnalisees">
      <InputCheckbox
        v-if="optionsCheckbox && optionsCheckbox.length > 0"
        :est-inline="true"
        :est-small="true"
        :est-resetable="true"
        :options="optionsCheckbox"
        id="thematiqueArticle"
        label="Thématiques"
        @update="
          e => {
            console.log(e);
          }
        "
      />

      <button class="fr-btn">Charger la personnalisation</button>
    </form>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import InputCheckbox from '@/components/custom/Form/InputCheckbox.vue';
  import { PersonnalisationRepositoryAxios } from '@/domaines/personnalisation/adapters/personnalisation.repository.axios';
  import { RecupererTousLesTagsPersonnalisation } from '@/domaines/personnalisation/recupererTousLesTagsPersonnalisation.usecase';

  const tags = ref<string[]>([]);
  const optionsCheckbox = ref<
    {
      id: string;
      label: string;
      checked?: boolean;
    }[]
  >([]);

  const recupererTousLesTagsPersonnalisationUsecase = new RecupererTousLesTagsPersonnalisation(
    new PersonnalisationRepositoryAxios(),
  );

  onMounted(async () => {
    tags.value = await recupererTousLesTagsPersonnalisationUsecase.execute();
    optionsCheckbox.value = tags.value.map(tag => ({
      id: tag,
      label: tag,
      checked: false,
    }));
  });

  async function chargerActionsPersonnalisees() {}
</script>

<style scoped></style>
