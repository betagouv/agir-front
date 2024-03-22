<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane :page-courante="`Défi : ${defiViewModel?.libelle}`" />
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
              name="defi"
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
            <div class="background-bleu-alt-light border-radius--md fr-p-2w fr-mb-2w">
              <h3 class="fr-h6">
                <span class="fr-icon-arrow-right-s-last-line text--bleu-minor" aria-hidden="true"></span>
                Bonnes astuces pour réaliser ce défi
              </h3>
              <p class="fr-mb-0">{{ defiViewModel.astuces }}</p>
            </div>
            <button class="fr-btn fr-btn--lg" title="Valider" :disabled="isButtonDisabled">Valider</button>
          </form>
          <DefiFin v-else :defi="defiViewModel" :reponse="reponse" />
        </div>
      </div>
      <div class="fr-col-4">
        <CarteInfo v-if="!reponseAEteDonnee">
          <p class="fr-text--bold">
            <span class="fr-icon-question-line" aria-hidden="true"></span>
            Pourquoi ce défi ?
          </p>
          <p class="fr-mb-0">{{ defiViewModel.pourquoi }}</p>
        </CarteInfo>
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
  import DefiFin from '@/components/custom/Defi/DefiFin.vue';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { RecupererDefiUsecase } from '@/defi/recupererDefiUsecase';
  import { DefiRepositoryAxios } from '@/defi/adapters/defi.repository.axios';
  import { DefiPresenterImpl, DefiViewModel, ReponsePossible } from '@/defi/adapters/defi.presenter.impl';
  import { EnvoyerReponseDefiUsecase } from '@/defi/envoyerReponseDefi.usecase';
  import CarteInfo from '@/components/custom/CarteInfo.vue';

  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const isLoading = ref<boolean>(true);
  const defiViewModel = ref<DefiViewModel>();
  const reponse = ref<string>('');
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
    await envoyerReponseUsecase.execute(utilisateurId, questionId, reponse.value);

    if (defiViewModel.value?.reponse) {
      aDejaRepondu.value = true;
    }
    reponseAEteDonnee.value = true;
  };
</script>
