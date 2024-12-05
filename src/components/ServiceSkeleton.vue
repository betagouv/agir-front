<template>
  <div class="skeleton skeleton-title fr-mb-8w"></div>

  <div class="fr-grid-row fr-grid-row--gutters fr-py-3w">
    <div class="skeleton-cards fr-col-12 fr-col-md-9">
      <div class="skeleton fr-mb-3w"></div>

      <ul class="fr-grid-row fr-grid-row--gutters fr-mb-2w list-style-none">
        <li v-for="n in 6" :key="n" class="fr-col-12 fr-col-md-6">
          <ServiceSkeletonCarte />
        </li>
      </ul>
    </div>

    <div class="skeleton-aside fr-col-12 fr-col-md-3"><div class="skeleton"></div></div>
  </div>
</template>

<style scoped>
  .skeleton {
    height: 1.25rem;
    border-radius: 4px;
    background-color: #7a7a7a;
    animation: loadingAnimation 1.5s ease-in-out infinite;
  }

  .skeleton-aside {
    height: 60vh;
  }

  .skeleton-aside > .skeleton {
    height: 100%;
  }

  .skeleton-title {
    height: 1.75rem;
    width: 400px;
  }

  .skeleton-cards .skeleton:nth-child(1) {
    height: 1.5rem;
    width: 150px;
  }

  @keyframes loadingAnimation {
    0% {
      opacity: 0.6;
    }
    50% {
      opacity: 0.4;
    }
    100% {
      opacity: 0.6;
    }
  }
</style>
<script setup>
  import ServiceSkeletonCarte from '@/components/ServiceSkeletonCarte.vue';
</script>
