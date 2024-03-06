<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane
      page-courante="Ma consommation électrique"
      :page-hierarchie="[{ label: 'Services', url: 'agir/services' }]"
    />
    <h1 class="fr-h2">Ma consommation électrique</h1>
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="informationCompteurViewModel" class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-9 fr-col-12">
        <p v-if="!informationCompteurViewModel.estConfigure">
          Service en cours de connexion. Revenez plus tard pour consulter vos données
        </p>
        <p v-else-if="!informationCompteurViewModel.estActif">
          Récupération des données en cours. Revenez plus tard pour les consulter.
        </p>
        <p v-else-if="!informationCompteurViewModel.estFonctionnel">
          Récupération des données en cours. Revenez plus tard pour les consulter.
        </p>
        <LinkyGraphique v-else-if="informationCompteurViewModel.estFonctionnel" />
      </div>
      <div class="fr-col-md-3 fr-col-12">
        <LinkyAside :est-actif="informationCompteurViewModel.estActif" />
      </div>
    </div>
  </div>
  <Teleport to="body">
    <Modale
      label="Modale de paramétrage du service Linky"
      id="linky"
      :radius="false"
      :is-footer-actions="false"
      size="m"
    >
      <template v-slot:contenu>
        <ServiceModaleParametreLinky
          service-id="linky"
          :prm="informationCompteurViewModel && informationCompteurViewModel.prm"
        />
      </template>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="linky">
      Modale configuration compteur Linky
    </button>
  </Teleport>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ObtenirInformationCompteurUsecase } from '@/linky/obtenirInformationCompteur.usecase';
  import { LinkyRepositoryAxios } from '@/linky/adapters/linky.repository.axios';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import LinkyGraphique from '@/components/custom/Linky/LinkyGraphique.vue';
  import LinkyAside from '@/components/custom/Linky/LinkyAside.vue';
  import ModaleActions from '@/components/custom/Modale/ModaleActions';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import ServiceModaleParametreLinky from '@/components/custom/Linky/ServiceModaleParametreLinky.vue';
  import { InformationCompteurViewModel } from '@/linky/ports/linky.information.presenter';
  import { LinkyPresenterInformationImpl } from '@/linky/adapters/linkyInformation.presenter.impl';

  const isLoading = ref(true);

  const informationCompteurViewModel = ref<InformationCompteurViewModel>();

  function mapValuesInformation(viewModel: InformationCompteurViewModel) {
    informationCompteurViewModel.value = viewModel;
  }

  onMounted(async () => {
    const obtenirInformationCompteurUsecase = new ObtenirInformationCompteurUsecase(new LinkyRepositoryAxios());
    await obtenirInformationCompteurUsecase.execute(
      utilisateurStore().utilisateur.id,
      new LinkyPresenterInformationImpl(mapValuesInformation),
    );

    isLoading.value = false;

    if (informationCompteurViewModel.value?.doitOuvrirLaModaleDeConfiguration) {
      const modaleActions = new ModaleActions('linky');
      modaleActions.open();
    }
  });
</script>
