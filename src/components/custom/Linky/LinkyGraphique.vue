<template>
  <div class="fr-p-4w border border-radius--md background--white">
    <h2 class="fr-h4">
      Évolution de votre consommation électrique
      <span class="fr-text--md">(sur la base des relevés quotidiens de votre compteur Linky)</span>
    </h2>
    <p>Suivi de votre consommation électrique mois par mois en comparant l'année courante à l'année précédente. ⚡</p>
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

  onMounted(async () => {
    await obtenirConsommationElectriqueUsecase.execute(idUtilisateur, new LinkyPresenterImpl(mapValuesConsommation));
  });
</script>
