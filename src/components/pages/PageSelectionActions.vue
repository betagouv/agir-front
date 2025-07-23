<template>
  <section>
    <div class="background--vert-clair fr-py-6w headerSelectionActions">
      <div class="fr-container">
        <!--    TODO: changer le titre-->
        <h1 class="fr-h1 fr-mt-4w fr-mb-4w">Vous déménagez ?</h1>

        <!--    TODO: changer la description-->
        <p>Découvrez les bons plans pour votre porte-monnaie et pour le climat !</p>
      </div>
    </div>

    <div class="fr-container fr-mt-n4w">
      <CatalogueActionsComposant
        card-classes="fr-col-12 fr-col-md-3"
        v-if="actionsViewModel"
        :actions="actionsViewModel"
        :insert-custom-card-at="2"
      >
        <template #custom-card>
          <div class="full-height full-width background--bleu-dark text--white fr-p-2w">
            <h2 class="fr-h6 text--white fr-mb-2w">
              Envie de voir des actions qui <span class="underline-courbe-turquoise">vous</span> correspondent ?
            </h2>
            <p>
              Agissez selon vos <span class="text--bold">envies</span>, vos <span class="text--bold">moyens</span> et
              <span class="text--bold">mode de vie</span> !
            </p>
            <form @submit.prevent class="flex align-items--end flex-column">
              <InputText
                class="full-width fr-mb-2w"
                v-model="email"
                label="Mon adresse e-mail"
                name="email"
                autocomplete="email"
                label-class="text--white"
              />
              <!--              TODO-->
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

<script setup lang="ts">
  import { useHead } from '@unhead/vue';
  import { computed, onMounted, ref } from 'vue';
  import RedirectionMobile from '@/components/custom/AccueilConnectee/RedirectionMobile.vue';
  import CatalogueActionsComposant from '@/components/custom/Action/Catalogue/CatalogueActionsComposant.vue';
  import InputMail from '@/components/dsfr/InputMail.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { CatalogueActionsPresenterImpl } from '@/domaines/actions/adapters/catalogueActions.presenter.impl';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { FiltresCatalogueActionsViewModel } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { RecupererCatalogueActionsUsecase } from '@/domaines/actions/recupererCatalogueActions.usecase';
  import useHeadProperties from '@/shell/useHeadProperties';
  import { utilisateurStore } from '@/store/utilisateur';

  // TODO: Mettre en titre le titre
  // useHead({
  //   ...useHeadProperties,
  //   title: computed(() => actionBaseViewModel.value?.titrePropre && `${actionBaseViewModel.value.titrePropre}`),
  // });
  // TODO: Mettre l'url
  const imagePath = ref<string>('url(/thematique-logement.svg)');
  const email = ref<string>('');

  const actionsViewModel = ref<ActionViewModel[]>();
  const catalogueActionsPresenter = new CatalogueActionsPresenterImpl(
    () => {},
    actions => {
      actionsViewModel.value = actions;
    },
  );

  onMounted(async () => {
    const usecase = new RecupererCatalogueActionsUsecase(new ActionsRepositoryAxios());
    const idUtilisateur = utilisateurStore().utilisateur.id;
    await usecase.execute(idUtilisateur, catalogueActionsPresenter);
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
    @media all and (max-width: 767px) {
      background-image: none;
    }
  }

  .underline-courbe-turquoise {
    position: relative;
  }

  .underline-courbe-turquoise::after {
    content: '';
    position: absolute;
    top: 95%;
    left: 0;
    height: 7px;
    width: 100%;
    border: solid 3px;
    border-color: #00bcd4 transparent transparent transparent;
    border-radius: 50%;
  }
</style>
