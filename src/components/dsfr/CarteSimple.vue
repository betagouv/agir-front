<template>
  <div class="fr-card fr-enlarge-link fr-card--sm">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          <router-link :to="{ path: url }">{{ titre }}</router-link>
        </h3>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <img class="fr-responsive-img" :src="image" alt="" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    titre: string;
    image: string;
    url: string;
  }>();
</script>
