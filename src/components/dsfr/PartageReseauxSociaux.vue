<template>
  <div class="fr-share align-items--center">
    <div class="flex fr-grid-row fr-grid-row--gutters flex-space-between full-width align-items--center fr-pb-1w">
      <p class="fr-mb-0">Partager la page</p>
      <ul class="fr-btns-group">
        <li>
          <a
            :href="`mailto:?subject=&body=${url}`"
            class="fr-btn--mail fr-btn fr-mb-0"
            rel="noopener external"
            target="_blank"
            title="Partager par email - nouvelle fenêtre"
          >
            Partager par email
          </a>
        </li>
        <li>
          <button
            class="fr-btn--copy fr-btn fr-mb-0"
            onclick="navigator.clipboard.writeText(window.location).then(function() {alert('Adresse copiée dans le presse papier.')});"
          >
            Copier dans le presse-papier
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/share/share.min.css';
  import { ref } from 'vue';

  const url = ref<string>(window.location.href);
</script>
