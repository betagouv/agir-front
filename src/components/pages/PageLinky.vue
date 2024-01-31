<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane
      page-courante="Ma consommation électrique"
      :page-hierarchie="[{ label: 'Services', url: 'agir/services' }]"
    />
    <h1 class="fr-h2">Ma consommation électrique</h1>
    <div v-if="isLoading">Chargement ...</div>
    <div v-else-if="!estConfigure" />
    <div v-else-if="!estActif">
      <p>Service en cours de connexion. Revenez plus tard pour consulter vos données</p>
    </div>
    <div v-else class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-md-9 fr-col-12">
        <LinkyGraphique />
      </div>
      <div class="fr-col-md-3 fr-col-12">
        <LinkyAside />
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
        <ServiceModaleParametreLinky service-id="linky" :prm="prm" />
      </template>
    </Modale>
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="linky">
      Modale configuration compteur linky
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

  const isLoading = ref(true);

  const prm = ref<string>('');
  const estConfigure = ref<boolean>();
  const estActif = ref<boolean>();

  onMounted(async () => {
    const obtenirInformationCompteurUsecase = new ObtenirInformationCompteurUsecase(new LinkyRepositoryAxios());
    const informationCompteur = await obtenirInformationCompteurUsecase.execute(utilisateurStore().utilisateur.id);

    prm.value = informationCompteur.prm;
    estConfigure.value = informationCompteur.estConfigure;
    estActif.value = informationCompteur.estActif;

    isLoading.value = false;

    if (!estConfigure.value) {
      const modaleActions = new ModaleActions('linky');
      modaleActions.open();
    }
  });
</script>
