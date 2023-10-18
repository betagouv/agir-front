<template>
  <section class="background--white fr-py-10w">
    <div class="fr-container">
      <LandingHeader />
    </div>
  </section>
  <section class="fr-py-8w">
    <div class="fr-container">
      <LandingCarousel />
    </div>
  </section>
  <section class="background--bleu-dark fr-py-8w">
    <div class="fr-container">
      <LandingPourQui />
    </div>
  </section>
  <section class="background--white fr-py-8w">
    <div class="fr-container">
      <LandingParQui />
    </div>
  </section>
</template>

<script setup lang="ts">
  import LandingHeader from '@/components/custom/Landing/LandingHeader.vue';
  import LandingPourQui from '@/components/custom/Landing/LandingPourQui.vue';
  import LandingParQui from '@/components/custom/Landing/LandingParQui.vue';
  import LandingCarousel from '@/components/custom/Landing/LandingCarousel.vue';
</script>
