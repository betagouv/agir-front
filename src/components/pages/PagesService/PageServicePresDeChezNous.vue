<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel
      :is-loading="pageEstEnChargement"
      :message-erreur="serviceErreur"
      :view-model-existe="serviceRecherchePresDeChezNousViewModel !== undefined"
    >
      <PageServiceTemplate
        v-if="serviceRecherchePresDeChezNousViewModel?.aside"
        :aside="serviceRecherchePresDeChezNousViewModel.aside"
      >
        <h1 class="fr-h2 fr-mb-1w">
          <ServiceSelect
            id="categories"
            :code-derniere-recherche-type="typeDeRecherche"
            :options="serviceRecherchePresDeChezNousViewModel.categories"
            label="Choisir une catégorie"
            @update="modifierType"
          />
          à proximité de chez moi
        </h1>
        <p class="fr-mb-5w">
          Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable
        </p>

        <section
          class="fr-my-6w background--white fr-px-2w fr-py-3w flex flex-space-between align-items--center flex-wrap gap--small"
        >
          <h2 id="recherche-par-adresse-label" class="fr-h4 fr-mb-0">Recherche par adresse</h2>
          <form class="fr-col-12 fr-col-md-7" @submit.prevent>
            <BarreDeRechercheAdresse
              v-model:adresse="adresse"
              v-model:coordonnees="coordonnees"
              v-model:recherche="recherche"
              labelId="recherche-par-adresse-label"
              @update:coordonnees="chargerDonneesPourNouvelleAdresse"
            />
          </form>
          <Callout
            v-if="avecAdressePrivee"
            :button="{
              text: 'Choisir comme adresse principale',
              onClick: definirAdressePrincipale,
            }"
            :icone-information="false"
            class="fr-mt-3w"
            texte="Voulez-vous utiliser cette adresse comme votre adresse principale à l'avenir&nbsp;?"
          />
        </section>
        <section
          v-if="
            (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats).favoris
          "
        >
          <ServiceFavoris
            :services-recherche-favoris-view-model="
              (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats).favoris!
            "
            titre="Mes lieux favoris"
          />
        </section>

        <section v-if="serviceRecherchePresDeChezNousViewModel.aucunResultat" class="text--center">
          <img alt="" height="250" src="/service_aucun_resultat.svg" />
          <p class="fr-text--lg">
            <span aria-hidden="true">😢 </span>Aucun résultat n’est encore disponible pour votre localisation
          </p>
        </section>

        <section v-else>
          <h2 class="fr-h3">Suggestions</h2>
          <ServiceListeCarte
            v-if="!cartesSontEnChargement"
            ref="serviceListeCarte"
            :suggestions-service-view-model="
              (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                .suggestions
            "
          />
          <ServiceSkeletonCartes v-if="cartesSontEnChargement" />
          <button
            v-if="
              (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                .plusDeResultatsDisponibles
            "
            class="fr-link text--underline"
            @click="chargerPlusDeCartesEtFocus()"
          >
            Voir plus de résultats
          </button>
        </section>
      </PageServiceTemplate>
    </ServiceSkeletonConditionnel>
  </div>
</template>

<script lang="ts" setup>
  import { nextTick, onMounted, ref } from 'vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import Callout from '@/components/dsfr/Callout.vue';
  import { useRechercheService } from '@/composables/service/useRechercheService';
  import { useAdressePrincipale } from '@/composables/useAdressePrincipale';
  import { BarreDeRechercheViewModel } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import {
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
    ServiceRecherchePresDeChezNousViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
  import { AdresseBarreDeRecherche } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceListeCarte = ref<InstanceType<typeof ServiceListeCarte>>();
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();
  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());
  const adresse = ref<AdresseBarreDeRecherche>();
  const utilisateurId = utilisateurStore().utilisateur.id;
  const {
    avecAdressePrivee,
    definirAdressePrincipale: definirAdressePrincipaleComposable,
    recupererAdressePourBarreDeRecherche,
  } = useAdressePrincipale();

  const {
    recherche,
    typeDeRecherche,
    coordonnees,
    nombreDeResultats,
    chargerPlusDeCartes,
    modifierType,
    serviceErreur,
    pageEstEnChargement,
    cartesSontEnChargement,
  } = useRechercheService(lancerRecherche, 'nourriture');

  async function chargerPlusDeCartesEtFocus() {
    const ancienNombreDeResultats = nombreDeResultats.value;
    await chargerPlusDeCartes();

    await nextTick(() => {
      if (serviceListeCarte.value) {
        serviceListeCarte.value.focusCarteParIndex(ancienNombreDeResultats);
      }
    });
  }

  async function lancerRecherche() {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecherche.value,
      nombreDeResultats.value,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => (serviceRecherchePresDeChezNousViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
      coordonnees.value,
    );
  }

  function definirAdressePrincipale() {
    definirAdressePrincipaleComposable(utilisateurId, adresse.value, coordonnees.value);
  }

  async function chargerDonneesPourNouvelleAdresse() {
    await nextTick();
    avecAdressePrivee.value = true;
  }

  onMounted(async () => {
    await recupererAdressePourBarreDeRecherche(
      utilisateurId,
      async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
        coordonnees.value = barreDeRechercheViewModel.coordonnees;
        recherche.value = barreDeRechercheViewModel.recherche;
      },
    );
  });
</script>
