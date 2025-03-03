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
          <router-link
            class="fr-card"
            :to="{
              name: RouteAidesName.AIDE_CONSULTATION,
              params: {
                id: aide.id,
                titre: aide.titreUrl,
              },
            }"
          >
            <div class="flex align-items--center flex-space-between fr-p-2w">
              <div>
                <h3 class="fr-text--lg fr-mb-0">{{ aide.titre }}</h3>
                <p class="fr-m-0 fr-text--md fr-mt-1w" v-if="aide.estGratuit">
                  <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v"></span>
                  <span class="text--bold"> Gratuit</span>
                </p>
                <p class="fr-m-0 fr-text--md fr-mt-1w" v-else-if="aide.montantMaximum">
                  <span class="text--bleu fr-icon-money-euro-circle-line fr-mr-1v"></span>
                  Jusqu'à
                  <span class="text--bold"> {{ aide.montantMaximum }}</span>
                </p>
              </div>
              <span class="fr-icon-arrow-right-s-line text--bleu"></span>
            </div>
            <div class="background--bleu-info fr-p-1w flex align-items--center">
              <img :src="aide.partenaireImg" class="partenaire__img" alt="" />
              <div class="full-width fr-ml-1w">
                <span class="text--bleu text--italic">Proposée par</span><br />
                {{ aide.partenaireNom }}
              </div>
            </div>
          </router-link>
          <!--                  <router-link-->
          <!--                              :to="{-->
          <!--                                name: RouteAidesName.AIDE_CONSULTATION,-->
          <!--                                params: {-->
          <!--                                  id: aide.id,-->
          <!--                                  titre: aide.titreUrl,-->
          <!--                                },-->
          <!--                              }"-->
          <!--                    class="fr-link"-->
          <!--                  >-->
          <!--                    {{ aide.titre }}-->
          <!--                  </router-link>-->
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

  .partenaire__img {
    width: 40px;
    height: 40px;
    border-radius: 2px;
    border: 1px solid #b1b1ff;
    object-fit: contain;
    background-color: white;
  }
</style>
