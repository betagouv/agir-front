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

    <div class="fr-col-md-9 fr-col-12 fr-mt-4w">
      <CarteInfo class="fr-p-4w fr-mb-4w">
        <h2>D'où provient ma consommation ?</h2>
        <p class="fr-text--bold fr-text--xl">Environ 66% de notre consommation est dû à notre chauffage.</p>
        <p class="fr-mb-0 fr-text--bold">Retrouvez ici les appareils éléctriques les plus consommateurs :</p>
        <ol>
          <li>Éclairage (~ 450 kWh/an)</li>
          <li>Réfrigérateur (~ 473 kWh/an)</li>
          <li>Téléviseur (~ 358 kWh/an)</li>
          <li>Four (~ 315 kWh/an)</li>
          <li>Lave-vaisselle (~ 303 kWh/an)</li>
        </ol>
        <p>
          Vous pouvez réduire votre consommation en <strong>baissant votre chauffage</strong> ou
          <strong>en adaptant l'utilisation de ces appareils à vos besoins</strong>.<br />
          Vous pouvez aussi choisir des appareils dont la classe d'énergie est comprise
          <strong>entre A et A+++</strong> pour qu'ils soient plus économes.
        </p>
        <p class="fr-mb-0">
          Source :
          <a href="https://www.hellowatt.fr/suivi-consommation-energie/consommation-electrique/" target="_blank">
            Estimation hellowatt sur les équipements électriques
          </a>
        </p>
      </CarteInfo>
      <div class="fr-p-4w border border-radius--md background--white">
        <h2>Comparaison avec d'autres foyers :</h2>
        <p>
          En France la consommation d’électricité est en moyenne de 185 kWh par personne par mois soit et environ 6 kWh
          par jour (<a href="https://www.rte-france.com/actualites/bilan-electrique-francais-2020" target="_blank"
            >RTE, 2020</a
          >).
        </p>

        <Table
          titre="Consommation moyenne d’un logement tout électrique en France :"
          titre-style="fr-text--md"
          :titres-donnees="[
            'Taille du foyer',
            'Caractéristiques techniques',
            'Consommation électrique moyenne (par mois)',
            'Prix de la consommation électrique mensuelle TTC',
          ]"
          :donnees="[
            ['🧍 Personne seule dans un studio de 20m²', 'Puissance du compteur 6kVA option Base', '200 kWh', '43 €'],
            [
              '👬 Couple dans un appartement de 60m²',
              'Puissance du compteur 6 kVA option Heures Pleines / Heures Creuses',
              '600 kWh',
              '110 €',
            ],
            [
              '👩‍👩‍👦‍👦 Famille de 4 personnes dans une maison de 120m²',
              'Puissance du compteur 12 kVA option Heures Pleines / Heures Creuses',
              '1 580 kWh',
              '275 €',
            ],
          ]"
        />
        <p class="fr-mb-0">
          Source:
          <a
            href="https://www.hellowatt.fr/suivi-consommation-energie/consommation-electrique/consommation-electrique-moyenne-mois"
            target="_blank"
            >Estimation Hello Watt au tarif réglementé EDF, mars 2024
          </a>
        </p>
      </div>
      <p v-if="informationCompteurViewModel?.estActif" class="fr-text--sm fr-mt-2w fr-mb-0">
        Si vous souhaitez changer de compteur Linky pour faire votre suivi, désinstallez puis installez
        <router-link to="#">le service</router-link>.
      </p>
    </div>
  </div>
  <Teleport to="body">
    <Modale
      label="Modale de paramétrage du service Linky"
      id="linkyModale"
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
    <button class="fr-btn fr-hidden" data-fr-opened="false" aria-controls="linkyModale">
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
  import Table from '@/components/dsfr/Table.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';

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
      const modaleActions = new ModaleActions('linkyModale');
      modaleActions.open();
    }
  });
</script>
