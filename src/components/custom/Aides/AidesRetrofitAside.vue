<template>
  <CarteInfo>
    <p class="fr-text--bold">
      <span class="fr-icon-information-line" aria-hidden="true"></span>
      Données utilisées pour l’estimation
    </p>
    <ul>
      <li>
        Code postal : <span class="fr-text--bold">{{ codePostal }} {{ ville }}</span>
      </li>
      <li>
        Revenu fiscal de référence : <span class="fr-text--bold">{{ seuil }} </span> <br />
        <span v-if="revenuFiscal === null">⚠️ Donnée à compléter</span>
      </li>
      <li>
        Nombre de parts fiscales : <span class="fr-text--bold">{{ nombreDePartsFiscales }}</span>
      </li>
    </ul>
    <div class="fr-grid-row flex-center" v-if="revenuFiscal === null">
      <span class="fr-text--bold">Pour estimer vos aides</span>
      <router-link class="fr-btn display-block text--center full-width" :to="{ name: 'vos-aides-velo-formulaire' }">
        Compléter vos données
      </router-link>
    </div>
    <router-link
      v-else
      class="fr-link fr-icon-arrow-right-line fr-link--icon-right text--black-light"
      :to="{ name: 'vos-aides-retrofit-formulaire' }"
    >
      Modifier ces données
    </router-link>
  </CarteInfo>
</template>

<script setup lang="ts">
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import { calculerSeuils } from '@/shell/calculerSeuils';
  import { ref } from 'vue';

  const props = defineProps<{
    codePostal: string;
    ville: string;
    revenuFiscal: number | null;
    nombreDePartsFiscales: number;
  }>();
  const seuil = ref<string>('');
  if (props.revenuFiscal !== null) {
    const seuils = calculerSeuils(props.nombreDePartsFiscales).filter(
      seuil => seuil.value === props.revenuFiscal!.toString()
    );
    seuil.value = seuils[0].label;
  }
</script>
