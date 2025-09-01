<template>
  <section class="fr-container">
    <h1 class="fr-h2 fr-mt-3w">Dictionnaire de tags</h1>

    <ul class="list-style-none fr-p-0">
      <TagItem v-for="tag in viewModel?.definitionTags" :tag="tag" :key="tag.code" />
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import TagItem from '@/components/custom/Personnalisation/TagItem.vue';
  import { AfficherDictionnaireTagsPresenterImpl } from '@/domaines/personnalisation/adapters/afficherDictionnaireTags.presenter.impl';
  import { PersonnalisationRepositoryAxios } from '@/domaines/personnalisation/adapters/personnalisation.repository.axios';
  import { DictionnaireTagsViewModel } from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';
  import { RecupererDictionnaireTagsUsecase } from '@/domaines/personnalisation/recupererDictionnaireTags.usecase';

  const viewModel = ref<DictionnaireTagsViewModel>();
  const personnalisationRepository = new PersonnalisationRepositoryAxios();
  const recupererMappingTagKYCUsecase = new RecupererDictionnaireTagsUsecase(
    personnalisationRepository,
    new AfficherDictionnaireTagsPresenterImpl(vm => (viewModel.value = vm)),
  );

  onMounted(async () => {
    await recupererMappingTagKYCUsecase.execute();
  });
</script>

<style scoped></style>
