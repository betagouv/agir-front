<template>
  <div class="parent background--white fr-px-3w fr-pb-3w fr-pt-2w position--relative">
    <ModaleCommencerParcours v-if="!aCommenceEnchainement" :fermer-modale="() => (aCommenceEnchainement = true)" />

    <div
      :aria-hidden="aCommenceEnchainement"
      :class="!aCommenceEnchainement && 'effet-flou'"
      class="enchainementKYC fr-mb-2w"
    >
      <EnchainementQuestionsKyc
        :est-active="aCommenceEnchainement"
        :id-enchainement-kycs="idEnchainementKycs"
        @fin-kyc-atteinte="onFinKYC"
      >
        <template v-slot:fin>
          <LoadingPreparationActionsRecommandees />
        </template>
      </EnchainementQuestionsKyc>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import LoadingPreparationActionsRecommandees from '@/components/custom/Thematiques/LoadingPreparationActionsRecommandees.vue';
  import ModaleCommencerParcours from '@/components/custom/Thematiques/ModaleCommencerParcours.vue';

  defineProps<{
    idEnchainementKycs: string;
    onFinKYC: () => void;
  }>();

  const aCommenceEnchainement = ref<boolean>(false);
</script>

<style scoped>
  .parent {
    min-height: 25rem;
  }

  .effet-flou {
    filter: blur(3px);
    pointer-events: none;
    opacity: 0.5;
  }
  .enchainementKYC {
    transition: 0.5s ease filter;
  }
</style>
