<template>
  <div class="background--white fr-p-2w shadow">
    <slot />
    <p>Aimez-vous cette action ?</p>
  </div>
</template>

<script lang="ts" setup>
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();
</script>
