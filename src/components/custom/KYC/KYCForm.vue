<template>
  <form @submit.prevent="validerLaReponse()">
    <div v-if="questionViewModel.type === 'choix_unique'" class="fr-input-group">
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
        :default-value="questionViewModel.reponses ? questionViewModel.reponses.toString() : undefined"
        @update:model-value="update"
      />
      <!-- v-model="questionViewModel.reponses" -->
    </div>
    <div v-if="questionViewModel.type === 'choix_multiple'" class="fr-input-group">
      <h2 class="fr-h4 fr-mb-2w">
        {{ questionViewModel.libelle }}
      </h2>
      <InputCheckbox
        :options="questionViewModel.reponses_possibles"
        :est-resetable="true"
        :default-values="questionViewModel.reponses"
        @update:model-value="update"
      />
      <!-- v-model="questionViewModel.reponses" -->
    </div>
    <div v-if="questionViewModel.type === 'libre'" class="fr-input-group">
      <h2 class="fr-h4 fr-mb-2w">
        {{ questionViewModel.libelle }}
      </h2>
      <label class="fr-label" for="reponse"> Votre réponse </label>
      <textarea class="fr-input" id="reponse" name="reponse" />
      <!-- v-model="questionViewModel.reponses" -->
    </div>
    <button class="fr-btn fr-btn--lg" title="Valider" :disabled="reponse === ''" type="submit">Continuer</button>
  </form>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import InputCheckbox from '@/components/custom/InputCheckbox.vue';
  import { QuestionViewModel, ReponsePossible } from '@/domaines/kyc/adapters/question.presenter.impl';

  defineProps<{ questionViewModel: QuestionViewModel }>();

  const reponse = ref<string>('');

  const update = (value: string | string[]) => {
    reponse.value = value.toString();
    console.log(value);
  };

  const validerLaReponse = async () => {
    console.log('coucou');
  };
</script>
