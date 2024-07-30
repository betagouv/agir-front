<template>
  <div
    class="service-link-card position--relative background--white shadow border-radius--md fr-p-2w full-height flex-column fr-grid-row flex-space-between"
  >
    <h3 class="fr-h6 fr-mb-0">
      <router-link :to="{ name: url }" class="service-link-card__link">{{ label }}</router-link>
    </h3>
    <div class="fr-grid-row flex-space-between">
      <span class="text--gris-light">{{ legende }}</span>
      <img :src="picto" alt="" height="26" />
    </div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    label: string;
    url: string;
    picto: string;
    legende: string;
  }>();
</script>

<style scoped>
  .service-link-card {
    transition: box-shadow 0.3s ease-in-out;
  }

  .service-link-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
    outline-width: 0;
  }

  .service-link-card__link {
    background-image: none;
    outline-width: 0;
  }

  .service-link-card__link::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    outline-color: inherit;
    outline-offset: 2px;
    outline-style: inherit;
    border-radius: 0.5rem;
  }
</style>
