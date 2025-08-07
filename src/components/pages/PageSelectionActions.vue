<template>
  <section>
    <div class="background--vert-clair fr-py-6w headerSelectionActions">
      <div class="fr-container">
        <h1 class="fr-h1 fr-mt-4w fr-mb-4w">{{ titre?.titre }}</h1>

        <p>{{ titre?.description }}</p>
      </div>
    </div>

    <div class="fr-container fr-mt-n4w">
      <CatalogueActionsComposant
        v-if="actionsViewModel"
        :actions="actionsViewModel"
        :insert-custom-card-at="2"
        card-classes="fr-col-12 fr-col-md-3"
      >
        <template #custom-card>
          <div class="full-height full-width background--bleu-dark text--white fr-p-2w">
            <h2 class="fr-h6 text--white fr-mb-2w">
              Envie de voir des actions qui
              <span class="underline-courbe underline-courbe--turquoise">vous</span> correspondent ?
            </h2>
            <p>
              Agissez selon vos <span class="text--bold">envies</span>, vos <span class="text--bold">moyens</span> et
              <span class="text--bold">mode de vie</span> !
            </p>
            <form class="flex align-items--end flex-column" @submit.prevent="performCreerCompteUtilisateur">
              <InputText
                v-model="compteUtilisateurInput.mail"
                autocomplete="email"
                class="full-width fr-mb-2w"
                label="Mon adresse e-mail"
                label-class="text--white"
                name="email"
              />
              <button class="fr-btn border--white">Valider</button>
            </form>
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
  import InputText from '@/components/dsfr/InputText.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { TitreCatalogueRepositoryAxios } from '@/domaines/actions/adapters/titreCatalogue.repository.axios';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { TitreCatalogue } from '@/domaines/actions/ports/titreCatalogue.repository';
  import { RecupererCatalogueActionsMaifUsecase } from '@/domaines/actions/recupererCatalogueActionsMaif.usecase';
  import { RecupererCatalogueActionsWinterUsecase } from '@/domaines/actions/recupererCatalogueActionsWinter.usecase';
  import { RecupererTitreCataloguePartenaireUsecase } from '@/domaines/actions/recupererTitreCataloguePartenaireUsecase';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { CompteUtilisateurRepositoryImpl } from '@/domaines/compte/adapters/compteUtilisateur.repository.impl';
  import { CreerComptePresenterImpl } from '@/domaines/compte/adapters/creerComptePresenterImpl';
  import { CreerCompteUtilisateurUsecase, UserInput } from '@/domaines/compte/creerCompteUtilisateur.usecase';
  import router from '@/router';
  import useHeadProperties from '@/shell/useHeadProperties';

  const titre = ref<TitreCatalogue>();

  useHead({
    ...useHeadProperties,
    title: computed(() => titre.value?.titre && `${titre.value.titre}`),
  });
  const imagePath = ref<string>('url(/thematique-logement.svg)');
  const actionsViewModel = ref<ActionViewModel[]>();
  const catalogueActionsPresenter = new CatalogueActionsPresenterImpl(
    () => {},
    actions => {
      actionsViewModel.value = actions;
    },
  );

  onMounted(async () => {
    const selection = useRouter().currentRoute.value.query.selection as 'actions_watt_watchers' | 'risques_naturels';
    const titreUsecase = new RecupererTitreCataloguePartenaireUsecase(new TitreCatalogueRepositoryAxios());
    await titreUsecase.execute(selection, titreRecupere => {
      imagePath.value = titreRecupere.image;
      titre.value = titreRecupere;
    });

    if (selection === 'actions_watt_watchers') {
      const usecase = new RecupererCatalogueActionsWinterUsecase(new ActionsRepositoryAxios());
      await usecase.execute('', catalogueActionsPresenter);
    } else if (selection === 'risques_naturels') {
      const usecase = new RecupererCatalogueActionsMaifUsecase(new ActionsRepositoryAxios());
      await usecase.execute(catalogueActionsPresenter);
    }
  });

  let compteUtilisateurInput = ref<UserInput>({
    mail: '',
    situationId: null,
  });
  const performCreerCompteUtilisateur = async () => {
    const creeCompteUseCase = new CreerCompteUtilisateurUsecase(
      new CompteUtilisateurRepositoryImpl(),
      new SessionRepositoryStore(),
    );
    await creeCompteUseCase.execute(
      new CreerComptePresenterImpl(viewModel => {
        router.push({ name: viewModel.route });
      }),
      { ...compteUtilisateurInput.value, situationId: null },
    );
  };
</script>

<style scoped>
  .background--vert-clair {
    background-color: #f4f4eb;
  }

  .headerSelectionActions {
    background-image: v-bind('imagePath');
    background-repeat: no-repeat;
    background-position: right top;
    @media all and (max-width: 767px) {
      background-image: none;
    }
  }
</style>
