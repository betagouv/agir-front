<template>
  <div
    class="mission-card position--relative border-radius--md shadow background--white fr-p-1w full-height"
    :class="mission.estTerminee ? 'opacity-6' : ''"
  >
    <span v-if="mission.estNouvelle" class="mission-card__badge fr-badge background--bleu-info-dark text--white">
      Nouveau !
    </span>
    <span v-if="mission.estTerminee" class="mission-card__badge fr-badge background--vert--success text--white">
      Terminé !
    </span>
    <img class="border-radius--md full-width img-object-fit-cover" height="144" :src="mission.urlImage" alt="" />
    <BarreDeProgression
      :value="mission.progression.etapeActuelle"
      :value-max="mission.progression.etapeCible"
      :label="`Vous avez complété ${mission.progression.etapeActuelle} missions sur ${mission.progression.etapeCible}`"
      :couleur="mission.estTerminee ? '#18753c' : '#0063CB'"
      class="fr-mb-1w"
    />
    <ThematiqueTag
      v-if="mission.tagThematique"
      :thematiqueClefAPI="mission.clefThematique"
      :tag="mission.tagThematique"
    />
    <h2 class="fr-text--lg text--semi-bold text--black fr-mb-1v text--lh-1-3">
      <router-link
        :to="{
          name: RouteThematiquesName.MISSION,
          params: {
            id: MenuThematiques.getThematiqueData(mission.clefThematique as ClefThematiqueAPI).url,
            missionId: mission.id,
          },
        }"
        class="mission-card__link"
      >
        {{ mission.titre }}
      </router-link>
    </h2>
    <span v-if="mission.niveau" class="text--semi-bold text--rouge-erreur fr-mt-auto">
      Niveau {{ mission.niveau }}
    </span>
  </div>
</template>

<script setup lang="ts">
  import BarreDeProgression from '@/components/custom/BarreDeProgression.vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { MissionViewModel } from '@/domaines/missions/adapters/missions.presenter.impl';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteThematiquesName } from '@/router/univers/routes';

  defineProps<{
    mission: MissionViewModel;
  }>();
</script>

<style scoped>
  .mission-card {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    transition: box-shadow 0.3s ease-in-out;
  }

  .mission-card:hover {
    box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.4);
  }

  .mission-card__badge {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    width: max-content;
  }

  .mission-card__link {
    background-image: none;
    outline-width: 0;
  }

  .mission-card__link::before {
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
