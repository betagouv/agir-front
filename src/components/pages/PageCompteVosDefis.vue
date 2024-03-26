<template>
  <CompteSkeleton page-courante="Mon Compte - Vos défis">
    <h2 class="fr-h2">Vos défis</h2>
    <div v-if="defisViewModel?.enCours && defisViewModel.enCours.length > 0">
      <h3 class="fr-h3 fr-my-6w">Vos défis en cours</h3>
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
      <h3 class="fr-h3 fr-my-6w">Vos défis terminés</h3>
      <div v-for="defiViewModel in defisViewModel?.termine" :key="defiViewModel.id" class="fr-mb-4w">
        <h3 class="fr-h4 fr-mb-2w">
          {{ defiViewModel.libelle }}
        </h3>
        <div class="fr-grid-row flex-column fr-grid-row--top">
          {{ defiViewModel.reponse }}
        </div>
      </div>
    </div>
    <p v-if="defisViewModel?.pasDeDefi">Vous n'avez pas encore de défis en cours</p>
  </CompteSkeleton>
</template>

<script setup lang="ts">
  import CompteSkeleton from '@/components/custom/Compte/CompteSkeleton.vue';
  import { ref } from 'vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import { RouteDefiName } from '@/router/defis/routes';
  import { RecupererListeDefisUsecase } from '@/defi/recupererListeDefis.usecase';
  import { DefiRepositoryAxios } from '@/defi/adapters/defi.repository.axios';
  import { ListeDefisPresenterImpl } from '@/defi/adapters/listeDefis.presenter.impl';
  import { DefisQuestionViewModel } from '@/defi/ports/listeDefis.presenter';

  const defisViewModel = ref<DefisQuestionViewModel>();

  new RecupererListeDefisUsecase(new DefiRepositoryAxios()).execute(
    utilisateurStore().utilisateur.id,
    new ListeDefisPresenterImpl(defis => {
      defisViewModel.value = defis;
    }),
  );
</script>
