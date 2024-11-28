<template>
  <div
    class="defi full-height border-radius--md background--white shadow fr-p-3w border"
    :class="`${defi.couleurBordure}`"
  >
    <span v-if="defi.badge" class="item__badge fr-badge text--transform-none" :class="`${defi.badge.style}`">
      {{ defi.badge.label }}
    </span>
    <h3 class="text--normal fr-text--lg">{{ defi.titre }}</h3>
    <router-link
      v-if="!defi.aEteRealisee"
      :to="{ path: defi.url }"
      :class="`fr-btn ${defi.link.style}`"
      :title="defi.link.title"
    >
      {{ defi.link.label }}
    </router-link>
  </div>
</template>

<script setup lang="ts">
  import { MissionDefiViewModel } from '@/domaines/missions/adapters/mission.presenter.impl';

  defineProps<{ defi: MissionDefiViewModel }>();
</script>

<style scoped>
  .defi {
    display: flex;
    position: relative;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }

  .item__badge {
    position: absolute;
    width: max-content;
    top: 0;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
</style>
