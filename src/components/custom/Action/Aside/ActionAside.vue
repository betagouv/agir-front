<template>
  <aside>
    <div class="background--white fr-p-2w shadow fr-mb-2w">
      <slot />
    </div>
  </aside>
</template>

<script lang="ts" setup>
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();
</script>
