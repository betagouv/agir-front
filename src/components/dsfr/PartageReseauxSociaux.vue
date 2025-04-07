<template>
  <div id="share-7093" class="fr-share">
    <p class="fr-share__title text--center">Partager la page</p>
    <ul class="fr-btns-group">
      <li>
        <a
          id="share-7094"
          :href="`https://www.facebook.com/sharer.php?u=${url}`"
          class="fr-btn--facebook fr-btn"
          onclick="window.open(this.href,'Partager sur Facebook','toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=450'); event.preventDefault();"
          rel="noopener"
          target="_blank"
          title="Partager sur Facebook - nouvelle fenêtre"
        >
          Partager sur Facebook
        </a>
      </li>
      <li>
        <a
          id="share-7095"
          :href="`https://twitter.com/intent/tweet?url=${url}`"
          class="fr-btn--twitter-x fr-btn"
          onclick="window.open(this.href,'Partager sur X (anciennement Twitter)','toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=600,height=420'); event.preventDefault();"
          rel="noopener"
          target="_blank"
          title="Partager sur X (anciennement Twitter) - nouvelle fenêtre"
        >
          Partager sur X (anciennement Twitter)
        </a>
      </li>
      <li>
        <a
          id="share-7096"
          :href="`https://www.linkedin.com/shareArticle?url=${url}`"
          class="fr-btn--linkedin fr-btn"
          onclick="window.open(this.href,'Partager sur LinkedIn','toolbar=no,location=yes,status=no,menubar=no,scrollbars=yes,resizable=yes,width=550,height=550'); event.preventDefault();"
          rel="noopener"
          target="_blank"
          title="Partager sur LinkedIn - nouvelle fenêtre"
        >
          Partager sur LinkedIn
        </a>
      </li>
      <li>
        <a
          id="share-7097"
          class="fr-btn--mail fr-btn"
          href="mailto:?subject=[À MODIFIER - objet du mail]&body=[À MODIFIER - titre ou texte descriptif de la page] [À MODIFIER - url de la page]"
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
