<template>
  <div class="headerThematique background--beige-gris-galet-975-75">
    <div class="fr-container">
      <h1 class="fr-h1 fr-col fr-m-0 fr-py-5w display-inline-block">
        <span aria-hidden="true"> {{ thematique.emoji }}</span>
        {{ thematique.labelDansLeMenu }}
      </h1>
      <router-link
        :to="{ name: RouteCompteName.LOGEMENT }"
        class="fr-tag fr-icon-map-pin-2-fill fr-tag--icon-left fr-ml-2w"
      >
        à {{ thematiqueResume.commune }}
      </router-link>

      <ul
        v-if="thematiqueResume.listeInformations"
        class="list-style-none listeServices flex flex-wrap fr-mb-7w fr-pl-0"
      >
        <li v-for="information in thematiqueResume.listeInformations" :key="information.label">
          <router-link
            v-if="information.to"
            :to="information.to"
            class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
          >
            {{ information.label }}
          </router-link>
          <a
            v-else-if="information.href"
            :href="information.href"
            class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
          >
            {{ information.label }}
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
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
    height: 20rem;
    background-image: v-bind(thematiqueIllustrationPath);
    background-repeat: no-repeat;
    background-position: right;
  }

  .listeServices {
    width: 60%;
    gap: 1rem;
  }
</style>
