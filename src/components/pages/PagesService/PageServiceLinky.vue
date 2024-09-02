<template>
  <div class="fr-container">
    <div v-if="isLoading">Chargement en cours ...</div>
    <p v-else-if="!serviceLinkyViewModel">Problème de chargement de donées</p>
    <div v-else>
      <FilDAriane
        page-courante="Service : linky"
        :page-hierarchie="[{ label: 'Univers - À la maison', url: `${RouteUniversName.UNIVERS}/logement` }]"
      />
      <h1 class="fr-h2">Suivre ma consommation <span class="text--bleu">d’électricité</span></h1>
      <PageServiceTemplate :aside="serviceLinkyViewModel.aside">
        <LinkyConfiguration
          v-if="!serviceLinkyViewModel.informationCompteur.estConfigure"
          :prm="serviceLinkyViewModel.informationCompteur.prm"
        />
        <LinkyEnAttente v-else-if="!serviceLinkyViewModel.informationCompteur.estFonctionnel" />
        <div v-else-if="serviceLinkyViewModel.informationCompteur.estActif">
          <!-- METTRE ICI COMPOSANT GRAPHIQUE AVEC USECASE DIRECTEMENT A L'INTERIEUR -->
        </div>
      </PageServiceTemplate>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import LinkyConfiguration from '@/components/custom/Linky/LinkyConfiguration.vue';
  import LinkyEnAttente from '@/components/custom/Linky/LinkyEnAttente.vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceLinkyViewModel,
    ServiceRechercheLinkyPresenterImpl,
  } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheLinky.presenter.impl';
  import { ServiceRechercheLinkyRepositoryAxios } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheLinky.repository.axios';
  import { ObtenirInformationCompteurUsecase } from '@/domaines/serviceRecherche/linky/obtenirInformationCompteur.usecase';
  import { RouteUniversName } from '@/router/univers/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const { id: utilisateurId } = utilisateurStore().utilisateur;
  const isLoading = ref<boolean>(true);
  const serviceLinkyViewModel = ref<ServiceLinkyViewModel>();

  const usecase = new ObtenirInformationCompteurUsecase(new ServiceRechercheLinkyRepositoryAxios());

  onMounted(async () => {
    await usecase.execute(
      utilisateurId,
      new ServiceRechercheLinkyPresenterImpl(vm => (serviceLinkyViewModel.value = vm)),
    );

    isLoading.value = false;
  });
</script>
