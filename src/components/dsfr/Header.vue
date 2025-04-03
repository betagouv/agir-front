<template>
  <LienDEvitement />
  <header id="header-navigation" class="fr-header" role="banner">
    <div class="fr-header__body">
      <div class="fr-container">
        <div class="fr-header__body-row">
          <div class="fr-header__brand fr-enlarge-link">
            <div class="fr-header__brand-top">
              <div class="fr-header__logo">
                <p class="fr-logo">
                  République
                  <br />Française
                </p>
              </div>
              <div class="fr-header__operator">
                <img alt="J'agis" class="fr-responsive-img" src="/logo-jagis-full.svg" />
              </div>
              <div class="fr-header__navbar">
                <button
                  id="button-menu"
                  aria-controls="modal-menu"
                  aria-haspopup="menu"
                  class="fr-btn--menu fr-btn"
                  data-fr-opened="false"
                  title="Menu"
                >
                  Menu
                </button>
              </div>
            </div>
            <div class="fr-header__service">
              <router-link :to="{ name: estConnecte ? RouteCoachName.ACCUEIL_CONNECTEE : RouteCommuneName.ACCUEIL }">
                <p class="fr-header__service-title">J'agis</p>
              </router-link>
            </div>
          </div>
          <div class="fr-header__tools">
            <div class="fr-header__tools-links">
              <ul class="fr-btns-group fr-btns-group--lg">
                <li v-if="!estConnecte">
                  <router-link
                    :to="{ name: RouteCommuneName.AUTHENTIFICATION }"
                    class="fr-btn fr-btn--secondary fr-mr-2w"
                  >
                    Je me connecte
                  </router-link>
                </li>
                <li v-if="!estConnecte">
                  <router-link :to="{ name: RouteCompteName.CREATION_COMPTE }" class="fr-btn fr-btn--primary">
                    Je crée mon compte
                  </router-link>
                </li>
                <li v-if="doitAfficherLeBoutonSeDeconnecter">
                  <button
                    class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-logout-box-r-line fr-btn--lg fr-mr-auto"
                    @click="logout"
                  >
                    Se déconnecter
                  </button>
                </li>
                <li v-if="utilisateurStore().utilisateur.onboardingAEteRealise">
                  <div class="utilisateur">
                    <router-link
                      :to="{ name: RouteCompteName.MON_COMPTE }"
                      class="fr-btn fr-mb-0 fr-text--lg"
                      title="accéder à mon compte"
                    >
                      <span class="fr-icon-user-line fr-icon--md fr-mr-1w" aria-hidden="true"></span>
                      {{ pseudoUtilisateur }}
                    </router-link>
                    <ScoreHeader v-if="utilisateurStore().utilisateur.onboardingAEteRealise" />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div id="modal-menu" aria-labelledby="button-menu" class="fr-header__menu fr-modal">
      <div class="fr-container">
        <button aria-controls="modal-menu" class="fr-btn--close fr-btn" title="Fermer">Fermer</button>
        <div class="fr-header__menu-links"></div>
        <nav id="navigation" aria-label="Menu principal" class="fr-nav" data-fr-js-navigation="true" role="navigation">
          <ul v-if="utilisateurStore().utilisateur.onboardingAEteRealise" class="fr-nav__list">
            <li class="fr-nav__item nav__item--separateur" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="route.name === RouteCoachName.ACCUEIL_CONNECTEE ? 'page' : null"
                :to="{ name: RouteCoachName.ACCUEIL_CONNECTEE }"
                class="fr-nav__link"
              >
                Accueil
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="
                  route.name === RouteThematiquesName.THEMATIQUE &&
                  route.params.id === MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url
                    ? 'page'
                    : null
                "
                :to="{
                  name: RouteThematiquesName.THEMATIQUE,
                  params: { id: MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).url },
                }"
                class="fr-nav__link"
              >
                <div>
                  <span aria-hidden="true" class="fr-mr-1v">{{
                    MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).emoji
                  }}</span>
                  {{ MenuThematiques.getThematiqueData(ClefThematiqueAPI.alimentation).labelDansLeMenu }}
                </div>
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="
                  route.name === RouteThematiquesName.THEMATIQUE &&
                  route.params.id === MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement).url
                    ? 'page'
                    : null
                "
                :to="{
                  name: RouteThematiquesName.THEMATIQUE,
                  params: { id: MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement).url },
                }"
                class="fr-nav__link"
              >
                <div>
                  <span aria-hidden="true" class="fr-mr-1v">{{
                    MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement).emoji
                  }}</span>
                  {{ MenuThematiques.getThematiqueData(ClefThematiqueAPI.logement).labelDansLeMenu }}
                </div>
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="
                  route.name === RouteThematiquesName.THEMATIQUE &&
                  route.params.id === MenuThematiques.getThematiqueData(ClefThematiqueAPI.transports).url
                    ? 'page'
                    : null
                "
                :to="{
                  name: RouteThematiquesName.THEMATIQUE,
                  params: { id: MenuThematiques.getThematiqueData(ClefThematiqueAPI.transports).url },
                }"
                class="fr-nav__link"
              >
                <div>
                  <span aria-hidden="true" class="fr-mr-1v">{{
                    MenuThematiques.getThematiqueData(ClefThematiqueAPI.transports).emoji
                  }}</span>
                  {{ MenuThematiques.getThematiqueData(ClefThematiqueAPI.transports).labelDansLeMenu }}
                </div>
              </router-link>
            </li>
            <li class="fr-nav__item nav__item--separateur" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="
                  route.name === RouteThematiquesName.THEMATIQUE &&
                  route.params.id === MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url
                    ? 'page'
                    : null
                "
                :to="{
                  name: RouteThematiquesName.THEMATIQUE,
                  params: { id: MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).url },
                }"
                class="fr-nav__link"
              >
                <div>
                  <span aria-hidden="true" class="fr-mr-1v">{{
                    MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).emoji
                  }}</span>
                  {{ MenuThematiques.getThematiqueData(ClefThematiqueAPI.consommation).labelDansLeMenu }}
                </div>
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="route.name === RouteAidesName.AIDES ? 'page' : null"
                :to="{ name: RouteAidesName.AIDES }"
                class="fr-nav__link"
              >
                Aides
              </router-link>
            </li>

            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="route.name === RouteActionsName.CATALOGUE_ACTION ? 'page' : null"
                :to="{ name: RouteActionsName.CATALOGUE_ACTION }"
                class="fr-nav__link"
              >
                Actions
              </router-link>
            </li>

            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="route.name === RouteBilanCarboneName.BILAN_CARBONE ? 'page' : null"
                :to="{ name: RouteBilanCarboneName.BILAN_CARBONE }"
                class="fr-nav__link"
              >
                Bilan
              </router-link>
            </li>
            <li class="fr-nav__item" data-fr-js-navigation-item="true">
              <router-link
                :aria-current="route.name === RouteCoachName.BIBLIOTHEQUE ? 'page' : null"
                :to="{ name: RouteCoachName.BIBLIOTHEQUE }"
                class="fr-nav__link"
              >
                Bibliothèque
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/header/header.min.css';
  import '@gouvfr/dsfr/dist/component/navigation/navigation.min.css';
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import router, { RouteCommuneName } from '@/router';
  import { utilisateurStore } from '@/store/utilisateur';
  import ScoreHeader from '@/components/custom/ScoreHeader.vue';
  import LienDEvitement from '@/components/dsfr/LienDEvitement.vue';
  import { RouteBilanCarboneName } from '@/router/bilanCarbone/routes';
  import { RouteCoachName } from '@/router/coach/routeCoachName';
  import { RouteCompteName } from '@/router/compte/routeCompteName';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { DeconnecterUtilisateurUsecase } from '@/domaines/authentification/deconnecterUtilisateur.usecase';
  import { UtilisateurRepositoryAxios } from '@/domaines/authentification/adapters/utilisateur.repository.axios';
  import { SessionRepositoryStore } from '@/domaines/authentification/adapters/session.repository.store';
  import { RouteAidesName } from '@/router/aides/routeAidesName';
  import { RouteActionsName } from '@/router/actions/routes';

  const route = useRoute();
  const store = utilisateurStore();

  const pseudoUtilisateur = computed(() => store.utilisateur.pseudo);
  const estConnecte = computed(() => store.utilisateur.id.length > 0);
  const doitAfficherLeBoutonSeDeconnecter = computed(
    () => estConnecte.value && !store.utilisateur.onboardingAEteRealise,
  );

  const seDeconnecterUsecase = new DeconnecterUtilisateurUsecase(
    new UtilisateurRepositoryAxios(),
    new SessionRepositoryStore(),
  );

  const logout = async () => {
    const utilisateurId = utilisateurStore().utilisateur.id;
    await seDeconnecterUsecase.execute(utilisateurId, url => router.push({ path: url }));
  };
</script>

<style scoped>
  .utilisateur {
    display: flex;
    align-items: center;
    gap: 1rem;
    flex: 1 0 0;
  }

  .utilisateur a {
    max-width: 100% !important;
  }

  .fr-header__service {
    box-shadow: none;
    width: auto;
  }

  .fr-responsive-img {
    height: 4rem;
  }

  .fr-header__tools-links .fr-btn--primary {
    background-color: var(--blue-france-sun-113-625);
    color: white;
  }

  .fr-header__tools-links .fr-btn--primary:hover {
    background-color: var(--blue-france-sun-113-625-hover);
  }

  @media (min-width: 62em) {
    .fr-header__body-row {
      padding: 1rem 0;
    }

    .nav__item--separateur {
      position: relative;
      padding-right: 1rem;
      margin-right: 1rem;
    }

    .nav__item--separateur::after {
      --hauteur-separateur: 1.25rem;

      content: '';
      position: absolute;
      right: 0;
      height: var(--hauteur-separateur);
      width: 1px;
      background-color: #dbcdbd;
      top: calc(50% - var(--hauteur-separateur) / 2);
    }
  }
</style>
