<template>
  <div class="fr-card fr-card--sm fr-enlarge-link">
    <div class="fr-card__body">
      <div class="fr-card__content">
        <h3 class="fr-card__title" v-html="actionPreview.titre" />

        <div class="fr-card__start" v-if="actionPreview.pourcentageReco > 0">
          <ul class="fr-tags-group">
            <li class="line-height--2">
              <p class="fr-tag fr-m-0 background-bleu-light text--bleu">
                Recommandé à {{ actionPreview.pourcentageReco }} %
              </p>
            </li>
          </ul>
        </div>

        <div class="fr-card__end fr-mt-1w fr-pt-0">
          <hr class="full-width fr-mt-2w" />

          <p class="fr-badge background-bleu-light text--bleu"><span v-html="actionPreview.type" /></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { PersonnalisationDuneAction } from '@/domaines/personnalisation/ports/personnalisation.repository';

  defineProps<{
    actionPreview: PersonnalisationDuneAction;
  }>();
</script>

<style scoped>
  .line-height--2 {
    line-height: 2rem;
  }
</style>
