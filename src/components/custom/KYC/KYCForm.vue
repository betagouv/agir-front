<template>
  <form @submit.prevent="validerLaReponse()">
    <div v-if="questionViewModel.type === 'entier'" class="fr-input-group">
      <InputNumeric
        :id="questionViewModel.id"
        :default-value="questionViewModel.reponses[0]"
        :label="{
          wording: questionViewModel.libelle,
          cssModifier: 'fr-h4',
        }"
        @update:modelValue="(valeur: string) => (reponse = valeur)"
      />
    </div>
    <div v-if="questionViewModel.type === 'mosaic_boolean'">
      <KYCMosaic
        v-model="reponse"
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
    <div v-if="questionViewModel.type === 'choix_unique'" class="fr-input-group">
      <BoutonRadio
        v-model="reponse"
        :default-value="questionViewModel.reponses_possibles.filter(r => r.checked)[0]?.id"
        :legende="questionViewModel.libelle"
        :name="questionViewModel.id"
        :options="
          questionViewModel.reponses_possibles.map((reponsePossible: ReponsePossibleViewModel) => ({
            label: reponsePossible.label,
            value: reponsePossible.id,
          }))
        "
        col=""
        legende-size="l"
        orientation="vertical"
      />
    </div>
    <div v-if="questionViewModel.type === 'choix_multiple'" class="fr-input-group">
      <h2 :class="styleDuTitre ? styleDuTitre : 'fr-h4 fr-mb-2w'">
        {{ questionViewModel.libelle }}
      </h2>
      <InputCheckbox
        v-model="reponse"
        :default-values="questionViewModel.reponses"
        :est-resetable="true"
        :options="
          questionViewModel.reponses_possibles.map(reponsePossible => ({
            id: reponsePossible.id,
            label: reponsePossible.label,
            checked: reponsePossible.checked,
          }))
        "
      />
    </div>
    <div v-if="questionViewModel.type === 'libre'" class="fr-input-group">
      <h2 :class="styleDuTitre ? styleDuTitre : 'fr-h4 fr-mb-2w'">
        {{ questionViewModel.libelle }}
      </h2>
      <label class="fr-label" for="reponse"> Votre réponse </label>
      <textarea id="reponse" v-model="reponse" class="fr-input" name="reponse" />
    </div>
    <button :disabled="isDisabled" :title="wordingBouton" class="fr-btn fr-btn--lg" type="submit">
      {{ wordingBouton }}
    </button>
    <slot></slot>
  </form>
</template>

<script lang="ts" setup>
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
  import { EnvoyerReponseUsecase } from '@/domaines/kyc/envoyerReponse.usecase';
  import { EnvoyerReponsesMultiplesUsecase } from '@/domaines/kyc/envoyerReponsesMultiples.usecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{ questionViewModel: QuestionViewModel; wordingBouton: string; styleDuTitre?: string }>();
  const reponse = defineModel<string | string[]>('reponse', { default: '' });
  const isDisabled = ref<boolean>(true);
  const emit = defineEmits<{ (e: 'update:soumissionKyc', value: string[]): void }>();
  onMounted(() => {
    isDisabled.value = props.questionViewModel.reponses?.length === 0;
    reponse.value = props.questionViewModel.reponses?.toString() || '';
  });

  watch(reponse, () => {
    isDisabled.value = reponse.value.length === 0;
  });

  const validerLaReponse = async () => {
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
        reponse.value === '' ? props.questionViewModel.reponses.flat() : [reponse.value].flat(),
      );
    }

    emit('update:soumissionKyc', [reponse.value].flat());
  };
</script>
