<template>
  <nav class="fr-sidemenu fr-sidemenu--sticky full-height" aria-labelledby="fr-sidemenu-title">
    <div class="fr-sidemenu__inner full-height fr-py-2w">
      <button class="fr-sidemenu__btn" hidden aria-controls="fr-sidemenu-wrapper" aria-expanded="false">
        Ouvrir la navigation
      </button>
      <div class="fr-collapse" id="fr-sidemenu-wrapper">
        <template v-for="section in sections">
          <div class="fr-sidemenu__header" />
          <p class="fr-sidemenu__title fr-mb-2w" id="sidemenu-title" v-if="section.titre" v-text="section.titre" />
          <ul class="fr-sidemenu__list fr-mb-2w">
            <li
              v-for="lien in section.liens"
              :key="lien.url"
              class="fr-sidemenu__item"
              :class="currentPageName === lien.url && 'fr-sidemenu__item--active'"
            >
              <router-link
                :to="{ name: lien.url, params: lien.params }"
                class="fr-sidemenu__link"
                target="_self"
                :aria-current="currentPageName === lien.url ? 'page' : undefined"
              >
                <span v-if="lien.icon" aria-hidden="true" class="fr-mr-1w" :class="lien.icon" />
                {{ lien.label }}
              </router-link>
            </li>
          </ul>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import '@gouvfr/dsfr/dist/component/sidemenu/sidemenu.min.css';

  defineProps<{
    sections: {
      titre?: string;
      liens: {
        label: string;
        url: string;
        params?: Record<string, string>;
        icon?: string;
      }[];
    }[];
  }>();

  const route = useRoute();
  const currentPageName = route.name;
</script>
