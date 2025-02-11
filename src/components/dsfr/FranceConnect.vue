<template>
  <div v-if="franceConnectActive" class="fr-connect-group">
    <h2 class="fr-m-0">Utiliser FranceConnect</h2>
    <p class="fr-mt-0">
      FranceConnect est la solution proposée par l’État pour sécuriser et simplifier la connexion à vos services en
      ligne.
    </p>
    <div class="flex align-items--center flex-column">
      <button class="fr-connect" type="button" @click="appelerBackPourCommencerFranceConnect">
        <span class="fr-connect__login">S’identifier avec</span>
        <span class="fr-connect__brand">FranceConnect</span>
      </button>
      <p>
        <a
          href="https://franceconnect.gouv.fr/"
          rel="noopener"
          target="_blank"
          title="Qu’est-ce que FranceConnect ? - nouvelle fenêtre"
          >Qu’est-ce que FranceConnect ?</a
        >
      </p>
    </div>

    <div class="separator">
      <hr />
      <span>ou</span>
      <hr />
    </div>
  </div>
</template>
<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/connect/connect.min.css';

  const appelerBackPourCommencerFranceConnect = async () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/login_france_connect`;
  };

  const franceConnectActive = import.meta.env.VITE_FRANCE_CONNECT === 'true';
  console.log(import.meta.env.VITE_FRANCE_CONNECT);
</script>

<style scoped>
  .separator {
    display: flex;
    align-items: center;
    gap: 1rem;
  }

  .separator hr {
    flex-grow: 1;
    width: 100%;
    margin-top: 1rem;
  }
</style>
