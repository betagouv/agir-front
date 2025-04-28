<template>
  <div class="fr-card fr-enlarge-link fr-card--horizontal fr-card--sm">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          <span class="display-block text--normal fr-text--sm fr-mb-0 text--italic">Proposé par</span>
          <a :href="lien.url" target="_blank" rel="noopener noreferrer">{{ titre }}</a>
        </h3>
        <p class="fr-card__desc" v-text="description" />
        <div class="fr-card__end">
          <p class="fr-card__detail fr-icon-links-fill" v-text="lien.urlAffichee"></p>
        </div>
      </div>
    </div>
    <div class="fr-card__header">
      <div class="fr-card__img">
        <img class="fr-responsive-img" :src="imageSrc" :alt="imageAlt" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  defineProps<{
    titre: string;
    description: string;
    lien: {
      url: string;
      urlAffichee: string;
    };
    imageSrc: string;
    imageAlt?: string;
  }>();
</script>

<style scoped>
  .fr-card--horizontal .fr-card__header {
    flex: 0 0 20%;
  }
</style>
