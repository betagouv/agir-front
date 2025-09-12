<template>
  <div class="fr-card fr-card--sm fr-enlarge-link fr-card--shadow">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title">
          <router-link :to="action.url"><span v-html="action.titre" /></router-link>
        </h3>
        <div class="fr-card__start flex fr-mb-1w">
          <ul class="fr-tags-group">
            <li v-if="afficherThematique">
              <ThematiqueTag
                :tag="{
                  label: action.thematiqueTag.label,
                  style: action.thematiqueTag.style,
                }"
              />
            </li>
            <li v-if="action.label" class="line-height--2">
              <p :class="`fr-tag fr-m-0 ${action.label.color}`" v-text="action.label.text" />
            </li>
          </ul>
        </div>
        <div class="fr-card__end fr-mt-2w fr-p-0">
          <p v-if="action.nombreDeParticipants" class="fr-card__detail fr-icon-team-line fr-mb-2w line-height--2">
            <span v-html="action.nombreDeParticipants" />
          </p>

          <template v-if="action.badges && action.badges?.length > 0">
            <ul class="fr-badges-group fr-mt-2w">
              <li v-for="badge in action.badges" :key="badge.text">
                <p :class="`fr-badge ${badge.color}`"><span v-html="badge.text" /></p>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';

  withDefaults(
    defineProps<{
      action: ActionViewModel;
      afficherThematique: boolean;
    }>(),
    { afficherThematique: false },
  );
</script>

<style scoped>
  .line-height--2 {
    line-height: 2rem;
  }

  .fr-card__detail {
    line-height: 1.5;
  }

  .height-3 {
    height: 3rem;
  }

  .fr-card__end {
    justify-content: flex-start !important;
  }

  @media all and (min-width: 62em) {
    .fr-card {
      min-height: 20.3rem;
    }
  }
</style>
