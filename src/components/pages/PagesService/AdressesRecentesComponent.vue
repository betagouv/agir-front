<template>
  <ul class="fr-tags-group fr-grid-row fr-grid-row--gutters list-style-none fr-mt-2w">
    <li class="fr-pb-1w fr-px-1v" v-if="onGeolocalisationSelectionne">
      <button
        class="fr-tag fr-icon-map-pin-2-line fr-tag--icon-left fr-m-0"
        type="button"
        @click.prevent="
          () => {
            trackClick('Adresse Recente', 'Geolocalisation sélectionnée');
            onGeolocalisationSelectionne!();
          }
        "
      >
        Ma position
      </button>
    </li>

    <li v-if="adressePrincipaleComplete" class="fr-pb-1w fr-px-1v">
      <button
        class="fr-tag fr-icon-home-4-fill fr-tag--icon-left fr-m-0"
        type="button"
        @click.prevent="
          () => {
            trackClick('Adresse Recente', 'Adresse Chez moi selectionnee');
            onAdresseResidencePrincipaleSelectionnee();
          }
        "
      >
        Chez moi
      </button>
    </li>

    <li v-for="adresse in adressesRecentes" :key="adressesRecentes.indexOf(adresse)" class="fr-pb-1w fr-px-1v">
      <div>
        <button
          :id="adresse.id"
          class="fr-tag adresses-recentes fr-m-0 background-bleu-light text--bleu fr-pr-4w"
          type="button"
          @click.prevent="
            () => {
              trackClick('Adresse Recente', 'Adresse recente selectionnee');
              onAdresseRecenteSelectionnee(adresse);
            }
          "
        >
          {{ adresse.numero_rue }} {{ adresse.rue }}, {{ adresse.commmune }} ({{ adresse.code_postal }})
        </button>

        <button class="btn-suppression">
          <img
            id="trash"
            :alt="`Supprimer l'adresse ${adresse.rue}`"
            src="/ic-blue-delete-bin-line.svg"
            width="16"
            @click.prevent="supprimerAdresseRecente(adresse.id)"
          />
        </button>
      </div>
    </li>
  </ul>

  <Teleport to="body">
    <ModaleErreurGeolocalisation :modale-id="MODALE_GEOLOCALISATION_ID" />
  </Teleport>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import ModaleErreurGeolocalisation from '@/components/custom/Modale/ModaleErreurGeolocalisation.vue';
  import { useDsfrModale } from '@/composables/useDsfrModale';
  import { HistoriqueAdresseRepositoryAxios } from '@/domaines/adresses/adapters/historiqueAdresse.repository.axios';
  import {
    AdresseHistorique,
    RecupererHistoriqueAdresseUsecase,
  } from '@/domaines/adresses/recupererHistoriqueAdresse.usecase';
  import { SupprimerHistoriqueAdresseUsecase } from '@/domaines/adresses/supprimerHistoriqueAdresse.usecase';
  import { trackClick } from '@/shell/matomo';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    onAdresseRecenteSelectionnee: (adresse: AdresseHistorique) => void;
    onAdresseResidencePrincipaleSelectionnee: () => void;
    onGeolocalisationSelectionne?: (position: globalThis.GeolocationPosition) => void;
    adressePrincipaleComplete?: boolean;
  }>();

  const MODALE_GEOLOCALISATION_ID = 'erreur-geolocalisation';
  const { ouvrirModale: ouvrirModaleErreurGeoloc } = useDsfrModale(MODALE_GEOLOCALISATION_ID);
  const adressesRecentes = ref<AdresseHistorique[]>([]);
  const historiqueAdresseRepositoryAxios = new HistoriqueAdresseRepositoryAxios();

  onMounted(() => {
    chargerAdressesRecentes();
  });

  const chargerAdressesRecentes = () => {
    const usecase = new RecupererHistoriqueAdresseUsecase(historiqueAdresseRepositoryAxios);
    usecase.execute(utilisateurStore().utilisateur.id, adresses => {
      adressesRecentes.value = adresses;
    });
  };

  const supprimerAdresseRecente = async (idAdresseASupprimer: string) => {
    await new SupprimerHistoriqueAdresseUsecase(historiqueAdresseRepositoryAxios).execute(
      utilisateurStore().utilisateur.id,
      idAdresseASupprimer,
    );

    chargerAdressesRecentes();
  };

  const onGeolocalisationSelectionne = () => {
    if (!navigator.geolocation) {
      ouvrirModaleErreurGeoloc();
      return;
    }

    navigator.geolocation.getCurrentPosition(
      position => {
        props.onGeolocalisationSelectionne?.(position);
      },
      () => {
        ouvrirModaleErreurGeoloc();
      },
    );
  };

  defineExpose({
    chargerAdressesRecentes,
  });
</script>

<style lang="css" scoped>
  .adresses-recentes {
    max-width: 15.5rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
  }
  div:has(button + button) {
    position: relative;
  }

  div > button {
    padding-block-end: var(1rem);
  }

  div > button + button {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
  }

  .btn-suppression {
    background: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    height: 24px;
    margin-top: 0.4rem;
    margin-right: 0.5rem;
  }

  .btn-suppression:hover {
    background: none;
  }
</style>
