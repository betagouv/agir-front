<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane page-courante="Question pour mieux vous connaître" />
    <h1 class="fr-h2 fr-mb-1w">Question pour mieux vous connaître</h1>
    <p class="fr-text--xl">
      Dites nous en plus sur vous pour que le service vous recommande des actions plus personnalisées.
    </p>
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else-if="!isLoading && questionViewModel" class="background--white border fr-p-4w border-radius--md">
      <form @submit.prevent="validerLaReponse" v-if="!reponseAEteDonnee">
        <div v-if="questionViewModel?.type === 'libre'" class="fr-input-group">
          <h2 class="fr-h4 fr-mb-2w">
            {{ questionViewModel?.libelle }}
          </h2>
          <label class="fr-label" for="reponse"> Votre réponse </label>
          <textarea class="fr-input" v-model="reponse" id="reponse" name="reponse" />
        </div>
        <div v-if="questionViewModel?.type === 'choix_multiple'" class="fr-input-group">
          <h2 class="fr-h4 fr-mb-2w">
            {{ questionViewModel?.libelle }}
          </h2>
          <InputCheckbox
            :options="questionViewModel.reponses_possibles"
            v-model="reponse"
            :default-values="reponse as string[]"
          />
        </div>
        <div v-if="questionViewModel?.type === 'choix_unique'" class="fr-input-group">
          <BoutonRadio
            col=""
            legende-size="l"
            :legende="questionViewModel.libelle"
            name="toto"
            orientation="vertical"
            :options="
              questionViewModel.reponses_possibles.map((reponsePossible: ReponsePossible) => ({
                label: reponsePossible.label,
                value: reponsePossible.id,
              }))
            "
            v-model="reponse"
            :default-value="reponse ? reponse.toString() : undefined"
          />
        </div>
        <button class="fr-btn fr-btn--lg" title="Valider" :disabled="isButtonDisabled">Valider</button>
      </form>
      <KYCFin
        v-else
        :phrase-point-a-gagner="questionViewModel.points"
        :a-deja-repondu="questionViewModel.aDejaEteRepondu"
      />
    </div>
    <div v-else>Problème de chargement de donées</div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { RecupererQuestionUsecase } from '@/kyc/recupererQuestionUsecase';
  import { QuestionRepositoryAxios } from '@/kyc/adapters/question.repository.axios';
  import { QuestionPresenterImpl, QuestionViewModel, ReponsePossible } from '@/kyc/adapters/question.presenter.impl';
  import { utilisateurStore } from '@/store/utilisateur';
  import { EnvoyerReponseUsecase } from '@/kyc/envoyerReponseUsecase';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';

  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const isLoading = ref<boolean>(true);
  const questionViewModel = ref<QuestionViewModel>();
  const reponse = ref<string | string[]>('');
  const reponseAEteDonnee = ref<boolean>(false);

  const utilisateurId = utilisateurStore().utilisateur.id;

  const isButtonDisabled = computed(() => {
    if (!reponse.value) return true;
    if (reponse.value === '') return true;
    if (reponse.value.length < 1) return true;
    return false;
  });

  onMounted(async () => {
    const recupereQuestionUsecase = new RecupererQuestionUsecase(new QuestionRepositoryAxios());
    await recupereQuestionUsecase.execute(
      questionId,
      utilisateurId,
      new QuestionPresenterImpl((viewModel: QuestionViewModel) => {
        questionViewModel.value = viewModel;
        reponse.value = viewModel.reponses;
      }),
    );
    isLoading.value = false;
  });

  const validerLaReponse = async () => {
    const envoyerReponseUsecase = new EnvoyerReponseUsecase(
      new QuestionRepositoryAxios(),
      ToDoListEventBusImpl.getInstance(),
    );
    envoyerReponseUsecase.execute(utilisateurId, questionId, [reponse.value].flat());
    reponseAEteDonnee.value = true;
  };
</script>
