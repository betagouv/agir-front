<template>
  <div>
    <EnchainementQuestionsKyc
      :est-active="true"
      :id-enchainement-kycs="idEnchainementKycs"
      class="fr-p-4w"
      @fin-kyc-atteinte="onFinKYC"
    />
    <slot v-if="afficherFinKyc" name="fin" />
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import EnchainementQuestionsKyc from '@/components/custom/KYC/EnchainementQuestionsKyc.vue';
  import { ActionsEventBus } from '@/domaines/actions/actions.eventbus';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';
  import { TerminerActionUsecase } from '@/domaines/actions/terminerAction.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    idEnchainementKycs: string;
    actionId: string;
    typeAction: TypeAction;
  }>();

  const emit = defineEmits<{
    (e: 'finKycAtteinte'): void;
    (e: 'questionSuivante'): void;
  }>();

  const afficherFinKyc = ref<boolean>(false);
  const onFinKYC = async () => {
    afficherFinKyc.value = true;
    emit('finKycAtteinte');
    const terminerActionUsecase = new TerminerActionUsecase(
      new ActionsRepositoryAxios(),
      ActionsEventBus.getInstance(),
    );
    await terminerActionUsecase.execute(utilisateurStore().utilisateur.id, props.actionId, props.typeAction);
  };
</script>
