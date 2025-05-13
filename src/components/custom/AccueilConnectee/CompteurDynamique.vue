<template>
  <span ref="HTMLDuCompteur" class="flex justify-center items-center" aria-hidden="true">
    <span class="compteur border-radius--lg shadow" :style="{ backgroundColor: props.background }">
      <span v-for="(chiffre, index) in chiffres" :key="index" class="digit">
        <span class="digit-inner" :style="translateALaBonneHauteur(chiffre)">
          <span v-for="n in 10" :key="n" class="digit-number">{{ n - 1 }}</span>
        </span>
      </span>
    </span>
  </span>
</template>

<script setup lang="ts">
  import { ref, watch, onMounted, onUnmounted } from 'vue';

  const props = defineProps<{ valeur: number; background?: string }>();

  const HTMLDuCompteur = ref<HTMLElement | null>(null);
  const estVisible = ref(false);
  const nombreDeChiffres = Math.max(4, String(props.valeur).length);

  const chiffres = ref<number[]>(Array(nombreDeChiffres).fill(0));

  const translateALaBonneHauteur = (digit: number) => ({
    transform: `translateY(-${digit * 10}%)`,
  });

  const miseAJourDuCompteur = () => {
    if (!estVisible.value) return;

    const nouvelleValeur = String(props.valeur).padStart(nombreDeChiffres, '0').split('').map(Number);
    chiffres.value = nouvelleValeur;
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
    display: flex;
    overflow: hidden;
    border: 5px solid white;
    font-size: 2rem;
  }

  .digit {
    width: 3.5rem;
    height: 2em;
    overflow: hidden;
    position: relative;
    border-right: 1px solid white;
  }

  .digit:last-child {
    border-right: none;
  }

  .digit-inner {
    display: flex;
    flex-direction: column;
    transition: transform 1s cubic-bezier(0.3, 1.25, 0.5, 1);
  }

  .digit-number {
    height: 2em;
    line-height: 2em;
    text-align: center;
  }
</style>
