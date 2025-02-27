<template>
  <section class="fr-col-12 fr-col-md-6 fr-col-lg-3">
    <div class="shadow text--left fr-p-2w full-height flex flex-column flex-space-between background--white">
      <div class="fr-mb-3v flex flex-column align-items--center flex-space-between full-height">
        <div class="fr-mb-2w full-width">
          <h3 class="fr-h4 fr-pb-2w fr-mb-2w fr-text--md" v-html="syntheseThematique.titreHTML" />
          <ul>
            <li
              v-for="point in syntheseThematique.bulletPoints"
              :key="point"
              v-html="point"
              class="fr-mb-1v fr-mx-1v"
            />
          </ul>
        </div>

        <router-link
          class="fr-btn"
          :to="{ name: RouteThematiquesName.THEMATIQUE_V2, params: { id: syntheseThematique.id } }"
        >
          Découvrir
        </router-link>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { SyntheseThematiqueViewModel } from '@/domaines/thematiques/ports/syntheseThematique.presenter';
  import { RouteThematiquesName } from '@/router/thematiques/routes';

  defineProps<{
    syntheseThematique: SyntheseThematiqueViewModel;
  }>();
</script>

<style scoped>
  h3 {
    border-bottom: 1px solid #eaeaea;
  }
</style>
