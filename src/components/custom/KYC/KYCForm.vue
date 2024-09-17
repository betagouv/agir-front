<template>
  <form @submit.prevent="validerLaReponse()">
    <div
      v-if="questionViewModel.type === 'choix_unique' || questionViewModel.type === 'mosaic_boolean'"
      class="fr-input-group"
    >
      {{ questionViewModel }}
      <BoutonRadio
        col=""
        legende-size="l"
        :legende="questionViewModel.libelle"
        :name="questionViewModel.id"
        orientation="vertical"
        :options="
          questionViewModel.reponses_possibles.map((reponsePossible: ReponsePossibleViewModel) => ({
            label: reponsePossible.label,
            value: reponsePossible.id,
          }))
        "
        :default-value="questionViewModel.reponses ? questionViewModel.reponses.toString() : undefined"
        v-model="reponse"
      />
    </div>
    <div v-if="questionViewModel.type === 'choix_multiple'" class="fr-input-group">
      <h2 :class="styleDuTitre ? styleDuTitre : 'fr-h4 fr-mb-2w'">
        {{ questionViewModel.libelle }}
      </h2>
      <InputCheckbox
        :options="questionViewModel.reponses_possibles"
        :est-resetable="true"
        :default-values="questionViewModel.reponses"
        v-model="reponse"
      />
    </div>
    <div v-if="questionViewModel.type === 'libre'" class="fr-input-group">
      <h2 :class="styleDuTitre ? styleDuTitre : 'fr-h4 fr-mb-2w'">
        {{ questionViewModel.libelle }}
      </h2>
      <label class="fr-label" for="reponse"> Votre réponse </label>
      <textarea class="fr-input" id="reponse" name="reponse" v-model="reponse" />
    </div>
    <button class="fr-btn fr-btn--lg" :title="wordingBouton" :disabled="isDisabled" type="submit">
      {{ wordingBouton }}
    </button>
    <slot> </slot>
  </form>
</template>

<script setup lang="ts">
  import { onMounted, ref, watch } from 'vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import { QuestionViewModel, ReponsePossibleViewModel } from '@/domaines/kyc/adapters/question.presenter.impl';
  import { QuestionRepositoryAxios } from '@/domaines/kyc/adapters/question.repository.axios';
  import { EnvoyerReponseMosaicUsecase } from '@/domaines/kyc/envoyerReponseMosaic.usecase';
  import { EnvoyerReponseUsecase } from '@/domaines/kyc/envoyerReponseUsecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ questionViewModel: QuestionViewModel; wordingBouton: string; styleDuTitre?: string }>();
  const reponse = defineModel<string | string[]>('reponse', { default: '' });
  const isDisabled = ref<boolean>(true);
  const emit = defineEmits<{ (e: 'update:soumissionKyc', value: string[]): void }>();
  onMounted(() => {
    isDisabled.value = props.questionViewModel.reponses?.length === 0;
  });

  watch(reponse, () => {
    isDisabled.value = reponse.value.length === 0;
  });

  const validerLaReponse = async () => {
    if (props.questionViewModel.type === 'mosaic_boolean') {
      //TODO useCase Mosaic
      const envoyerReponseMosaicUsecase = new EnvoyerReponseMosaicUsecase(new QuestionRepositoryAxios());
      await envoyerReponseMosaicUsecase.execute(
        utilisateurStore().utilisateur.id,
        props.questionViewModel.id,
        props.questionViewModel.reponses_possibles.map(r => ({
          code: r.id,
          valeur: reponse.value === r.id,
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
        reponse.value === '' ? props.questionViewModel.reponses.flat() : [reponse.value].flat(),
      );
    }

    emit('update:soumissionKyc', [reponse.value].flat());
  };
</script>
