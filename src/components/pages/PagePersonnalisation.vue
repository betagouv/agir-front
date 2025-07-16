<template>
  <section class="fr-container">
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
      />

      <button class="fr-btn fr-mb-4w">Charger la personnalisation</button>
    </form>

    <section v-if="previewActions">
      <h2 class="fr-h2 fr-mb-1w">Actions personnalisées</h2>

      <ThematiquePreview titre="Me nourrir" :actions="previewActions.alimentation" />
      <ThematiquePreview titre="Me loger" :actions="previewActions.logement" />
      <ThematiquePreview titre="Me déplacer" :actions="previewActions.transport" />
      <ThematiquePreview titre="Mes achats" :actions="previewActions.consommation" />
    </section>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import InputCheckbox from '@/components/custom/Form/InputCheckbox.vue';
  import ThematiquePreview from '@/components/custom/Personnalisation/ThematiquePreview.vue';
  import { PersonnalisationRepositoryAxios } from '@/domaines/personnalisation/adapters/personnalisation.repository.axios';
  import { PreviewActionsParThematique } from '@/domaines/personnalisation/ports/personnalisation.repository';
  import { RecupererTousLesTagsPersonnalisation } from '@/domaines/personnalisation/recupererTousLesTagsPersonnalisation.usecase';

  const CLE_STORAGE_OPTIONS = 'personnalisation_options_checkbox';
  const personnalisationRepository = new PersonnalisationRepositoryAxios();
  const tags = ref<string[]>([]);
  const previewActions = ref<PreviewActionsParThematique>();
  const optionsCheckbox = ref<
    {
      id: string;
      label: string;
      checked?: boolean;
    }[]
  >([]);

  const recupererTousLesTagsPersonnalisationUsecase = new RecupererTousLesTagsPersonnalisation(
    personnalisationRepository,
  );

  onMounted(async () => {
    tags.value = await recupererTousLesTagsPersonnalisationUsecase.execute();
    optionsCheckbox.value = tags.value.map(tag => ({
      id: tag,
      label: tag,
      checked: false,
    }));

    restaurerOptionsCheckbox();
  });

  function restaurerOptionsCheckbox() {
    try {
      const optionsSauvegardees = localStorage.getItem(CLE_STORAGE_OPTIONS);

      if (optionsSauvegardees) {
        const optionsCochees = JSON.parse(optionsSauvegardees) as string[];

        optionsCheckbox.value = optionsCheckbox.value.map(option => ({
          ...option,
          checked: optionsCochees.includes(option.id),
        }));
      }
    } catch (error) {
      return;
    }
  }

  function sauvegarderOptionsCheckbox(nouvellesOptions) {
    optionsCheckbox.value = nouvellesOptions;
    localStorage.setItem(CLE_STORAGE_OPTIONS, JSON.stringify(nouvellesOptions));
  }

  async function chargerActionsPersonnalisees() {
    const tagsSelectionnes = optionsCheckbox.value.filter(option => option.checked).map(option => option.id);
    previewActions.value = await personnalisationRepository.recupererActionsAvecTags(tagsSelectionnes);
    sauvegarderOptionsCheckbox(tagsSelectionnes);
  }
</script>

<style scoped></style>
