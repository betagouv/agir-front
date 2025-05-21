<template>
  <div v-if="inscritDepuisLeMobile && estSurMobile">
    <p>Vous êtes sur le point de finaliser votre inscription.</p>
    <div class="flex flex-column align-items--center">
      <a :href="magicLinkMobileAppUrl" class="fr-btn fr-mb-3w">Continuer sur l'application mobile</a>
      <a :href="magicLinkMobileNavigateurUrl" class="fr-btn fr-btn--secondary">Continuer sur ce navigateur</a>
    </div>
  </div>

  <p v-else class="fr-h3">Redirection en cours ... Veuillez patienter.</p>
</template>

<script setup lang="ts">
  import { computed, onMounted } from 'vue';

  const props = defineProps<{
    inscritDepuisLeMobile: boolean;
    estSurMobile: boolean;
    validerCompteUtilisateur: () => Promise<void>;
  }>();

  const magicLinkMobileAppUrl = computed(() => window.location.href.replace(/^https?:\/\//, 'jagis://'));
  const magicLinkMobileNavigateurUrl = computed(() => {
    const url = new URL(window.location.href);
    url.searchParams.delete('origin');
    return url.toString();
  });

  onMounted(async () => {
    if (props.inscritDepuisLeMobile && props.estSurMobile) {
      window.location.href = magicLinkMobileAppUrl.value;
      return;
    }

    await props.validerCompteUtilisateur();
  });
</script>
