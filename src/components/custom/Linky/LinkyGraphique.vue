<template>
  <!-- <div class="fr-p-4w border border-radius--md background--white">
    <h2 class="fr-h4">
      Évolution de votre consommation électrique
      <span class="fr-text--md">(sur la base des relevés quotidiens de votre compteur Linky)</span>
    </h2> -->
  <Onglet label-aria="Sélection de votre intervalle de consommation électrique" :tab-panel="['Par jour', 'Par mois']">
    <template v-slot:tab-0>JOUR </template>
    <template v-slot:tab-1>MOIS </template>
  </Onglet>
  <p>{{ consos?.description }}</p>
  <ul>
    <li v-for="(item, index) in consos?.commentaires" :key="index" v-html="item" />
  </ul>
  <div v-if="consos?.graphique">
    <Bar
      id="graphique-consommation-electrique"
      class="fr-mb-4w"
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
            data: consos?.graphique.valeur_precedente,
          },
          {
            label: 'année courante',
            backgroundColor: consos.couleurValeur2,
            data: consos?.graphique.valeur_courante,
          },
        ],
      }"
    />
    <Transcription titre="Transcription du graphique" id="graphique-linky" :est-ouvert="false">
      <Table
        :tableau-double-legende="true"
        :titre="`${consos.titre}`"
        :titres-donnees="['', ...consos?.graphique.libelles]"
        :donnees="[
          ['Année précédente', ...consos?.graphique.valeur_precedente_transcription],
          ['Année courante', ...consos?.graphique.valeur_courante_transcription],
        ]"
      />
    </Transcription>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
  import { onMounted, ref } from 'vue';
  import { Bar } from 'vue-chartjs';
  // import ControleSegmente from '@/components/dsfr/ControleSegmente.vue';
  import Onglet from '@/components/dsfr/Onglet.vue';
  import Table from '@/components/dsfr/Table.vue';
  import Transcription from '@/components/dsfr/Transcription.vue';
  // import { LinkyRepositoryAxios } from '@/domaines/linky/adapters/linky.repository.axios';
  // import { LinkyPresenterAnnuelleImpl } from '@/domaines/linky/adapters/linkyAnnuelle.presenter.impl';
  // import { LinkyPresenterQuatorzeJoursImpl } from '@/domaines/linky/adapters/linkyQuatorzeJours.presenter.impl';
  // import { ObtenirConsommationElectriqueAnnuelleUsecase } from '@/domaines/linky/obtenirConsommationElectriqueAnnuelle.usecase';
  // import { ObtenirConsommationElectriqueQuatorzeJoursUsecase } from '@/domaines/linky/obtenirConsommationElectriqueQuatorzeJours.usecase';
  // import { ConsommationElectriqueViewModel } from '@/domaines/linky/ports/linky.presenter';
  import { ServiceRechercheLinkyRepositoryAxios } from '@/domaines/serviceRecherche/linky/adapters/serviceRechercheLinky.repository.axios';
  import { RecupererConsommationElectriqueUsecase } from '@/domaines/serviceRecherche/linky/recupererConsommationElectrique.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

  const consos = ref();

  onMounted(async () => {
    const recupererConsommationElectriqueUsecase = new RecupererConsommationElectriqueUsecase(
      new ServiceRechercheLinkyRepositoryAxios(),
    );
    await recupererConsommationElectriqueUsecase.execute(utilisateurStore().utilisateur.id);
  });
</script>
