<template>
  <div
    class="parent background--white fr-px-3w fr-pb-3w fr-pt-2w position--relative overflow--hidden flex flex-column flex-center fr-mb-3w"
  >
    <CommencerParcours v-if="!aCommenceEnchainement" :continuer="() => (aCommenceEnchainement = true)" />

    <div v-else class="enchainementKYC fr-mb-2w">
      <EnchainementQuestionsKyc
        :est-active="aCommenceEnchainement"
        :id-enchainement-kycs="idEnchainementKycs"
        :afficher-stepper="true"
        @fin-kyc-atteinte="onFinKYCEtFocus"
        wording-dernier-bouton="Voir mes recommandations personnalisées"
      >
        <template v-slot:fin>
          <BallLoader text="Nous préparons vos recommandations personnalisées..." ref="ballLoaderRef" />
        </template>
      </EnchainementQuestionsKyc>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { nextTick, ref } from 'vue';
  import BallLoader from '@/components/custom/BallLoader.vue';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import CommencerParcours from '@/components/custom/Thematiques/CommencerParcours.vue';

  const props = defineProps<{
    idEnchainementKycs: string;
    onFinKYC: () => void;
  }>();

  const ballLoaderRef = ref<InstanceType<typeof BallLoader>>();

  async function onFinKYCEtFocus() {
    props.onFinKYC();
    await nextTick();
    ballLoaderRef.value?.focus();
  }

  const aCommenceEnchainement = ref<boolean>(false);
</script>

<style scoped>
  .parent {
    min-height: 25rem;
  }
</style>
