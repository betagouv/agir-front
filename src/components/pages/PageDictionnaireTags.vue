<template>
  <section class="fr-container">
    <h1 class="fr-h2 fr-mt-3w">Dictionnaire de tags</h1>

    <ul class="list-style-none fr-p-0">
      <li v-for="tag in viewModel?.definitionTags" :key="tag.code">
        <span class="fr-badge fr-mb-1w" v-text="tag.type.titre" :class="tag.type.classColor" />

        <h2 class="fr-h4 fr-mb-2w" v-text="tag.labelRecommandation" />

        <p v-if="tag.descriptionInterne">
          <em v-text="tag.descriptionInterne" />
        </p>

        <ul class="fr-badges-group fr-mb-2w" v-if="tag.warnings.length > 0">
          <li class="fr-badge fr-badge--warning" v-for="warning in tag.warnings" :key="warning">{{ warning }}</li>
        </ul>

        <p>
          <span class="fr-icon-group-fill fr-pr-1w" />
          <span v-html="tag.indicationUser" />
        </p>

        <div
          class="fr-accordions-group fr-mb-3w"
          v-if="tag.actionsExcluantes.length > 0 || tag.actionsIncluantes.length > 0"
        >
          <Accordeon v-if="tag.actionsExcluantes.length > 0" :nameId="`actions-excluantes-${tag.code}`">
            <template v-slot:titre>
              <p>{{ tag.actionsExcluantes.length }} actions exclues</p>
            </template>
            <template v-slot:contenu>
              <ul>
                <li v-for="(action, index) in tag.actionsExcluantes" :key="index">
                  <router-link :to="action.routerLinkTo" class="fr-link"><span v-html="action.titre" /></router-link>
                </li>
              </ul>
            </template>
          </Accordeon>
          <Accordeon v-if="tag.actionsIncluantes.length > 0" :nameId="`actions-incluantes-${tag.code}`">
            <template v-slot:titre>
              <p>{{ tag.actionsIncluantes.length }} actions recommandées</p>
            </template>
            <template v-slot:contenu>
              <ul>
                <li v-for="(action, index) in tag.actionsIncluantes" :key="index">
                  <router-link :to="action.routerLinkTo" class="fr-link"><span v-html="action.titre" /></router-link>
                </li>
              </ul>
            </template>
          </Accordeon>
        </div>

        <code
          class="display-inline-block fr-p-1w fr-code background--gris-dark fr-text--xs fr-mb-0"
          v-text="tag.code"
        />

        <hr class="fr-mt-4w fr-mb-1w" />
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { AfficherDictionnaireTagsPresenterImpl } from '@/domaines/personnalisation/adapters/afficherDictionnaireTags.presenter.impl';
  import { PersonnalisationRepositoryAxios } from '@/domaines/personnalisation/adapters/personnalisation.repository.axios';
  import { DictionnaireTagsViewModel } from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';
  import { RecupererDictionnaireTagsUsecase } from '@/domaines/personnalisation/recupererDictionnaireTagsUsecase';

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
