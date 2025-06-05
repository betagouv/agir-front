<template>
  <div class="shadow recommandations fr-mb-2w">
    <div class="background--white fr-px-2w fr-pt-2w fr-pb-1v">
      <h2 class="fr-h4 recommandations--titre fr-mb-2w" v-html="explicationsRecommandation.titre" />

      <ul class="flex flex-column fr-pl-0 fr-m-0 list-style-none">
        <li v-for="justification in explicationsRecommandation.justifications" :key="justification" class="fr-mb-3v">
          <router-link
            :to="{ name: RouteCompteName.MIEUX_VOUS_CONNAITRE }"
            class="fr-tag fr-tag--recommandations fr-icon-edit-line fr-tag--icon-left"
          >
            {{ justification }}
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ExplicationRecommandationViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  defineProps<{
    explicationsRecommandation: ExplicationRecommandationViewModel;
  }>();
</script>

<style scoped>
  .recommandations {
    border-left: 4px solid rgb(57, 130, 108);
  }

  .fr-tag--recommandations {
    background-color: rgba(57, 130, 108, 0.1);
    color: black;
  }

  .fr-tag--recommandations:hover {
    background-color: rgba(57, 130, 108, 0.2);
  }

  .recommandations--titre {
    font-weight: 400 !important;
  }
</style>
