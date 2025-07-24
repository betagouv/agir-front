<template>
  <form @submit.prevent="validerLaReponse()">
    <div class="fr-input-group" v-if="aReponsesPredefinies">
      <KYCInputWrapperArray
        v-model="reponse as string[]"
        :question-view-model="questionViewModel"
        :style-du-titre="styleDuTitre"
      >
        <template #complement>
          <slot name="complement" />
        </template>
      </KYCInputWrapperArray>
    </div>

    <div class="fr-input-group" v-else>
      <KycInputWrapperString
        v-model="reponse as string"
        :question-view-model="questionViewModel"
        :style-du-titre="styleDuTitre"
      >
        <template #complement>
          <slot name="complement" />
        </template>
      </KycInputWrapperString>
    </div>

    <Alert
      v-if="alerte.isActive"
      :message="alerte.message"
      :titre="alerte.titre"
      :type="alerte.type"
      class="fr-mt-1w fr-mb-3w"
    />

    <button v-if="!reponse || reponse?.length === 0" class="fr-btn fr-btn--secondary" @click.prevent="passerLaQuestion">
      Passer la question
    </button>
    <button v-else :title="wordingBouton" class="fr-btn fr-mt-0" type="submit">
      {{ wordingBouton }}
    </button>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import KYCInputWrapperArray from '@/components/custom/KYC/KYCInputWrapperArray.vue';
  import KycInputWrapperString from '@/components/custom/KYC/KYCInputWrapperString.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { EnvoyerReponseUsecase } from '@/domaines/kyc/envoyerReponse.usecase';
  import { EnvoyerReponsesMultiplesUsecase } from '@/domaines/kyc/envoyerReponsesMultiples.usecase';
  import { PasserUneKYCUsecase } from '@/domaines/kyc/passerUneKYC.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ questionViewModel: QuestionViewModel; wordingBouton: string; styleDuTitre?: string }>();

  const aReponsesPredefinies =
    props.questionViewModel.type === 'mosaic_boolean' ||
    props.questionViewModel.type === 'choix_multiple' ||
    props.questionViewModel.type === 'choix_unique';

  const reponse = defineModel<string | string[]>('reponse');
  const emit = defineEmits<{
    (e: 'update:soumissionKyc', value: string[]): void;
    (e: 'update:passer-la-question'): void;
  }>();

  const questionViewModel = ref<QuestionViewModel>(props.questionViewModel);
  const { alerte, afficherAlerte } = useAlerte();

  onMounted(() => {
    reponse.value = (
      aReponsesPredefinies
        ? (props.questionViewModel.reponses_possibles?.filter(r => r.checked)?.map(r => r.id) ?? [])
        : (props.questionViewModel.reponses_possibles[0]?.label ?? '')
    ) as typeof reponse.value;
  });

  const validerLaReponse = async () => {
    if (!reponse.value || reponse.value.length === 0) {
      afficherAlerte('error', 'Erreur', 'Veuillez sélectionner une réponse pour continuer');
      return;
    }

    if (aReponsesPredefinies) {
      const reponseArray = Array.isArray(reponse.value) ? reponse.value : [reponse.value];
      const envoyerReponsesMultiplesUsecase = new EnvoyerReponsesMultiplesUsecase(
        new QuestionRepositoryAxios(),
        ToDoListEventBusImpl.getInstance(),
      );
      await envoyerReponsesMultiplesUsecase.execute(
        utilisateurStore().utilisateur.id,
        props.questionViewModel.id,
        props.questionViewModel.reponses_possibles.map(r => ({
          code: r.id,
          boolean_value: reponseArray.includes(r.id),
        })),
      );
    } else {
      const envoyerReponseUsecase = new EnvoyerReponseUsecase(
        new QuestionRepositoryAxios(),
        ToDoListEventBusImpl.getInstance(),
      );
      await envoyerReponseUsecase.execute(
        utilisateurStore().utilisateur.id,
        props.questionViewModel.id,
        reponse.value.toString(),
      );
    }

    emit('update:soumissionKyc', [reponse.value].flat());
  };

  const passerLaQuestion = () => {
    const passerLaQuestion = new PasserUneKYCUsecase(new QuestionRepositoryAxios());
    passerLaQuestion
      .execute(utilisateurStore().utilisateur.id, props.questionViewModel.id)
      .then(() => emit('update:passer-la-question'));
  };
</script>
