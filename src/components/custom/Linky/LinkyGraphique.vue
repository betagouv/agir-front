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
          { libelle: 'comparaison annuelle', value: 'jour', checked: true },
          { libelle: 'en cours ...', value: 'semaine' },
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
          { label: 'consomation 2022', backgroundColor: '#6a6af4', data: consos.valeur_courante },
          { label: 'consomation 2023', backgroundColor: '#000091', data: consos.valeur_precedente },
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

  function mapValuesConsommation(viewModel: ConsommationElectriqueViewModel) {
    consos.value = viewModel;
  }

  const idUtilisateur = utilisateurStore().utilisateur.id;
  const obtenirConsommationElectriqueUsecase = new ObtenirConsommationElectriqueUsecase(new LinkyRepositoryAxios());

  async function handleValueChange() {
    await obtenirConsommationElectriqueUsecase.execute(idUtilisateur, new LinkyPresenterImpl(mapValuesConsommation));
  }

  onMounted(async () => {
    await obtenirConsommationElectriqueUsecase.execute(idUtilisateur, new LinkyPresenterImpl(mapValuesConsommation));
  });
</script>
