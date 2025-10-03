<template>
  <div class="fr-container fr-pt-5w fr-pb-3w">
    <h1 class="fr-h2 fr-mb-1w">Bonjour {{ utilisateur.pseudo }},</h1>
    <h2 class="text--normal fr-text--lg">Il est temps d'agir, choisissez votre prochaine action !</h2>

    <BallLoader v-if="estEnChargement" text="Nous préparons vos recommandations personnalisées..." />
    <ListeCartesActions
      heading-type="h3"
      class="fr-mb-3w"
      v-else-if="actionsViewModel"
      :actions="actionsViewModel"
      card-classes="fr-col-12 fr-col-md-6 fr-col-xl-4"
    />

    <RecommandationEncartCompletion
      :completionGlobaleRecommandations="completionGlobaleRecommandations"
      :thematiquesEtCompletion="thematiquesEtCompletion"
    />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import RecommandationEncartCompletion from '@/components/custom/AccueilConnectee/RecommandationEncartCompletion.vue';
  import ListeCartesActions from '@/components/custom/Action/Catalogue/ListeCartesActions.vue';
  import BallLoader from '@/components/custom/BallLoader.vue';
  import { AccueilConnecteViewModel } from '@/domaines/accueilConnecte/ports/accueilConnecte.presenter';
  import { ActionsPresenterImpl } from '@/domaines/actions/adapters/actions.presenter.impl';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { ChargerActionsRecommandeesGlobalesUsecase } from '@/domaines/actions/chargerActionsRecommandeesGlobales.usecase';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  defineProps<{
    completionGlobaleRecommandations: number;
    thematiquesEtCompletion: AccueilConnecteViewModel['thematiquesEtCompletion'];
  }>();

  const estEnChargement = ref<boolean>(true);
  const actionsViewModel = ref<ActionViewModel[]>([]);
  const utilisateur = utilisateurStore().utilisateur;
  const chargerActionsRecommandeesGlobales = new ChargerActionsRecommandeesGlobalesUsecase(
    new ActionsRepositoryAxios(),
  );

  onMounted(async () => {
    await chargerActionsRecommandeesGlobales.execute(
      utilisateur.id,
      new ActionsPresenterImpl(actions => {
        actionsViewModel.value = actions;
      }),
    );
    estEnChargement.value = false;
  });
</script>
