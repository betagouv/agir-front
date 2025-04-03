<template>
  <aside>
    <div class="shadow fr-mb-2w">
      <div class="background--white fr-p-2w">
        <slot />
      </div>
      <div class="background--gris text--gris-light fr-p-2w flex align-items--center flex-center">
        <p class="fr-mb-0 text--center">Aimez-vous cette page ?</p>
        <div class="flex fr-pl-1w">
          <button
            v-for="index in 4"
            :key="index"
            :aria-label="`${index} étoile sur 4`"
            class="fr-icon fr-pr-1v fr-icon-star-line fr-px-0"
            data-fr-opened="false"
            aria-controls="fr-modal-1"
            @click="premiereNotation = index"
          />
        </div>
      </div>
    </div>

    <ActionModaleFeedback :notation="premiereNotation" />
  </aside>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import ActionModaleFeedback from '@/components/custom/Action/Aside/ActionModaleFeedback.vue';
  import { ActionBaseViewModel } from '@/domaines/actions/ports/action.presenter';

  defineProps<{
    actionBaseViewModel: ActionBaseViewModel;
  }>();

  const premiereNotation = ref<number>(0);
</script>
