<template>
  <div ref="HTMLDuCompteur" class="flex justify-center items-center">
    <div class="compteur border-radius--lg shadow" :style="{ backgroundColor: props.background }">
      <span v-for="(chiffre, index) in chiffresAvecAnimation" :key="index" class="digit fr-p-2w">
        {{ chiffre }}
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, onUnmounted } from 'vue';

  const props = defineProps<{ valeur: number; background?: string }>();

  const NOMBRE_DE_CHIFFRES = 4;
  const DUREE_ANIMATION = 1000;

  const estVisible = ref(false);
  const HTMLDuCompteur = ref<HTMLElement | null>(null);
  const valeurPrecedentes = ref(props.valeur);
  const chiffresAvecAnimation = ref<string[]>(Array(NOMBRE_DE_CHIFFRES).fill('0'));

  const lancerAnimation = (from: string, to: string, index: number) => {
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = (timestamp - startTime) / DUREE_ANIMATION;

      if (progress < 1) {
        const interpolated = Math.floor(Number(from) + (Number(to) - Number(from)) * progress);
        chiffresAvecAnimation.value[index] = String(interpolated);
        requestAnimationFrame(step);
      } else {
        chiffresAvecAnimation.value[index] = to;
      }
    };

    requestAnimationFrame(step);
  };

  const miseAJourDuCompteur = () => {
    if (!estVisible.value) return;

    const nouvelleValeur = String(props.valeur).padStart(NOMBRE_DE_CHIFFRES, '0').split('');

    nouvelleValeur.forEach((newDigit, index) => {
      const ancienneValeur = chiffresAvecAnimation.value[index] || '0';
      if (ancienneValeur !== newDigit) {
        lancerAnimation(ancienneValeur, newDigit, index);
      }
    });

    valeurPrecedentes.value = props.valeur;
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      estVisible.value = entry.isIntersecting;
      if (estVisible.value) miseAJourDuCompteur();
    },
    { threshold: 0.5 },
  );

  onMounted(() => {
    if (HTMLDuCompteur.value) observer.observe(HTMLDuCompteur.value);
  });

  onUnmounted(() => {
    if (HTMLDuCompteur.value) observer.unobserve(HTMLDuCompteur.value);
  });

  watch(() => props.valeur, miseAJourDuCompteur);
</script>

<style>
  .compteur {
    border: 5px solid white;
  }

  .digit {
    display: inline-block;
    border-right: 1px solid white;
    width: 3.5rem;
  }

  .digit:last-child {
    border-right: none;
  }
</style>
