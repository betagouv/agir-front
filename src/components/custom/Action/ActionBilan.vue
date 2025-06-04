<template>
  <section class="background--white fr-p-2w fr-mb-3w shadow">
    <ActionIntroduction :introduction="actionBilanViewModel.introduction" :sources="actionBilanViewModel.sources" />

    <KyCsAction
      :action-id="actionBilanViewModel.actionId"
      :idEnchainementKycs="actionBilanViewModel.idEnchainementKYCs"
      :type-action="TypeAction.BILAN"
      class="fr-px-2w"
    >
      <template v-slot:fin>
        <ActionBilanResultat :id-action="actionBilanViewModel.actionId" :thematique="actionBilanViewModel.thematique" />
      </template>
    </KyCsAction>

    <ActionAides :aides="actionBilanViewModel.aides" />
  </section>
</template>

<script lang="ts" setup>
  import ActionAides from '@/components/custom/Action/composants/ActionAides.vue';
  import ActionBilanResultat from '@/components/custom/Action/composants/ActionBilanResultat.vue';
  import ActionIntroduction from '@/components/custom/Action/composants/ActionIntroduction.vue';
  import KyCsAction from '@/components/custom/KYC/KYCsAction.vue';
  import { ActionBilanViewModel } from '@/domaines/actions/ports/action.presenter';
  import { TypeAction } from '@/domaines/actions/ports/actions.repository';

  defineProps<{ actionBilanViewModel: ActionBilanViewModel }>();
</script>
