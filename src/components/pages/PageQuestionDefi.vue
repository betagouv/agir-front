<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane page-courante="Défi" />
    <h1 class="fr-h2">Relevez le défi !</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <div class="fr-grid-row fr-grid-row--gutters" v-else-if="!isLoading && defiViewModel">
      <div class="fr-col-8">
        <div class="background--white border fr-p-4w border-radius--md">
          <span class="display-block fr-mb-2w fr-mr-1w fr-tag background-bleu text--white">Action</span>
          <span class="display-block fr-text--bold fr-mb-1w fr-text--sm text--black">{{
            defiViewModel.thematique
          }}</span>
          <form @submit.prevent="validerLaReponse" v-if="!reponseAEteDonnee">
            <BoutonRadio
              col=""
              legende-size="l"
              :legende="defiViewModel.libelle"
              name="toto"
              orientation="horizontal"
              :options="
                defiViewModel.reponses_possibles.map((reponsePossible: ReponsePossible) => ({
                  label: reponsePossible.label,
                  value: reponsePossible.id,
                }))
              "
              :description="defiViewModel.description"
              v-model="reponse"
              :default-value="reponse ? reponse.toString() : undefined"
            />
            <button class="fr-btn fr-btn--lg" title="Valider" :disabled="isButtonDisabled">Valider</button>
          </form>
          <KYCFin v-else :phrase-point-a-gagner="defiViewModel!.points" :a-deja-repondu="aDejaRepondu" />
        </div>
      </div>
      <div class="fr-col-4">
        <CarteInfo>
          <p class="fr-text--bold">
            <span class="fr-icon-question-line" aria-hidden="true"></span>
            Pourquoi ce défi ?
          </p>
          <p class="fr-mb-0">{{ defiViewModel.pourquoi }}</p>
        </CarteInfo>
        <CarteExplication>
          <p class="fr-mt-2w">{{ defiViewModel!.astuces }}</p>
        </CarteExplication>
      </div>
    </div>
    <div v-else>Problème de chargement de donées</div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { RecupererDefiUsecase } from '@/defi/recupererDefiUsecase';
  import { DefiRepositoryAxios } from '@/defi/adapters/defi.repository.axios';
  import { DefiPresenterImpl, DefiViewModel, ReponsePossible } from '@/defi/adapters/defi.presenter.impl';
  import { EnvoyerReponseDefiUsecase } from '@/defi/envoyerReponseDefi.usecase';
  import CarteExplication from '@/components/custom/CarteExplication.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';

  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const isLoading = ref<boolean>(true);
  const defiViewModel = ref<DefiViewModel>();
  const reponse = ref<string | string[]>('');
  const reponseAEteDonnee = ref<boolean>(false);
  const aDejaRepondu = ref<boolean>(false);

  const utilisateurId = utilisateurStore().utilisateur.id;

  const isButtonDisabled = computed(() => {
    if (!reponse.value) return true;
    if (reponse.value === '') return true;
    return reponse.value.length < 1;
  });

  onMounted(async () => {
    const recupereQuestionUsecase = new RecupererDefiUsecase(new DefiRepositoryAxios());
    await recupereQuestionUsecase.execute(
      questionId,
      utilisateurId,
      new DefiPresenterImpl((viewModel: DefiViewModel) => {
        defiViewModel.value = viewModel;
        reponse.value = viewModel.reponse;
      }),
    );
    isLoading.value = false;
  });

  const validerLaReponse = async () => {
    const envoyerReponseUsecase = new EnvoyerReponseDefiUsecase(
      new DefiRepositoryAxios(),
      ToDoListEventBusImpl.getInstance(),
    );
    await envoyerReponseUsecase.execute(utilisateurId, questionId, [reponse.value].flat());

    if (defiViewModel.value?.reponse) {
      aDejaRepondu.value = true;
    }
    reponseAEteDonnee.value = true;
  };
</script>
