<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane page-courante="Défi" />
    <h1 class="fr-h2">Défi</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else-if="!isLoading && defiViewModel" class="background--white border fr-p-4w border-radius--md">
      <form @submit.prevent="validerLaReponse" v-if="!reponseAEteDonnee">
        <div v-if="defiViewModel?.type === 'libre'" class="fr-input-group">
          <h2 class="fr-h4 fr-mb-2w">
            {{ defiViewModel?.libelle }}
          </h2>
          <label class="fr-label" for="reponse"> Votre réponse </label>
          <textarea class="fr-input" v-model="reponse" id="reponse" name="reponse" />
        </div>
        <div v-if="defiViewModel?.type === 'choix_multiple'" class="fr-input-group">
          <h2 class="fr-h4 fr-mb-2w">
            {{ defiViewModel?.libelle }}
          </h2>
          <InputCheckbox
            :options="defiViewModel.reponses_possibles"
            v-model="reponse"
            :default-values="reponse as string[]"
          />
        </div>
        <div v-if="defiViewModel?.type === 'choix_unique'" class="fr-input-group">
          <BoutonRadio
            col=""
            legende-size="l"
            :legende="defiViewModel.libelle"
            name="toto"
            orientation="vertical"
            :options="
              defiViewModel.reponses_possibles.map((reponsePossible: ReponsePossible) => ({
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
      <KYCFin v-else :phrase-point-a-gagner="defiViewModel!.points" :a-deja-repondu="aDejaRepondu" />
    </div>
    <div v-else>Problème de chargement de donées</div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { utilisateurStore } from '@/store/utilisateur';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import KYCFin from '@/components/custom/KYC/KYCFin.vue';
  import { ToDoListEventBusImpl } from '@/toDoList/toDoListEventBusImpl';
  import { RecupererDefiUsecase } from '@/defi/recupererDefiUsecase';
  import { DefiRepositoryAxios } from '@/defi/adapters/defi.repository.axios';
  import { DefiPresenterImpl, DefiViewModel, ReponsePossible } from '@/defi/adapters/defi.presenter.impl';
  import { EnvoyerReponseDefiUsecase } from '@/defi/envoyerReponseDefi.usecase';

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
        reponse.value = viewModel.reponses;
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

    if (defiViewModel.value?.reponses) {
      aDejaRepondu.value = true;
    }
    reponseAEteDonnee.value = true;
  };
</script>
