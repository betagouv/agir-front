<template>
  <div class="headerThematique background--beige-gris-galet-975-75 fr-pb-7w">
    <div class="fr-container">
      <div class="fr-py-5w">
        <h1 class="fr-h1 fr-col fr-m-0 fr-pb-2w display-inline-block">
          <span aria-hidden="true"> {{ thematique.emoji }}</span>
          {{ thematique.labelDansLeMenu }}
        </h1>
        <router-link
          :to="{ name: RouteCompteName.LOGEMENT }"
          class="fr-tag fr-icon-map-pin-2-fill fr-tag--icon-left fr-ml-2w"
        >
          à {{ thematiqueResume.commune }}
        </router-link>
      </div>

      <ListeRaccourcis :liste-raccourcis="thematiqueResume.listeRaccourcis" class="listeServices" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import ListeRaccourcis from '@/components/custom/Thematiques/ListeRaccourcis.vue';
  import { Thematique } from '@/domaines/thematiques/MenuThematiques';
  import { ThematiqueResumeViewModel } from '@/domaines/thematiques/ports/thematiqueResume.presenter';
  import { RouteCompteName } from '@/router/compte/routeCompteName';

  const props = defineProps<{
    thematique: Thematique;
    thematiqueResume: ThematiqueResumeViewModel;
  }>();

  const thematiqueIllustrationPath = `url(${props.thematique.illustration})`;
</script>

<style scoped>
  .headerThematique {
    min-height: 20rem;
    background-image: v-bind(thematiqueIllustrationPath), linear-gradient(var(--beige-gris-galet-975-75), #ffffff);
    background-repeat: no-repeat;
    background-position: right bottom;
  }
  .listeServices {
    @media all and (min-width: 767px) {
      width: 60%;
    }
  }
</style>
