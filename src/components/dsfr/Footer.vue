<template>
  <footer class="fr-footer" role="contentinfo" id="footer">
    <div class="fr-container">
      <div class="fr-footer__body">
        <div class="fr-footer__brand fr-enlarge-link">
          <p class="fr-logo">
            République
            <br />Française
          </p>
          <router-link title="Retour à l'accueil du site - J'agis" :to="{ name: RouteCommuneName.ACCUEIL }">
            <img class="logo-jagis" src="/logo-jagis-full.svg" alt="J'agis" />
          </router-link>
        </div>
        <div class="fr-footer__content">
          <p class="fr-footer__content-desc">
            L'application <i>J’agis</i> est un service proposé par le Secrétariat Général à la Planification Ecologique.
            Vous avez une question, une suggestion, un retour à nous faire ? Écrivez-nous à
            <a href="mailto:contact@jagis.beta.gouv.fr">contact@jagis.beta.gouv.fr</a>
          </p>
          <ul class="fr-footer__content-list">
            <li class="fr-footer__content-item">
              <a
                target="_blank"
                rel="noopener external"
                title="info.gouv.fr - nouvelle fenêtre"
                id="footer__content-link-7654"
                class="fr-footer__content-link"
                href="https://info.gouv.fr"
              >
                info.gouv.fr
              </a>
            </li>
            <li class="fr-footer__content-item">
              <a
                target="_blank"
                rel="noopener external"
                title="service-public.fr - nouvelle fenêtre"
                id="footer__content-link-7655"
                class="fr-footer__content-link"
                href="https://service-public.fr"
              >
                service-public.fr
              </a>
            </li>
            <li class="fr-footer__content-item">
              <a
                target="_blank"
                rel="noopener external"
                title="legifrance.gouv.fr - nouvelle fenêtre"
                id="footer__content-link-7656"
                class="fr-footer__content-link"
                href="https://legifrance.gouv.fr"
              >
                legifrance.gouv.fr
              </a>
            </li>
            <li class="fr-footer__content-item">
              <a
                target="_blank"
                rel="noopener external"
                title="data.gouv.fr - nouvelle fenêtre"
                id="footer__content-link-7657"
                class="fr-footer__content-link"
                href="https://data.gouv.fr"
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
                <img src="/logo-dinum.webp" alt="DINUM : Direction interministérielle du numérique" height="80px" />
              </li>
              <li class="fr-col">
                <img src="/logo-ademe.svg" alt="ADEME: Agence de la transition écologique " height="80px" />
              </li>
              <li class="fr-col">
                <img src="/logo_fnv.webp" alt="France Nation Verte" height="80px" />
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
            <router-link class="fr-footer__bottom-link fr-pt-1w" :to="{ name: RouteConformiteName.ACCESSIBILITE }"
              >Accessibilité : non-conforme
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link class="fr-footer__bottom-link fr-pt-1w" :to="{ name: RouteConformiteName.MENTIONS_LEGALES }"
              >Mentions légales
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link class="fr-footer__bottom-link fr-pt-1w" :to="{ name: RouteConformiteName.CGU }"
              >Conditions générales d'utilisation
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link
              class="fr-footer__bottom-link fr-pt-1w"
              :to="{ name: RouteConformiteName.POLITIQUE_DE_CONFIDENTIALITE }"
            >
              Politique de confidentialité
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link class="fr-footer__bottom-link fr-pt-1w" :to="{ name: RouteConformiteName.STATISTIQUES }">
              Statistiques
            </router-link>
          </li>
          <li class="fr-footer__bottom-item">
            <router-link class="fr-footer__bottom-link fr-pt-1w" :to="{ name: RouteConformiteName.PLAN_DU_SITE }">
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

<script setup lang="ts">
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
