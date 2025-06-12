<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel
      :is-loading="pageEstEnChargement"
      :view-model-existe="serviceRecherchePresDeChezNousViewModel !== undefined"
      :message-erreur="serviceErreur"
    >
      <PageServiceTemplate
        v-if="serviceRecherchePresDeChezNousViewModel?.aside"
        :aside="serviceRecherchePresDeChezNousViewModel.aside"
      >
        <h1 class="fr-h2 fr-mb-1w">
          <ServiceSelect
            id="categories"
            :options="serviceRecherchePresDeChezNousViewModel.categories"
            label="Choisir une catégorie"
            @update="modifierType"
            :code-derniere-recherche-type="typeDeRecherche"
          />
          à proximité de chez moi
        </h1>
        <p class="fr-mb-5w">
          Produits locaux, bio, de saisons et vendeurs de vrac, pour une cuisine savoureuse et responsable
        </p>

        <section
          class="fr-my-6w background--white fr-px-2w fr-py-3w flex flex-space-between align-items--center flex-wrap gap--small"
        >
          <h2 class="fr-h4 fr-mb-0" id="recherche-par-adresse-label">Recherche par adresse</h2>
          <form @submit.prevent class="fr-col-12 fr-col-md-7">
            <BarreDeRechercheAdresse
              v-model:recherche="recherche"
              v-model:coordonnees="coordonnees"
              labelId="recherche-par-adresse-label"
            />
          </form>
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
            ref="serviceListeCarte"
            v-if="!cartesSontEnChargement"
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
  import { nextTick, ref } from 'vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import { useRechercheService } from '@/composables/service/useRechercheService';
  import {
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
    ServiceRecherchePresDeChezNousViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceListeCarte = ref<InstanceType<typeof ServiceListeCarte>>();
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();
  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

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
</script>
