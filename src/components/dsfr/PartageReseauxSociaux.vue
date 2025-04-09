<template>
  <div id="share-7093" class="fr-share">
    <p class="fr-share__title text--center">Partager la page</p>
    <ul class="fr-btns-group">
      <li>
        <a
          id="share-7097"
          :href="`mailto:?subject=&body=${url}`"
          class="fr-btn--mail fr-btn"
          rel="noopener external"
          target="_blank"
          title="Partager par email - nouvelle fenêtre"
        >
          Partager par email
        </a>
      </li>
      <li>
        <button
          id="share-7098"
          class="fr-btn--copy fr-btn"
          onclick="navigator.clipboard.writeText(window.location).then(function() {alert('Adresse copiée dans le presse papier.')});"
        >
          Copier dans le presse-papier
        </button>
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/share/share.min.css';
  import { ref } from 'vue';

  const url = ref<string>(window.location.href);
</script>
