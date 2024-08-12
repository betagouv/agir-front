<template>
  <div class="fr-grid-row background--white shadow fr-p-3w border-radius--md flex-space-between position--relative">
    <div>
      <img :src="pictoMission" class="fr-mr-2w" alt="" />
      <span class="text--normal fr-text--lg text--black">À découvrir</span>
    </div>
    <span class="fr-icon-lock-line" aria-hidden="true"></span>
  </div>
</template>

<script setup lang="ts">
  defineProps<{ pictoMission: string }>();
</script>
