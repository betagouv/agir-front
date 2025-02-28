<template>
  <form @submit.prevent="validerLaReponse()">
    <div v-if="questionViewModel.type === 'entier'" class="fr-input-group">
      <KYCEntier :question-view-model="questionViewModel" :modifier-valeur="(valeur: string) => (reponse = valeur)" />
    </div>
    <div v-if="questionViewModel.type === 'mosaic_boolean'">
      <KYCMosaic
        v-model="reponse as string[]"
        :legende="questionViewModel.libelle"
        :name="questionViewModel.id"
        :options="
          questionViewModel.reponses_possibles.map(reponsePossible => ({
            label: reponsePossible.label,
            value: reponsePossible.id,
            picto: reponsePossible.picto,
            emoji: reponsePossible.emoji,
            checked: reponsePossible.checked,
          }))
        "
      />
    </div>
    <div v-if="questionViewModel.type === 'choix_unique'" class="fr-input-group fr-mb-0">
      <KYCChoixUnique v-model="reponse as string" :question-view-model="questionViewModel" />
    </div>
    <div v-if="questionViewModel.type === 'choix_multiple'" class="fr-input-group">
      <KYCChoixMultiple
        v-model="reponse as string[]"
        :question-view-model="questionViewModel"
        :style-du-titre="styleDuTitre"
      />
    </div>
    <div v-if="questionViewModel.type === 'libre'" class="fr-input-group">
      <KYCLibre v-model="reponse as string" :question-view-model="questionViewModel" :style-du-titre="styleDuTitre" />
    </div>

    <Alert
      v-if="alerte.isActive"
      :message="alerte.message"
      :titre="alerte.titre"
      :type="alerte.type"
      class="fr-mt-1w"
    />

    <button :title="wordingBouton" class="fr-btn fr-mt-3w" type="submit">
      {{ wordingBouton }}
    </button>
    <button
      v-if="questionViewModel.type === 'mosaic_boolean'"
      class="fr-link fr-icon-checkbox-circle-fill text--underline fr-ml-2w"
      @click.prevent="validerChoixAucuneReponse"
    >
      Aucune de ces propositions
    </button>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import Alert from '@/components/custom/Alert.vue';
  import KYCChoixMultiple from '@/components/custom/KYC/KYCTypes/KYCChoixMultiple.vue';
  import KYCChoixUnique from '@/components/custom/KYC/KYCTypes/KYCChoixUnique.vue';
  import KYCEntier from '@/components/custom/KYC/KYCTypes/KYCEntier.vue';
  import KYCLibre from '@/components/custom/KYC/KYCTypes/KYCLibre.vue';
  import KYCMosaic from '@/components/custom/KYC/KYCTypes/KYCMosaic.vue';
  import { useAlerte } from '@/composables/useAlerte';
  import { QuestionViewModel } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { EnvoyerReponseUsecase } from '@/domaines/kyc/envoyerReponse.usecase';
  import { EnvoyerReponsesMultiplesUsecase } from '@/domaines/kyc/envoyerReponsesMultiples.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ questionViewModel: QuestionViewModel; wordingBouton: string; styleDuTitre?: string }>();
  const questionViewModel = ref<QuestionViewModel>(props.questionViewModel);
  const reponse = defineModel<string | string[]>('reponse', { default: '' });
  const estIncomplet = ref<boolean>(true);
  const emit = defineEmits<{ (e: 'update:soumissionKyc', value: string[]): void }>();
  const { alerte, afficherAlerte } = useAlerte();
  onMounted(() => {
    reponse.value =
      props.questionViewModel.type === 'libre' || props.questionViewModel.type === 'entier'
        ? props.questionViewModel.reponses_possibles[0].label
        : props.questionViewModel.reponses_possibles.filter(r => r.checked).map(r => r.id);
  });

  watch(reponse, () => {
    estIncomplet.value =
      props.questionViewModel.type === 'libre' || props.questionViewModel.type === 'entier'
        ? !reponse.value
        : reponse.value.length === 0;
  });

  const validerLaReponse = async () => {
    if (!reponse.value || reponse.value.length === 0) {
      afficherAlerte('error', 'Erreur', 'Veuillez sélectionner une réponse pour continuer');
      return;
    }
    if (
      props.questionViewModel.type === 'mosaic_boolean' ||
      props.questionViewModel.type === 'choix_multiple' ||
      props.questionViewModel.type === 'choix_unique'
    ) {
      const envoyerReponsesMultiplesUsecase = new EnvoyerReponsesMultiplesUsecase(
        new QuestionRepositoryAxios(),
        ToDoListEventBusImpl.getInstance(),
      );
      await envoyerReponsesMultiplesUsecase.execute(
        utilisateurStore().utilisateur.id,
        props.questionViewModel.id,
        props.questionViewModel.reponses_possibles.map(r => ({
          code: r.id,
          boolean_value: reponse.value.includes(r.id),
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

  const validerChoixAucuneReponse = async () => {
    const envoyerReponsesMultiplesUsecase = new EnvoyerReponsesMultiplesUsecase(
      new QuestionRepositoryAxios(),
      ToDoListEventBusImpl.getInstance(),
    );
    await envoyerReponsesMultiplesUsecase.execute(
      utilisateurStore().utilisateur.id,
      props.questionViewModel.id,
      props.questionViewModel.reponses_possibles.map(r => ({
        code: r.id,
        boolean_value: false,
      })),
    );

    reponse.value = [];
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      (checkbox as HTMLInputElement).checked = false;
    });

    emit('update:soumissionKyc', reponse.value);
  };
</script>
