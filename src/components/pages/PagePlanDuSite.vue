<template>
  <div class="fr-container fr-py-6w">
    <h1>Plan du site</h1>
    <ul v-if="!estConnecte">
      <li><router-link :to="{ name: RouteCommuneName.ACCUEIL }">Accueil</router-link></li>
      <li><router-link :to="{ name: RouteCommuneName.AUTHENTIFICATION }">Authentification</router-link></li>
      <li><router-link :to="{ name: RouteConformiteName.MENTIONS_LEGALES }">Mention légales</router-link></li>
      <li><router-link :to="{ name: RouteConformiteName.ACCESSIBILITE }">Accessibilité</router-link></li>
      <li><router-link :to="{ name: RouteConformiteName.CGU }">Conditions générales d'utilisation</router-link></li>
      <li>
        <router-link :to="{ name: RouteConformiteName.POLITIQUE_DE_CONFIDENTIALITE }">
          Politique de confidentialité
        </router-link>
      </li>
      <li><router-link :to="{ name: RouteConformiteName.STATISTIQUES }">Statistiques</router-link></li>
    </ul>
    <div v-else>
      <h2 class="fr-h2">Navigation</h2>
      <ul class="fr-mb-3w">
        <li><router-link :to="{ name: RouteCoachName.ACCUEIL_CONNECTEE }">Tableau de bord</router-link></li>
        <li><router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION }">Catalogue des actions</router-link></li>
        <li><router-link :to="{ name: RouteAidesName.AIDES }">Mes aides</router-link></li>
        <li><router-link :to="{ name: RouteCoachName.BIBLIOTHEQUE }">Ma bibliothèque</router-link></li>
        <li>
          <router-link :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }">Mon empreinte écologique</router-link>
        </li>
        <li><router-link :to="{ name: RouteClassementName.CLASSEMENT }">Classement</router-link></li>
      </ul>

      <h2 class="fr-h2">Thématiques</h2>
      <ul class="fr-mb-3w">
        <li>
          <router-link :to="{ name: RouteThematiquesName.THEMATIQUE, params: { id: alimentation.url } }">
            Me nourrir
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: RouteThematiquesName.THEMATIQUE, params: { id: logement.url } }">
            Me loger
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: RouteThematiquesName.THEMATIQUE, params: { id: transport.url } }">
            Me déplacer
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: RouteThematiquesName.THEMATIQUE, params: { id: consommation.url } }">
            Consommer
          </router-link>
        </li>
      </ul>

      <h2 class="fr-h2">Les services</h2>
      <ul class="fr-mb-3w">
        <li>
          <router-link
            :to="{ name: RouteServiceName.PROXIMITE, params: { thematiqueId: ClefThematiqueAPI.consommation } }"
            >Près de chez nous</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: RouteServiceName.LONGUE_VIE_AUX_OBJETS,
              params: { thematiqueId: ClefThematiqueAPI.consommation },
            }"
            >Longue vie aux objets</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: RouteServiceName.FRUITS_ET_LEGUMES, params: { thematiqueId: ClefThematiqueAPI.alimentation } }"
            >Fruits et légumes</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: RouteServiceName.RECETTES, params: { thematiqueId: ClefThematiqueAPI.alimentation } }"
            >Les recettes</router-link
          >
        </li>
        <li>
          <router-link
            :to="{
              name: RouteAidesName.VELO,
            }"
            >Les aides velo</router-link
          >
        </li>
      </ul>

      <h2 class="fr-h2">Mon profil</h2>
      <ul class="fr-mb-3w">
        <li><router-link :to="{ name: RouteCompteName.MON_COMPTE }">Mes informations</router-link></li>
        <li><router-link :to="{ name: RouteCompteName.LOGEMENT }">Mon logement</router-link></li>
        <li><router-link :to="{ name: RouteCompteName.MES_REPONSES }">Mieux vous connaître</router-link></li>
      </ul>

      <h2 class="fr-h2">Informations</h2>
      <ul>
        <li><router-link :to="{ name: RouteConformiteName.MENTIONS_LEGALES }">Mention légales</router-link></li>
        <li><router-link :to="{ name: RouteConformiteName.ACCESSIBILITE }">Accessibilité</router-link></li>
        <li><router-link :to="{ name: RouteConformiteName.CGU }">Conditions générales d'utilisation</router-link></li>
        <li>
          <router-link :to="{ name: RouteConformiteName.POLITIQUE_DE_CONFIDENTIALITE }">
            Politique de confidentialité
          </router-link>
        </li>
        <li><router-link :to="{ name: RouteConformiteName.STATISTIQUES }">Statistiques</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { RouteCommuneName } from '@/router';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';
  import { RouteClassementName } from '@/router/classement/routes';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { RouteConformiteName } from '@/router/conformite/routes';
  import { RouteServiceName } from '@/router/services/routes';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const estConnecte = utilisateurStore().utilisateur.id.length > 0;

  const alimentation = MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation);
  const transport = MenuThematiques.getThematiqueData(ClefThematiqueAPI.transports);
  const consommation = MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation);
  const logement = MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement);
</script>
