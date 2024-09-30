<template>
  <section class="background--white fr-py-10w">
    <div class="fr-container">
      <LandingHeader />
    </div>
  </section>
  <section class="fr-py-8w background--beige">
    <div class="fr-container">
      <LandingPourquoi />
    </div>
  </section>
  <section class="background--bleu-dark fr-py-8w">
    <div class="fr-container">
      <LandingPourQui />
    </div>
  </section>
</template>

<script setup lang="ts">
  import LandingHeader from '@/components/custom/Landing/LandingHeader.vue';
  import LandingPourQui from '@/components/custom/Landing/LandingPourQui.vue';
  import LandingPourquoi from '@/components/custom/Landing/LandingPourquoi.vue';
</script>
