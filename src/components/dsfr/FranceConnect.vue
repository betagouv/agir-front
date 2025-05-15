<template>
  <div v-if="franceConnectActive" class="franceConnect fr-grid-row fr-pb-1w">
    <div class="fr-pl-2w fr-py-2w fr-col-12 fr-col-md-7">
      <h2 class="fr-m-0 fr-h3">Utiliser FranceConnect</h2>
      <p class="fr-mb-0">
        FranceConnect est la solution proposée par l’État pour sécuriser et simplifier la connexion à vos services en
        ligne.
      </p>
    </div>

    <div class="fr-col-12 fr-col-md-5 fr-pr-1w">
      <div class="full-width full-height flex flex-column flex-center">
        <div class="fr-connect-group flex flex-center flex-column align-items--center">
          <button type="button" class="fr-connect" @click="appelerBackPourCommencerFranceConnect">
            <span class="fr-connect__login">S’identifier avec</span>
            <span class="fr-connect__brand">FranceConnect</span>
          </button>
          <p class="fr-mb-0">
            <a
              href="https://franceconnect.gouv.fr/"
              target="_blank"
              rel="noopener"
              title="Qu’est-ce que FranceConnect ? - nouvelle fenêtre"
            >
              Qu’est-ce que FranceConnect ?
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/connect/connect.min.css';

  const props = defineProps<{ situationId?: string | null; titleClass?: string }>();

  const appelerBackPourCommencerFranceConnect = async () => {
    if (props.situationId) {
      window.location.href = `${import.meta.env.VITE_API_URL}/login_france_connect?situation_ngc_id=${props.situationId}`;
    } else {
      window.location.href = `${import.meta.env.VITE_API_URL}/login_france_connect`;
    }
  };

  const franceConnectActive = import.meta.env.VITE_FRANCE_CONNECT === 'true';
</script>

<style scoped>
  .franceConnect {
    background: #f6f7fa;
  }
</style>
