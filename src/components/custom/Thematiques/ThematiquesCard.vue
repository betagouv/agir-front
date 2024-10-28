<template>
  <div
    class="thematique-card position--relative border-radius--md shadow background--white fr-p-1w full-height"
    :class="thematique.estTerminee ? 'opacity-6' : ''"
  >
    <span v-if="thematique.estNouvelle" class="thematique-card__badge fr-badge background--bleu-info-dark text--white">
      Nouveau !
    </span>
    <span v-if="thematique.estTerminee" class="thematique-card__badge fr-badge background--vert--success text--white">
      Terminé !
    </span>
    <img class="border-radius--md full-width img-object-fit-cover" height="144" :src="thematique.urlImage" alt="" />
    <BarreDeProgression
      :value="thematique.progression.etapeActuelle"
      :value-max="thematique.progression.etapeCible"
      :label="`Vous avez complété ${thematique.progression.etapeActuelle} missions sur ${thematique.progression.etapeCible}`"
      :couleur="thematique.estTerminee ? '#18753c' : '#0063CB'"
    />
    <h2 class="fr-text--lg text--semi-bold text--black fr-mb-1v text--lh-1-3 fr-pt-1w">
      <router-link
        :to="{
          name: RouteUniversName.THEMATIQUE,
          params: { id: thematique.thematiqueParentId, thematique: thematique.id },
        }"
        class="thematique-card__link"
      >
        {{ thematique.titre }}
      </router-link>
    </h2>
    <span v-if="thematique.niveau" class="text--semi-bold text--rouge-erreur fr-mt-auto">
      Niveau {{ thematique.niveau }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import { ThematiqueViewModel } from '@/domaines/thematiques/adapters/thematiques.presenter.impl';
  import { RouteUniversName } from '@/router/univers/routes';

  defineProps<{
    thematique: ThematiqueViewModel;
  }>();
</script>

<style scoped>
  .thematique-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: box-shadow 0.3s ease-in-out;
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
</style>
