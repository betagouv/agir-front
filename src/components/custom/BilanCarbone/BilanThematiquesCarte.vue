<template>
  <div
    class="thematique-card position--relative fr-p-1w fr-pb-2w border-radius--md shadow background--white full-height"
  >
    <span v-if="estTermine" class="thematique-card__badge fr-badge background--vert--success text--white">
      Terminé !
    </span>
    <img class="full-width img-object-fit-cover border-radius--xs" height="150" :src="urlImage" alt="" />
    <BarreDeProgression
      class="fr-mb-1w"
      :label="`Progression ${thematique}`"
      :value="progression"
      :value-max="100"
      :couleur="estTermine ? '#18753c' : '#0063CB'"
    />
    <p class="fr-text--lg text--semi-bold text--black fr-mb-1v text--lh-1-3 fr-pt-1w">
      <router-link
        class="thematique-card__link"
        :to="{
          name: RouteBilanCarboneName.BILAN_CARBONE_ENCHAINEMENT,
          params: {
            thematiqueId: thematique,
            id: contentId,
          },
        }"
        :title="`Allez sur l'estimation du bilan ${label}`"
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
    thematique: string;
  }>();
</script>

<style scoped>
  .thematique-card {
    transition: box-shadow 0.3s ease-in-out;
  }

  .thematique-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
  }

  .thematique-card__link {
    background-image: none;
    outline-width: 0;
  }

  .thematique-card__link::before {
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

  .thematique-card__badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: max-content;
  }
</style>
