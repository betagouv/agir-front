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

    <section v-if="actionClassiqueViewModel.aides.length > 0" class="fr-p-2w">
      <h2>Aides et bons plans !</h2>
      <div class="fr-grid-row fr-grid-row--gutters fr-mb-1w">
        <div v-for="aide in actionClassiqueViewModel.aides" :key="aide.titre" class="fr-col-6">
          <div class="fr-card fr-enlarge-link">
            <div class="fr-card__body">
              <div class="fr-card__content">
                <h3 class="fr-card__title">
                  <router-link
                    :to="{
                      name: RouteAidesName.AIDE_CONSULTATION,
                      params: {
                        id: aide.id,
                        titre: aide.titreUrl,
                      },
                    }"
                    class="fr-link"
                  >
                    {{ aide.titre }}
                  </router-link>
                </h3>
              </div>
            </div>
          </div>
          <div class="background--bleu-info fr-p-2w">Proposé par : {{ aide.partenaireNom }}</div>
        </div>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
  import ActionWidgetServices from '@/components/custom/Action/ActionWidgetServices.vue';
  import { ActionClassiqueViewModel } from '@/domaines/actions/ports/action.presenter';
  import { RouteAidesName } from '@/router/aides/routeAidesName';

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
