<template>
  <a href="http://localhost:3000/login" id="france-connect-particulier" class="france-connect-particulier"></a>
  <p class="fr-mt-2v">
    <a href="https://franceconnect.gouv.fr/" class="fr-link" target="_blank" rel="noopener" title="Qu’est-ce que FranceConnect ? - nouvelle fenêtre"
      >Qu’est-ce que FranceConnect ?</a
    >
  </p>
</template>
<script setup lang="ts"></script>
<style scoped>
.france-connect-particulier {
  display: inline-block;
  background-image: url("/franceconnect-btn.svg") !important;
  background-repeat: no-repeat;
  background-size: 216px 60px;
  width: 216px;
  height: 60px;
  border: 1px solid #0c419a;
}
</style>
