<template>
  <div class="fr-p-4w border border-radius--md background--white">
    <h2 class="fr-h4">
      Évolution de votre consommation électrique
      <span class="fr-text--md">(sur la base des relevés quotidiens de votre compteur Linky)</span>
    </h2>
    <div class="fr-grid-row flex-center fr-mb-3w">
      <ControleSegmente
        legende="Choix de la date de récupération des données"
        name="controle-segmente-selection-range-data"
        @update:value="handleValueChange"
        :segments="[
          { libelle: '15 derniers jours', value: VueGraphique.EN_CE_MOMENT, checked: true },
          { libelle: 'Mois par mois', value: VueGraphique.MOIS_PAR_MOIS },
        ]"
      />
    </div>
    <p v-if="vueGraphique === VueGraphique.MOIS_PAR_MOIS">
      Suivi de votre consommation électrique mois par mois en comparant l'année courante à l'année précédente. ⚡
    </p>
    <p v-if="vueGraphique === VueGraphique.EN_CE_MOMENT">
      Comparaison de votre consommation électrique pour la journée d'hier, le mois en cours et l'année en cours par
      rapport à l'année précédente. ⚡
    </p>
    <Bar
      v-if="consos"
      id="graphique-consommation-electrique"
      :options="{
        responsive: true,
        scales: {
          y: {
            ticks: {
              callback: value => `${value} kWh`,
            },
          },
        },
      }"
      :data="{
        labels: consos.libelles,
        datasets: [
          { label: 'année précédente', backgroundColor: '#6a6af4', data: consos.valeur_courante },
          { label: 'année courante', backgroundColor: '#000091', data: consos.valeur_precedente },
        ],
      }"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { Bar } from 'vue-chartjs';
  import ControleSegmente from '@/components/dsfr/ControleSegmente.vue';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { ObtenirConsommationElectriqueUsecase } from '@/linky/obtenirConsommationElectrique.usecase';
  import { LinkyRepositoryAxios } from '@/linky/adapters/linky.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ConsommationElectriqueViewModel, LinkyPresenterImpl } from '@/linky/adapters/linky.presenter.impl';
  import { ObtenirConsommationElectriqueDerniersJoursUsecase } from '@/linky/obtenirConsommationElectriqueDerniersJours.usecase';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  enum VueGraphique {
    EN_CE_MOMENT = '1',
    MOIS_PAR_MOIS = '2',
  }

  const consos = ref<ConsommationElectriqueViewModel>();
  const vueGraphique = ref<VueGraphique>(VueGraphique.EN_CE_MOMENT);

  function mapValuesConsommation(viewModel: ConsommationElectriqueViewModel) {
    consos.value = viewModel;
  }

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const obtenirConsommationElectriqueUsecase = new ObtenirConsommationElectriqueUsecase(new LinkyRepositoryAxios());

  async function handleValueChange(value) {
    vueGraphique.value = value;
    if (value === VueGraphique.EN_CE_MOMENT) {
      const obtenirConsommationElectriqueUsecaseDerniersJours = new ObtenirConsommationElectriqueDerniersJoursUsecase(
        new LinkyRepositoryAxios()
      );
      await obtenirConsommationElectriqueUsecaseDerniersJours.execute(
        idUtilisateur,
        new LinkyPresenterImpl(mapValuesConsommation)
      );
    } else {
      await obtenirConsommationElectriqueUsecase.execute(idUtilisateur, new LinkyPresenterImpl(mapValuesConsommation));
    }
  }

  onMounted(async () => {
    await obtenirConsommationElectriqueUsecase.execute(idUtilisateur, new LinkyPresenterImpl(mapValuesConsommation));
  });
</script>
