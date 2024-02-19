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
      <p>
        Suivi de votre consommation électrique mois par mois en comparant l'année courante à l'année précédente :
      </p>
    </p>
    <p v-if="vueGraphique === VueGraphique.EN_CE_MOMENT">
      Suivi de votre consommation électrique de vos 15 derniers jours :
    </p>
    <ul>
      <li v-for="(item, index) in consos?.commentaires" :key="index" v-html="item" />
    </ul>
    <Bar
      v-if="consos?.graphique"
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
        labels: consos?.graphique.libelles,
        datasets: [
          { label: 'année précédente', backgroundColor:  `${vueGraphique === VueGraphique.MOIS_PAR_MOIS ? '#6a6af4' : '#68A532'}` , data: consos?.graphique.valeur_courante },
          { label: 'année courante', backgroundColor: `${vueGraphique === VueGraphique.MOIS_PAR_MOIS ? '#000091' : '#447049'}`, data: consos?.graphique.valeur_precedente },
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
  import { ObtenirConsommationElectriqueAnnuelleUsecase } from '@/linky/obtenirConsommationElectriqueAnnuelle.usecase';
  import { LinkyRepositoryAxios } from '@/linky/adapters/linky.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ConsommationElectriqueViewModel, LinkyPresenterAnnuelleImpl } from '@/linky/adapters/linkyAnnuelle.presenter.impl';
  import { ObtenirConsommationElectriqueDerniersJoursUsecase } from '@/linky/obtenirConsommationElectriqueDerniersJours.usecase';
import { LinkyPresenterDerniersJoursImpl } from '@/linky/adapters/linkyDerniersJours.presenter.impl';

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
  const obtenirConsommationElectriqueUsecaseAnnuelle = new ObtenirConsommationElectriqueAnnuelleUsecase(new LinkyRepositoryAxios());
  const obtenirConsommationElectriqueUsecaseDerniersJours = new ObtenirConsommationElectriqueDerniersJoursUsecase(
    new LinkyRepositoryAxios()
  );

  async function handleValueChange(value) {
    vueGraphique.value = value;
    if (value === VueGraphique.EN_CE_MOMENT) {
      await obtenirConsommationElectriqueUsecaseDerniersJours.execute(
        idUtilisateur,
        new LinkyPresenterDerniersJoursImpl(mapValuesConsommation)
      );
    } else {
      await obtenirConsommationElectriqueUsecaseAnnuelle.execute(idUtilisateur, new LinkyPresenterAnnuelleImpl(mapValuesConsommation));
    }
  }

  onMounted(async () => {
    await obtenirConsommationElectriqueUsecaseDerniersJours.execute(idUtilisateur, new LinkyPresenterDerniersJoursImpl(mapValuesConsommation));
  });
</script>
