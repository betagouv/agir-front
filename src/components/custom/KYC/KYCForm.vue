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
      ref="alertRef"
      class="fr-mt-1w fr-mb-3w"
      a-un-role-alert
    />

    <button
      v-if="questionViewModel.estObligatoire || !estSansReponse"
      :title="wordingBouton"
      class="fr-btn fr-mt-0"
      type="submit"
    >
      {{ wordingBouton }}
    </button>
    <button v-else class="fr-btn fr-btn--secondary" @click.prevent="passerLaQuestion">Passer la question</button>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
  import { computed, nextTick, onMounted, ref } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import KYCInputWrapperArray from '@/components/custom/KYC/KYCInputWrapperArray.vue';
  import KycInputWrapperString from '@/components/custom/KYC/KYCInputWrapperString.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { EnvoyerReponseUsecase } from '@/domaines/kyc/envoyerReponse.usecase';
  import { EnvoyerReponsesMultiplesUsecase } from '@/domaines/kyc/envoyerReponsesMultiples.usecase';
  import { PasserUneKYCUsecase } from '@/domaines/kyc/passerUneKYC.usecase';
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
  const alertRef = ref<HTMLDivElement>();
  const estSansReponse = computed(() => !reponse.value || reponse.value.length === 0);

  onMounted(() => {
    reponse.value = (
      aReponsesPredefinies
        ? (props.questionViewModel.reponses_possibles?.filter(r => r.checked)?.map(r => r.id) ?? [])
        : (props.questionViewModel.reponses_possibles[0]?.label ?? '')
    ) as typeof reponse.value;
  });

  const validerLaReponse = async () => {
    if (estSansReponse.value) {
      await afficherAlerteErreur();
      return;
    }

    if (aReponsesPredefinies) {
      const reponseArray = Array.isArray(reponse.value) ? reponse.value : [reponse.value];
      const envoyerReponsesMultiplesUsecase = new EnvoyerReponsesMultiplesUsecase(new QuestionRepositoryAxios());
      await envoyerReponsesMultiplesUsecase.execute(
        utilisateurStore().utilisateur.id,
        props.questionViewModel.id,
        props.questionViewModel.reponses_possibles.map(r => ({
          code: r.id,
          boolean_value: reponseArray.includes(r.id),
        })),
      );
    } else {
      const envoyerReponseUsecase = new EnvoyerReponseUsecase(new QuestionRepositoryAxios());
      await envoyerReponseUsecase.execute(
        utilisateurStore().utilisateur.id,
        props.questionViewModel.id,
        reponse.value!.toString(),
      );
    }

    emit('update:soumissionKyc', [reponse.value!].flat());
  };

  const passerLaQuestion = () => {
    if (props.questionViewModel.estObligatoire) return;

    const passerLaQuestion = new PasserUneKYCUsecase(new QuestionRepositoryAxios());
    passerLaQuestion
      .execute(utilisateurStore().utilisateur.id, props.questionViewModel.id)
      .then(() => emit('update:passer-la-question'));
  };

  async function afficherAlerteErreur() {
    const messagesParType = {
      choix_multiple: 'Veuillez sélectionner au moins une option pour continuer',
      choix_unique: 'Veuillez sélectionner une option pour continuer',
      mosaic_boolean: 'Veuillez sélectionner une option pour continuer',
      decimal: 'Veuillez saisir une valeur numérique pour continuer',
      entier: 'Veuillez saisir une valeur numérique pour continuer',
      libre: 'Veuillez renseigner une réponse pour continuer',
    };
    const messageErreur =
      messagesParType[props.questionViewModel.type] || 'Veuillez renseigner une réponse pour continuer';
    afficherAlerte('error', 'Erreur', messageErreur);

    await nextTick();
    alertRef.value?.focus();
  }
</script>
