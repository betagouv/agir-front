<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel
      :is-loading="pageEstEnChargement"
      :message-erreur="serviceErreur"
      :view-model-existe="viewModel !== undefined"
    >
      <PageServiceTemplate v-if="viewModel?.aside" :aside="viewModel.aside">
        <h1 class="fr-h2 fr-mb-1w">
          <ServiceSelect
            v-if="viewModel?.categories"
            id="categories"
            :code-derniere-recherche-type="typeDeRecherche"
            :options="viewModel.categories"
            label="Choisir une catégorie"
            @update="modifierType"
          />
          à proximité de chez moi
        </h1>
        <p>Redonnez vie à vos objets et trouvez les nouveaux en seconde main</p>

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
            class="fr-mt-3w full-width"
            texte="Voulez-vous utiliser cette adresse comme votre adresse principale à l’avenir&nbsp;?"
          />
        </section>
        <section v-if="viewModel && (viewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats).favoris">
          <ServiceFavoris
            :services-recherche-favoris-view-model="
              (viewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats).favoris!
            "
            titre="Mes lieux favoris"
          />
        </section>
        <section v-if="viewModel.aucunResultat" class="text--center">
          <img alt="" height="250" src="/service_aucun_resultat.svg" />
          <p class="fr-text--lg">
            <span aria-hidden="true">😢 </span>Aucun résultat n’est encore disponible pour votre localisation
          </p>
        </section>
        <section v-else>
          <h2 class="fr-h3">Suggestions</h2>
          <ServiceListeCarte
            ref="serviceListeCarte"
            :suggestions-service-view-model="
              (viewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats).suggestions
            "
          />
          <ServiceSkeletonCartes v-if="cartesSontEnChargement" />
          <button
            v-if="(viewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats).plusDeResultatsDisponibles"
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
  import { useRouter } from 'vue-router';
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
    ServiceRechercheLongueVieAuxObjetsPresenterImpl,
    ServiceRechercheLongueVieAuxObjetsViewModel,
    ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import { RecupererServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
  import { AdresseBarreDeRecherche } from '@/shell/coordonneesType';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceListeCarte = ref<InstanceType<typeof ServiceListeCarte>>();
  const viewModel = ref<ServiceRechercheLongueVieAuxObjetsViewModel>();
  const recupererServiceLongueVieAuxObjetsUsecase = new RecupererServiceLongueVieAuxObjetsUsecase(
    new ServiceRechercheLongueVieAuxObjetsAxios(),
  );
  const adresse = ref<AdresseBarreDeRecherche>();
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
  } = useRechercheService(lancerRecherche, 'vos_objets');

  async function chargerPlusDeCartesEtFocus() {
    const ancienNombreDeResultats = nombreDeResultats.value;
    await chargerPlusDeCartes();

    await nextTick(() => {
      if (serviceListeCarte.value) {
        serviceListeCarte.value.focusCarteParIndex(ancienNombreDeResultats);
      }
    });
  }

  async function lancerRecherche(): Promise<void> {
    await recupererServiceLongueVieAuxObjetsUsecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecherche.value,
      nombreDeResultats.value,
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => {
          viewModel.value = vm;
        },
        error => (serviceErreur.value = error),
      ),
      coordonnees.value,
    );
  }

  function definirAdressePrincipale() {
    definirAdressePrincipaleComposable(utilisateurStore().utilisateur.id, adresse.value, coordonnees.value);
  }

  async function chargerDonneesPourNouvelleAdresse() {
    await nextTick();
    avecAdressePrivee.value = true;
  }

  onMounted(async () => {
    const query = useRouter().currentRoute.value.query;
    const latitude = query.latitude as string;
    const longitude = query.longitude as string;

    if (latitude && longitude) {
      coordonnees.value = { latitude: parseFloat(latitude), longitude: parseFloat(longitude) };
    } else {
      await recupererAdressePourBarreDeRecherche(
        utilisateurStore().utilisateur.id,
        async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
          coordonnees.value = barreDeRechercheViewModel.coordonnees;
          recherche.value = barreDeRechercheViewModel.recherche;
        },
      );
    }
  });
</script>
