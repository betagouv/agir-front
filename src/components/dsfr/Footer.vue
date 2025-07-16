<template>
  <footer id="footer" class="fr-footer" role="contentinfo">
    <div class="fr-container">
      <div class="fr-footer__body">
        <div class="fr-footer__brand fr-enlarge-link">
          <p class="fr-logo">
            République
            <br />Française
          </p>
          <router-link :to="{ name: RouteCommuneName.ACCUEIL }" title="Retour à l'accueil du site - J'agis">
            <img alt="J'agis" class="logo-jagis" src="/logo-jagis-full.svg" />
          </router-link>
        </div>
        <div class="fr-footer__content">
          <p class="fr-footer__content-desc">
            L'application <i>J’agis</i> est un service proposé par le Secrétariat Général à la Planification Ecologique,
            le Ministère de la Transition écologique, de la Biodiversité, de la Forêt, de la Mer et de la Pêche, et
            l'ADEME. Vous avez une question, une suggestion, un retour à nous faire&nbsp;? Écrivez-nous à
            <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a>
          </p>
          <ul class="fr-footer__content-list">
            <li class="fr-footer__content-item">
              <a
                id="footer__content-link-7654"
                class="fr-footer__content-link"
                href="https://info.gouv.fr"
                rel="noopener external"
                target="_blank"
                title="info.gouv.fr - nouvelle fenêtre"
              >
                info.gouv.fr
              </a>
            </li>
            <li class="fr-footer__content-item">
              <a
                id="footer__content-link-7655"
                class="fr-footer__content-link"
                href="https://service-public.fr"
                rel="noopener external"
                target="_blank"
                title="service-public.fr - nouvelle fenêtre"
              >
                service-public.fr
              </a>
            </li>
            <li class="fr-footer__content-item">
              <a
                id="footer__content-link-7656"
                class="fr-footer__content-link"
                href="https://legifrance.gouv.fr"
                rel="noopener external"
                target="_blank"
                title="legifrance.gouv.fr - nouvelle fenêtre"
              >
                legifrance.gouv.fr
              </a>
            </li>
            <li class="fr-footer__content-item">
              <a
                id="footer__content-link-7657"
                class="fr-footer__content-link"
                href="https://data.gouv.fr"
                rel="noopener external"
                target="_blank"
                title="data.gouv.fr - nouvelle fenêtre"
              >
                data.gouv.fr
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div class="fr-footer__partners">
        <p class="fr-footer__partners-title">Nos partenaires</p>
        <div class="fr-footer__partners-logos">
          <div class="fr-footer__partners-main">
            <ul class="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
              <li class="fr-col">
                <img alt="DINUM : Direction interministérielle du numérique" height="80" src="/logo-dinum.webp" />
              </li>
              <li class="fr-col">
                <img alt="ADEME: Agence de la transition écologique " height="80" src="/logo-ademe.svg" />
              </li>
              <li class="fr-col">
                <img alt="France Nation Verte" height="80" src="/logo_fnv.webp" />
              </li>
              <li class="fr-col">
                <img alt="Office Français de la Biodiversité" height="80" src="/ic_ofb.svg" />
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="fr-footer__bottom">
        <ul class="fr-footer__bottom-list">
          <!-- <li class="fr-footer__bottom-item">
            <a class="fr-footer__bottom-link" href="#">Plan du site</a>
          </li> -->
          <li class="fr-footer__bottom-item">
            <router-link :to="{ name: RouteConformiteName.ACCESSIBILITE }" class="fr-footer__bottom-link fr-pt-1w"
              >Accessibilité : non-conforme
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link :to="{ name: RouteConformiteName.MENTIONS_LEGALES }" class="fr-footer__bottom-link fr-pt-1w"
              >Mentions légales
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link :to="{ name: RouteConformiteName.CGU }" class="fr-footer__bottom-link fr-pt-1w"
              >Conditions générales d'utilisation
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link
              :to="{ name: RouteConformiteName.POLITIQUE_DE_CONFIDENTIALITE }"
              class="fr-footer__bottom-link fr-pt-1w"
            >
              Politique de confidentialité
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link :to="{ name: RouteConformiteName.STATISTIQUES }" class="fr-footer__bottom-link fr-pt-1w">
              Statistiques
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link :to="{ name: RouteConformiteName.PLAN_DU_SITE }" class="fr-footer__bottom-link fr-pt-1w">
              Plan du site
            </router-link>
          </li>
        </ul>
        <div class="fr-footer__bottom-copy">
          <p>
            Sauf mention explicite de propriété intellectuelle détenue par des tiers, les contenus de ce site sont
            proposés sous
            <a href="https://github.com/etalab/licence-ouverte/blob/master/LO.md" target="_blank">licence etalab-2.0</a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
  import '@gouvfr/dsfr/dist/component/footer/footer.min.css';
  import { RouteCommuneName } from '@/router';
  import { RouteConformiteName } from '@/router/conformite/routes';
</script>

<style scoped>
  .logo-jagis {
    height: 4rem;
    margin-left: 4rem;
  }
</style>
