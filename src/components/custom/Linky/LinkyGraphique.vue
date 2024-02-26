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
          { libelle: '14 derniers jours', value: VueGraphique.QUATORZE_JOURS, checked: true },
          { libelle: 'Mois par mois', value: VueGraphique.MOIS_PAR_MOIS },
        ]"
      />
    </div>
    <p>{{ consos?.description }}</p>
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
          {
            label: 'année précédente',
            backgroundColor: consos.couleurValeur1,
            data: consos?.graphique.valeur_courante,
          },
          {
            label: 'année courante',
            backgroundColor: consos.couleurValeur2,
            data: consos?.graphique.valeur_precedente,
          },
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
  import { LinkyPresenterAnnuelleImpl } from '@/linky/adapters/linkyAnnuelle.presenter.impl';
  import { ConsommationElectriqueViewModel } from '@/linky/ports/linky.presenter';
  import { ObtenirConsommationElectriqueQuatorzeJoursUsecase } from '@/linky/obtenirConsommationElectriqueQuatorzeJours.usecase';
  import { LinkyPresenterQuatorzeJoursImpl } from '@/linky/adapters/linkyQuatorzeJours.presenter.impl';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  enum VueGraphique {
    QUATORZE_JOURS = '1',
    MOIS_PAR_MOIS = '2',
  }

  const consos = ref<ConsommationElectriqueViewModel>();
  const vueGraphique = ref<VueGraphique>(VueGraphique.QUATORZE_JOURS);

  function mapValuesConsommation(viewModel: ConsommationElectriqueViewModel) {
    consos.value = viewModel;
  }

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const obtenirConsommationElectriqueUsecaseAnnuelle = new ObtenirConsommationElectriqueAnnuelleUsecase(
    new LinkyRepositoryAxios()
  );
  const obtenirConsommationElectriqueQuatorzeJoursUsecase = new ObtenirConsommationElectriqueQuatorzeJoursUsecase(
    new LinkyRepositoryAxios()
  );

  async function handleValueChange(value) {
    vueGraphique.value = value;
    if (value === VueGraphique.QUATORZE_JOURS) {
      await obtenirConsommationElectriqueQuatorzeJoursUsecase.execute(
        idUtilisateur,
        new LinkyPresenterQuatorzeJoursImpl(mapValuesConsommation)
      );
    } else {
      await obtenirConsommationElectriqueUsecaseAnnuelle.execute(
        idUtilisateur,
        new LinkyPresenterAnnuelleImpl(mapValuesConsommation)
      );
    }
  }

  onMounted(async () => {
    await obtenirConsommationElectriqueQuatorzeJoursUsecase.execute(
      idUtilisateur,
      new LinkyPresenterQuatorzeJoursImpl(mapValuesConsommation)
    );
  });
</script>
