<template>
  <nav class="fr-sidemenu fr-sidemenu--sticky" aria-labelledby="fr-sidemenu-title">
    <div class="fr-sidemenu__inner">
      <button class="fr-sidemenu__btn" hidden aria-controls="fr-sidemenu-wrapper" aria-expanded="false">
        Dans cette rubrique
      </button>
      <div class="fr-collapse" id="fr-sidemenu-wrapper">
        <div class="fr-sidemenu__title" id="fr-sidemenu-title">Sommaire profil</div>
        <ul class="fr-sidemenu__list">
          <li
            v-for="lien in liens"
            :key="lien.url"
            class="fr-sidemenu__item"
            :class="currentPageName === lien.url && 'fr-sidemenu__item--active'"
          >
            <router-link
              :to="{ name: lien.url }"
              class="fr-sidemenu__link"
              target="_self"
              :aria-current="currentPageName === lien.url ? 'page' : undefined"
            >
              {{ lien.label }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import '@gouvfr/dsfr/dist/component/sidemenu/sidemenu.min.css';

  defineProps<{
    liens: {
      label: string;
      url: string;
    }[];
  }>();

  const route = useRoute();
  const currentPageName = route.name;
</script>
