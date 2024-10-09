<template>
  <form @submit.prevent="validerLaReponse()">
    <div v-if="questionViewModel.type === 'entier'" class="fr-input-group">
      <InputNumeric
        :id="questionViewModel.id"
        :label="{
          wording: questionViewModel.libelle,
          cssModifier: 'fr-h4',
        }"
        :default-value="questionViewModel.reponses[0]"
        @update:modelValue="(value: string) => (reponse = value)"
      />
    </div>
    <div v-if="questionViewModel.type === 'mosaic_boolean'">
      <KYCMosaic
        :name="questionViewModel.id"
        :legende="questionViewModel.libelle"
        :options="
          questionViewModel.reponses_possibles.map(reponsePossible => ({
            label: reponsePossible.label,
            value: reponsePossible.id,
            picto: reponsePossible.picto,
            checked: reponsePossible.checked,
          }))
        "
        v-model="reponse"
      />
    </div>
    <div v-if="questionViewModel.type === 'choix_unique'" class="fr-input-group">
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
  import InputNumeric from '@/components/custom/Form/InputNumeric.vue';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import KYCMosaic from '@/components/custom/KYC/KYCMosaic.vue';
  import {
    QuestionViewModel,
    ReponsePossibleViewModel,
  } from '@/domaines/kyc/adapters/listeQuestionsThematique.presenter.impl';
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
      const envoyerReponseMosaicUsecase = new EnvoyerReponseMosaicUsecase(
        new QuestionRepositoryAxios(),
        ToDoListEventBusImpl.getInstance(),
      );
      await envoyerReponseMosaicUsecase.execute(
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
        reponse.value === '' ? props.questionViewModel.reponses.flat() : [reponse.value].flat(),
      );
    }

    emit('update:soumissionKyc', [reponse.value].flat());
  };

  const determineLabel = (questionViewModel: QuestionViewModel) => {
    return {
      wording: questionViewModel.libelle,
      cssModifier: 'fr-mb-2w',
    };
  };
</script>
