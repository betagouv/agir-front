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

      <ul v-if="thematiqueResume.listeInformations" class="list-style-none listeServices flex flex-wrap fr-pl-0">
        <li v-for="information in thematiqueResume.listeInformations" :key="information.label">
          <router-link
            v-if="information.to"
            :to="information.to"
            class="shadow fr-btn fr-btn--tertiary-no-outline background--white fr-btn--icon-right fr-icon-arrow-right-line text--black"
          >
            {{ information.label }}
          </router-link>
          <a
            target="_blank"
            rel="noopener noreferrer"
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
    min-height: 20rem;
    background-image: v-bind(thematiqueIllustrationPath), linear-gradient(var(--beige-gris-galet-975-75), #ffffff);
    background-repeat: no-repeat;
    background-position: right bottom;
  }

  .listeServices {
    @media all and (min-width: 767px) {
      width: 60%;
    }
    gap: 1rem;
  }
</style>
