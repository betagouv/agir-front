<template>
  <div class="background--gris text--gris-light fr-p-2w flex align-items--center flex-center border--top--grey">
    <p class="fr-mb-0 text--center">Avez-vous aimé cette page ?</p>
    <div class="flex fr-pl-1w">
      <button
        v-for="index in 4"
        :key="index"
        :aria-label="`${index} étoiles`"
        class="fr-icon fr-mr-1v fr-icon-star-line fr-px-0"
        data-fr-opened="false"
        aria-controls="fr-modal-1"
        @click="premiereNotation = index"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
  const premiereNotation = defineModel('notation');
</script>
