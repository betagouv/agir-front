<template>
  <CompteSkeleton page-courante="Mon Compte - Mes actions">
    <h2 class="fr-h2">Mes actions</h2>
    <div v-if="defisViewModel?.enCours && defisViewModel.enCours.length > 0">
      <h3 class="fr-h3 fr-my-6w">Mes actions en cours</h3>
      <div v-for="defiViewModel in defisViewModel.enCours" :key="defiViewModel.id" class="fr-mb-4w">
        <h3 class="fr-h4 fr-mb-2w">
          {{ defiViewModel.libelle }}
        </h3>
        <div class="fr-grid-row flex-column fr-grid-row--top">
          {{ defiViewModel.reponse }}
          <router-link class="fr-mt-4v" :to="{ name: RouteDefiName.DEFI, params: { id: defiViewModel.id } }">
            Modifier ma réponse
          </router-link>
        </div>
      </div>
    </div>
    <div v-if="defisViewModel?.termine && defisViewModel.termine.length > 0">
      <h3 class="fr-h3 fr-my-6w">Mes actions terminées</h3>
      <div v-for="defiViewModel in defisViewModel?.termine" :key="defiViewModel.id" class="fr-mb-4w">
        <h3 class="fr-h4 fr-mb-2w">
          {{ defiViewModel.libelle }}
        </h3>
        <div class="fr-grid-row flex-column fr-grid-row--top">
          {{ defiViewModel.reponse }}
        </div>
      </div>
    </div>
    <div v-if="defisViewModel?.abandonne && defisViewModel.abandonne.length > 0">
      <h3 class="fr-h3 fr-my-6w">Mes actions non réalisées</h3>
      <div v-for="defiViewModel in defisViewModel?.abandonne" :key="defiViewModel.id" class="fr-mb-4w">
        <h3 class="fr-h4 fr-mb-2w">
          {{ defiViewModel.libelle }}
        </h3>
        <div class="fr-grid-row flex-column fr-grid-row--top">
          <p>{{ defiViewModel.reponse }}</p>
          <p>{{ defiViewModel.explication }}</p>
        </div>
        <router-link class="fr-mt-4v" :to="{ name: RouteDefiName.DEFI, params: { id: defiViewModel.id } }">
          Modifier ma réponse
        </router-link>
      </div>
    </div>
    <p v-if="defisViewModel?.pasDeDefi">Vous n'avez pas encore de défis en cours</p>
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { DefiRepositoryAxios } from '@/domaines/defi/adapters/defi.repository.axios';
  import { ListeDefisPresenterImpl } from '@/domaines/defi/adapters/listeDefis.presenter.impl';
  import { DefisQuestionViewModel } from '@/domaines/defi/ports/listeDefis.presenter';
  import { RecupererTousLesDefisUsecase } from '@/domaines/defi/recupererTousLesDefis.usecase';
  import { RouteDefiName } from '@/router/defis/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const defisViewModel = ref<DefisQuestionViewModel>();

  new RecupererTousLesDefisUsecase(new DefiRepositoryAxios()).execute(
    utilisateurStore().utilisateur.id,
    new ListeDefisPresenterImpl(defis => {
      defisViewModel.value = defis;
    }),
  );
</script>
