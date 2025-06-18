<template>
  <div
    class="parent background--white fr-px-3w fr-pb-3w fr-pt-2w position--relative overflow--hidden flex flex-column flex-center fr-mb-3w"
  >
    <CommencerParcours v-if="!aCommenceEnchainement" :continuer="() => (aCommenceEnchainement = true)" />

    <div v-else class="enchainementKYC fr-mb-2w">
      <EnchainementQuestionsKyc
        :est-active="aCommenceEnchainement"
        :id-enchainement-kycs="idEnchainementKycs"
        @fin-kyc-atteinte="onFinKYC"
        wording-dernier-bouton="Voir mes recommandations personnalisées"
      >
        <template v-slot:fin>
          <BallLoader text="Nous préparons vos recommandations personnalisées..." />
        </template>
      </EnchainementQuestionsKyc>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';
  import CommencerParcours from '@/components/custom/Thematiques/CommencerParcours.vue';

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
</style>
