<template>
  <router-link
    class="thematique-card position--relative fr-p-1w fr-pb-2w shadow background--white full-height flex flex-column"
    :to="{
      name: RouteBilanCarboneName.BILAN_CARBONE_ENCHAINEMENT,
      params: {
        thematiqueId: thematique,
        id: contentId,
      },
    }"
    :title="`${label}: affiner votre empreinte écologique avec ${nombreDeQuestions} questions ${estTermine ? '(Terminé) ' : `(achevé à ${progression}%)`}`"
  >
    <div>
      <h3 class="fr-text--lg text--semi-bold text--black fr-mb-1v text--lh-1-3 fr-pt-1w">
        {{ label }}
      </h3>
      <span class="fr-sr-only">,</span>
      <p class="fr-m-0">{{ nombreDeQuestions }} questions</p>
      <span class="fr-sr-only">,</span>
    </div>

    <BarreDeProgression
      class="fr-mb-1w"
      :label="`Progression ${thematique} : ${progression}%`"
      :value="progression"
      :value-max="100"
      :couleur="estTermine ? '#18753c' : '#0063CB'"
    />

    <img class="full-width img-object-fit-cover border-radius--xs fr-mb-1w" height="150" :src="urlImage" alt="" />

    <span v-if="estTermine" class="thematique-card__badge fr-badge background--vert--success text--white">
      Terminé !
    </span>
  </router-link>
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
    background-image: none;
    transition: box-shadow 0.3s ease-in-out;
    flex-direction: column-reverse;
  }

  .thematique-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
  }

  .thematique-card__badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: max-content;
  }
</style>
