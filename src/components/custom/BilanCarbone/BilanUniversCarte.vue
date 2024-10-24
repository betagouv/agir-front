<template>
  <div class="univers-card position--relative fr-p-1w fr-pb-3w border-radius--md shadow background--white full-height">
    <span v-if="estTermine" class="univers-card__badge fr-badge background--vert--success text--white">
      Terminé !
    </span>
    <img class="full-width img-object-fit-cover border-radius--xs" height="150" :src="urlImage" alt="" />
    <BarreDeProgression
      label="Progression"
      :value="progression"
      :value-max="100"
      :couleur="estTermine ? '#18753c' : '#0063CB'"
    />
    <p class="fr-text--lg text--semi-bold text--black fr-mb-0">
      <router-link
        class="univers-card__link"
        :to="{
          name: RouteBilanCarboneName.BILAN_CARBONE_ENCHAINEMENT,
          params: {
            univers: univers,
            id: contentId,
          },
        }"
        :title="`Allez sur l'estimation du bilan ${univers}`"
      >
        {{ label }}
      </router-link>
    </p>
    {{ nombreDeQuestions }} questions
  </div>
</template>

<script setup lang="ts">
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';

  defineProps<{
    contentId: string;
    label: string;
    urlImage: string;
    estTermine: boolean;
    nombreDeQuestions: number;
    progression: number;
    univers: string;
  }>();
</script>

<style scoped>
  .univers-card {
    transition: box-shadow 0.3s ease-in-out;
  }

  .univers-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
  }

  .univers-card__link {
    background-image: none;
    outline-width: 0;
  }

  .univers-card__link::before {
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

  .univers-card__badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: max-content;
  }
</style>
