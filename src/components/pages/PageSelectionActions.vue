<template>
  <section>
    <div class="background--vert-clair fr-py-6w headerSelectionActions">
      <div class="fr-container">
        <h1 class="fr-h1 fr-mt-3w fr-mb-4w">{{ titre?.titre }}</h1>

        <p class="width--50" v-if="titre?.description">{{ titre?.description }}</p>
      </div>
    </div>

    <div class="fr-container fr-mt-n4w">
      <CatalogueActionsComposant
        v-if="actionsViewModel"
        :actions="actionsViewModel"
        :insert-custom-card-at="!estConnecte ? 2 : undefined"
        card-classes="fr-col-12 fr-col-sm-6 fr-col-md-4 fr-col-xl-3"
      >
        <template #custom-card v-if="!estConnecte">
          <div class="full-height full-width background--bleu-dark text--white fr-p-2w flex flex-column">
            <h2 class="fr-h6 text--white fr-mb-1w">
              Envie de voir des actions qui
              <span class="underline-courbe underline-courbe--turquoise">vous</span> correspondent ?
            </h2>
            <p class="fr-mb-2w">
              Agissez selon vos <span class="text--bold">envies</span>, vos <span class="text--bold">moyens</span> et
              <span class="text--bold">votre mode de vie</span> !
            </p>
            <CreationCompteRapideFormulaire
              class="flex align-items--end flex-column flex-space-between full-height"
              :label="{ class: 'text--white' }"
              :bouton="{ class: 'fr-btn border--white' }"
              input-class="full-width fr-mb-1w"
            />
          </div>
        </template>
      </CatalogueActionsComposant>
    </div>
  </section>

  <section class="background--sable fr-mt-5w">
    <RedirectionMobile />
  </section>
</template>

<script lang="ts" setup>
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import RedirectionMobile from '@/components/custom/AccueilConnectee/RedirectionMobile.vue';
  import CatalogueActionsComposant from '@/components/custom/Action/Catalogue/CatalogueActionsComposant.vue';
  import CreationCompteRapideFormulaire from '@/components/custom/CreationCompte/CreationCompteRapideFormulaire.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { TitreCatalogueRepositoryAxios } from '@/domaines/actions/adapters/titreCatalogue.repository.axios';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { TitreCatalogue } from '@/domaines/actions/ports/titreCatalogue.repository';
  import { RecupererSelectionActionsUsecase } from '@/domaines/actions/recupererCatalogueActionsSelection.usecase';
  import { RecupererCatalogueActionsWinterUsecase } from '@/domaines/actions/recupererCatalogueActionsWinter.usecase';
  import { RecupererTitreCataloguePartenaireUsecase } from '@/domaines/actions/recupererTitreCataloguePartenaireUsecase';
  import { RefererRepositoryStore } from '@/domaines/compte/adapters/referer.repository.store';
  import { EnregistrerRefererUsecase } from '@/domaines/compte/enregistrerReferer.usecase';
  import useHeadProperties from '@/shell/useHeadProperties';
  import { utilisateurStore } from '@/store/utilisateur';

  const titre = ref<TitreCatalogue>();
  const router = useRouter();
  const estConnecte = computed(() => utilisateurStore().estConnecte);

  useHead({
    ...useHeadProperties,
    title: computed(() => titre.value?.titre && `${titre.value.titre}`),
  });
  const imagePath = ref<string>(`url(/${titre.value?.image})`);
  const actionsViewModel = ref<ActionViewModel[]>();
  const catalogueActionsPresenter = new CatalogueActionsPresenterImpl(
    () => {},
    actions => {
      actionsViewModel.value = actions;
    },
  );

  onMounted(async () => {
    const selection = router.currentRoute.value.query.selection as
      | 'actions_watt_watchers'
      | 'risques_naturels'
      | 'semaine_mobilite';
    const titreUsecase = new RecupererTitreCataloguePartenaireUsecase(new TitreCatalogueRepositoryAxios());
    await titreUsecase.execute(selection, titreRecupere => {
      imagePath.value = `url(${titreRecupere.image})`;
      titre.value = titreRecupere;
    });

    if (selection === 'actions_watt_watchers') {
      const usecase = new RecupererCatalogueActionsWinterUsecase(new ActionsRepositoryAxios());
      await usecase.execute('', catalogueActionsPresenter);
    } else {
      const usecase = new RecupererSelectionActionsUsecase(new ActionsRepositoryAxios());
      await usecase.execute(selection, catalogueActionsPresenter);
    }

    if (!estConnecte.value) {
      const referer = router.currentRoute.value.query.referer as string;
      const refererKeyword = router.currentRoute.value.query.referer_keyword as string;
      const enregistrerRefererUsecase = new EnregistrerRefererUsecase(new RefererRepositoryStore());
      enregistrerRefererUsecase.execute(referer, refererKeyword);
    }
  });
</script>

<style scoped>
  .background--vert-clair {
    background-color: #f4f4eb;
  }

  .headerSelectionActions {
    background-image: v-bind('imagePath');
    background-repeat: no-repeat;
    background-position: right top;
    background-size: contain;
    @media all and (max-width: 767px) {
      background-image: none;
    }
  }

  .width--50 {
    width: 70%;
  }
</style>
