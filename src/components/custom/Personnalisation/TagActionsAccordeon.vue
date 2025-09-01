<template>
  <div class="fr-accordions-group fr-mb-3w" v-if="tag.actionsExcluantes.length > 0 || tag.actionsIncluantes.length > 0">
    <Accordeon v-if="tag.actionsExcluantes.length > 0" :nameId="`actions-excluantes-${tag.code}`">
      <template v-slot:titre>
        <p>{{ tag.actionsExcluantes.length }} actions exclues</p>
      </template>
      <template v-slot:contenu>
        <ul>
          <li v-for="(action, index) in tag.actionsExcluantes" :key="index">
            <router-link :to="action.routerLinkTo" class="fr-link">
              <span v-html="action.titre" />
            </router-link>
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
            <router-link :to="action.routerLinkTo" class="fr-link">
              <span v-html="action.titre" />
            </router-link>
          </li>
        </ul>
      </template>
    </Accordeon>
  </div>
</template>

<script setup lang="ts">
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import { DefinitionTagViewModel } from '@/domaines/personnalisation/ports/afficherDictionnaireTagsPresenter';

  defineProps<{
    tag: DefinitionTagViewModel;
  }>();
</script>
