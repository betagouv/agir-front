<template>
  <div class="fr-p-4w border border-radius--md background--white">
    <h2 class="fr-h4">Ceci est le titre 2</h2>
    <p>
      Ceci est une petite description lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta perferendis modi
      optio cum deleniti voluptates. ⚡
    </p>
    <div class="fr-grid-row flex-center fr-mb-3w">
      <ControleSegmente
        legende="Choix de la date de récupération des données"
        name="controle-segmente-selection-range-data"
        @update:value="handleValueChange"
        :segments="[
          { libelle: 'dernière semaine', value: 'jour', checked: true },
          { libelle: 'dernier mois', value: 'semaine' },
          { libelle: '3 derniers mois', value: 'mois' },
        ]"
      />
    </div>
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
          { label: 'consomation', backgroundColor: '#000091', data: consos.valeur_kWh },
          { label: 'consomation recalculée', backgroundColor: '#6a6af4', data: consos.valeur_kWh_ajustée_temperature },
        ],
      }"
    />
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import ControleSegmente from '@/components/dsfr/ControleSegmente.vue';
  import { Bar } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { ObtenirConsommationElectriqueUsecase } from '@/linky/obtenirConsommationElectrique.usecase';
  import { LinkyRepositoryAxios } from '@/linky/adapters/linky.repository.axios';
  import { utilisateurStore } from '@/store/utilisateur';
  import { ConsommationElectriqueViewModel, LinkyPresenterImpl } from '@/linky/adapters/linky.presenter.impl';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const consos = ref<ConsommationElectriqueViewModel>();

  function mapValuesInteractions(viewModel: ConsommationElectriqueViewModel) {
    consos.value = viewModel;
  }
  const idUtilisateur = utilisateurStore().utilisateur.id;
  const obtenirConsommationElectriqueUsecase = new ObtenirConsommationElectriqueUsecase(new LinkyRepositoryAxios());

  async function handleValueChange(value) {
    await obtenirConsommationElectriqueUsecase.execute(
      idUtilisateur,
      value,
      7,
      new LinkyPresenterImpl(mapValuesInteractions)
    );
  }

  onMounted(async () => {
    await obtenirConsommationElectriqueUsecase.execute(
      idUtilisateur,
      'jour',
      7,
      new LinkyPresenterImpl(mapValuesInteractions)
    );
  });
</script>
