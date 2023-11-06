<template>
  <div class="background--white border border-radius--lg fr-p-4w shadow">
    <h2 class="fr-h2">Nos usages ont de l’effet sur l’environnement</h2>
    <p class="fr-text--lg">
      Voici une <strong>1ère estimation de vos impacts.</strong><br />
      Nous aurons l’occasion de l’affiner ensemble par la suite !
    </p>
    <div class="legende fr-text--sm fr-text--bold fr-mb-1v">
      <span class="fr-pl-2w">Impact très faible</span>
      <span class="fr-pr-2w">Impact très fort</span>
    </div>
    <div class="legende--jauge fr-grid-row fr-text--sm fr-mb-1w">
      <span>1</span>
      <span>2</span>
      <span>3</span>
      <span>4</span>
    </div>
    <div v-if="resultat">
      <div v-for="item in resultat" :key="item.libelle">
        <OnboardingJauge class="fr-mb-5v" :libelle="item.libelle" :valeur="item.valeur" />
      </div>
    </div>
    <p v-if="phrase" v-html="phrase" class="fr-mb-0 fr-text--sm" />
  </div>
</template>

<script setup lang="ts">
  import OnboardingJauge from '@/components/custom/Onboarding/OnboardingJauge.vue';

  defineProps<{
    resultat?: {
      libelle: string;
      valeur: number;
    }[];
    phrase?: string;
  }>();
</script>

<style scoped>
  .legende {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-left: auto;
    max-width: var(--widthJaugeOnboarding);
  }

  .legende--jauge {
    justify-content: space-between;
    margin-left: auto;
    max-width: var(--widthJaugeOnboarding);
  }

  .legende span::before {
    content: '';
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    height: 11px;
    width: 11px;
    border-radius: 50%;
  }

  .legende span:first-child::before {
    left: 0;
    background: #a3a3cd;
  }

  .legende span:nth-child(2)::before {
    right: 0;
    background-color: var(--blue-france-sun-113-625);
  }
</style>
