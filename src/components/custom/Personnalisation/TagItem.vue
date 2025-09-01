<template>
  <li :key="tag.code">
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

    <TagActionsAccordeon :tag="tag" />
    <code class="display-inline-block fr-p-1w fr-code background--gris-dark fr-text--xs fr-mb-0" v-text="tag.code" />

    <hr class="fr-mt-4w fr-mb-1w" />
  </li>
</template>
<script setup lang="ts">
  import TagActionsAccordeon from '@/components/custom/Personnalisation/TagActionsAccordeon.vue';
  import { DefinitionTagViewModel } from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';

  defineProps<{
    tag: DefinitionTagViewModel;
  }>();
</script>
