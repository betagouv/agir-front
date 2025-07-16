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
        @update="
          e => {
            console.log(e);
          }
        "
      />

      <button class="fr-btn">Charger la personnalisation</button>
    </form>

    <section v-if="previewActions">
      <h2 class="fr-h2 fr-mt-4w fr-mb-1w">Actions personnalisées</h2>
      <h3>Me nourrir</h3>
      <ul>
        <li v-for="action in previewActions.alimentation" :key="action?.titre">
          <p class="fr-text--bold">{{ action?.titre }}</p>
          <p>{{ action?.type }}</p>
          <p>{{ action?.pourcentageReco }}% recommandé</p>
        </li>
      </ul>
      <h3>Me loger</h3>
      <h3>Me déplacer</h3>
      <h3>Mes achats</h3>
    </section>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import InputCheckbox from '@/components/custom/Form/InputCheckbox.vue';
  import { PersonnalisationRepositoryAxios } from '@/domaines/personnalisation/adapters/personnalisation.repository.axios';
  import { PreviewActionsParThematique } from '@/domaines/personnalisation/ports/personnalisation.repository';
  import { RecupererTousLesTagsPersonnalisation } from '@/domaines/personnalisation/recupererTousLesTagsPersonnalisation.usecase';

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
  });

  async function chargerActionsPersonnalisees() {
    const tagsSelectionnes = optionsCheckbox.value.filter(option => option.checked).map(option => option.id);
    previewActions.value = await personnalisationRepository.recupererActionsAvecTags(tagsSelectionnes);
  }
</script>

<style scoped></style>
