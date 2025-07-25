<template>
  <section class="fr-pb-1w headerThematique background--beige-gris-galet-950-100">
    <div class="fr-container">
      <div class="fr-pt-7w fr-pb-3w fr-pb-1w">
        <div class="flex flex-space-between align-items--center flex-wrap">
          <div>
            <h1 class="fr-h1 fr-col fr-m-0 fr-pb-2w display-inline-block">
              <span aria-hidden="true"> {{ thematique.emoji }}</span>
              {{ thematique.labelDansLeMenu }}
            </h1>
            <router-link
              :title="`à ${thematiqueResumeViewModel?.commune}: modifier cette commune`"
              :to="{ name: RouteCompteName.LOGEMENT }"
              class="fr-tag fr-icon-map-pin-2-fill fr-tag--icon-left fr-ml-2w"
            >
              à {{ thematiqueResumeViewModel?.commune }}
            </router-link>
          </div>
          <div>
            <Alert v-if="messageNgc" class="fr-text--sm" taille="small" type="info" @close="messageNgc = ''">
              <template v-slot:message>
                Vous n’avez pas renseigné vos habitudes sur ce thème lors de votre bilan
                <span class="display-block">Nos Gestes Climat</span>
              </template>
            </Alert>
          </div>
        </div>
      </div>
    </div>
    <div class="fr-container">
      <div v-if="isLoading" class="placeholder"></div>

      <template v-else-if="idEnchainementKycs">
        <ParcoursKYCPourRecommandations
          :id-enchainement-kycs="idEnchainementKycs"
          :on-fin-k-y-c="chargerActionsRecommandeesAvecUnDelai"
        />
      </template>

      <template v-else-if="actionsViewModel">
        <CatalogueActionsRecommandees
          ref="catalogueActionsRecoRef"
          :actions="actionsViewModel"
          :rafraichir-actions="chargerActionsRecommandees"
          :reset-parcours="resetParcours"
          :thematiqueId="thematiqueId"
          card-classes="fr-col-12 fr-col-md-6 fr-col-xl-4"
        />
      </template>
    </div>
  </section>

  <div class="fr-container">
    <WidgetsServicesAlimentation v-if="thematique.clefTechniqueAPI === ClefThematiqueAPI.alimentation" />
    <WidgetsServicesMeLoger v-if="thematique.clefTechniqueAPI === ClefThematiqueAPI.logement" />
    <WidgetsServicesMeDeplacer v-if="thematique.clefTechniqueAPI === ClefThematiqueAPI.transports" />
    <WidgetsServicesMesAchats v-if="thematique.clefTechniqueAPI === ClefThematiqueAPI.consommation" />

    <WidgetAides :clef-thematique="thematiqueId" :nombre-aides-max="3" class="fr-my-4w" />

    <ArticlesRecommandees :key="thematiqueId" :clef-thematique="thematiqueId">
      <template v-slot:title>
        <h2 class="fr-h3 fr-mb-0">Pour aller plus loin</h2>
      </template>
    </ArticlesRecommandees>

    <section class="fr-mt-8w fr-mb-12w flex flex-column align-items--center">
      <img alt="" class="fr-mt-6w fr-mb-2w" src="/jumelle.svg" />

      <h2 class="fr-h3">Envie de voir ou de revoir toutes les actions ?</h2>

      <router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION }" class="fr-btn fr-btn--secondary">
        Accéder au catalogue
      </router-link>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, nextTick, onMounted, ref, watch } from 'vue';
  import { onBeforeRouteUpdate, useRoute } from 'vue-router';
  import ArticlesRecommandees from '@/components/custom/AccueilConnectee/ArticlesRecommandees.vue';
  import CatalogueActionsRecommandees from '@/components/custom/Action/Catalogue/CatalogueActionsRecommandees.vue';
  import WidgetAides from '@/components/custom/Aides/WidgetAides.vue';
  import Alert from '@/components/custom/Alert.vue';
  import ParcoursKYCPourRecommandations from '@/components/custom/Thematiques/ParcoursKYCPourRecommandations.vue';
  import WidgetsServicesAlimentation from '@/components/pages/WidgetsServicesAlimentation.vue';
  import WidgetsServicesMeDeplacer from '@/components/pages/WidgetsServicesMeDeplacer.vue';
  import WidgetsServicesMeLoger from '@/components/pages/WidgetsServicesMeLoger.vue';
  import WidgetsServicesMesAchats from '@/components/pages/WidgetsServicesMesAchats.vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ActionsDansUneThematiquePresenterImpl } from '@/domaines/actions/adapters/actionsDansUneThematique.presenter.impl';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { RecupererDetailThematiqueUsecase } from '@/domaines/actions/recupererDetailThematique.usecase';
  import { ThematiqueResumePresenterImpl } from '@/domaines/thematiques/adapters/thematiqueResume.presenter.impl';
  import { ThematiquesRepositoryAxios } from '@/domaines/thematiques/adapters/thematiques.repository.axios';
  import { ClefThematiqueAPI, MenuThematiques, Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { PersonnalisationThematiqueEffectueeUsecase } from '@/domaines/thematiques/personnalisationThematiqueEffectuee.usecase';
  import { ThematiqueResumeViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';
  import { ResetPersonnalisationUsecase } from '@/domaines/thematiques/resetPersonnalisation.usecase';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import useHeadProperties from '@/shell/useHeadProperties';
  import { utilisateurStore } from '@/store/utilisateur';

  const route = useRoute();
  const thematique = ref<Thematique>(MenuThematiques.getFromUrl(useRoute().params.id as string));
  const thematiqueId = ref<ClefThematiqueAPI>(thematique.value.clefTechniqueAPI as ClefThematiqueAPI);
  const idUtilisateur = utilisateurStore().utilisateur.id;
  const messageNgc = ref<string>('');
  const catalogueActionsRecoRef = ref<InstanceType<typeof CatalogueActionsRecommandees>>();

  useHead({
    ...useHeadProperties,
    title: computed(() => thematique.value && `${thematique.value.labelDansLeMenu}`),
  });

  onBeforeRouteUpdate(async (to, from, next) => {
    useHead({
      ...useHeadProperties,
      title: computed(() => thematique.value && `${thematique.value.labelDansLeMenu}`),
    });
    next();
  });

  watch(
    () => route.params.id,
    async newValue => {
      isLoading.value = true;

      thematique.value = MenuThematiques.getFromUrl(newValue as string);
      thematiqueId.value = thematique.value.clefTechniqueAPI as ClefThematiqueAPI;
      await chargerActionsRecommandees();

      isLoading.value = false;
    },
  );

  const actionsViewModel = ref<ActionViewModel[]>();
  const thematiqueResumeViewModel = ref<ThematiqueResumeViewModel>();
  const idEnchainementKycs = ref<string>();
  const isLoading = ref<boolean>(true);
  const thematiqueIllustrationPath = computed(() => {
    return `url(${thematique.value.illustration})`;
  });
  const chargerActionsRecommandeesUsecase = new RecupererDetailThematiqueUsecase(new ActionsRepositoryAxios());

  onMounted(async () => {
    isLoading.value = true;
    await chargerActionsRecommandees();
    isLoading.value = false;
  });

  async function chargerActionsRecommandees() {
    await chargerActionsRecommandeesUsecase.execute(
      idUtilisateur,
      thematiqueId.value,
      new ActionsDansUneThematiquePresenterImpl(
        vm => {
          actionsViewModel.value = vm;
          idEnchainementKycs.value = undefined;
        },
        (id: string, message: string) => {
          idEnchainementKycs.value = id;
          messageNgc.value = message;
        },
      ),
      new ThematiqueResumePresenterImpl(vm => (thematiqueResumeViewModel.value = vm)),
    );
  }

  async function chargerActionsRecommandeesAvecUnDelai() {
    const personnalisationThematiqueEffectueeUsecase = new PersonnalisationThematiqueEffectueeUsecase(
      new ThematiquesRepositoryAxios(),
    );

    personnalisationThematiqueEffectueeUsecase
      .execute(idUtilisateur, thematiqueId.value, ActionsEventBus.getInstance())
      .then(() => {
        setTimeout(async () => {
          await chargerActionsRecommandees();
          await nextTick();
          catalogueActionsRecoRef.value?.focus();
        }, 2000);
      });
  }

  async function resetParcours() {
    const resetPersonnalisationUsecase = new ResetPersonnalisationUsecase(new ThematiquesRepositoryAxios());
    await resetPersonnalisationUsecase.execute(idUtilisateur, thematiqueId.value);
    await chargerActionsRecommandees();
  }
</script>

<style scoped>
  .placeholder {
    min-height: 20rem;
  }

  .headerThematique {
    min-height: 20rem;
    background-image:
      v-bind(thematiqueIllustrationPath),
      linear-gradient(var(--beige-gris-galet-950-100), var(--beige-gris-galet-950-100));
    background-repeat: no-repeat;
    background-position: right top;
    @media all and (max-width: 767px) {
      background-image: linear-gradient(var(--beige-gris-galet-950-100), var(--beige-gris-galet-950-100));
    }
  }
</style>
