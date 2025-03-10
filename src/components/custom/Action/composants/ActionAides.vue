<template>
  <section v-if="aides?.length > 0" class="fr-p-2w fr-mt-2w">
    <h2>Aides et bons plans !</h2>
    <GrilleAidesDUneAction :aides="aides" />
  </section>
</template>
<script lang="ts" setup>
  import GrilleAidesDUneAction from '@/components/custom/Aides/GrilleAidesDUneAction.vue';
  import { ActionAideViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{ aides: ActionAideViewModel[] }>();
</script>
