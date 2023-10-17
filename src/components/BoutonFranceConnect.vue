<template>
  <div class="fr-connect-group">
    <button class="fr-connect" type="button" @click.prevent="loginFranceConnect">
      <span class="fr-connect__login">S’identifier avec</span>
      <span class="fr-connect__brand">FranceConnect</span>
    </button>
    <p>
      <a
        href="https://franceconnect.gouv.fr/"
        target="_blank"
        rel="noopener"
        title="Qu’est-ce que FranceConnect ? - nouvelle fenêtre"
        >Qu’est-ce que FranceConnect ?</a
      >
    </p>
  </div>
</template>
<script setup lang="ts">
  const loginFranceConnect = () => {
    window.location.href = 'http://localhost:3000/login';
  };
</script>
