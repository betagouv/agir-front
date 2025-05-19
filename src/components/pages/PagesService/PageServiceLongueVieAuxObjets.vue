<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel
      :is-loading="pageEstEnChargement"
      :view-model-existe="viewModel !== undefined"
      :message-erreur="serviceErreur"
    >
      <PageServiceTemplate v-if="viewModel?.aside" :aside="viewModel.aside">
        <h1 class="fr-h2 fr-mb-1w">
          <ServiceSelect
            v-if="viewModel?.categories"
            id="categories"
            :options="viewModel.categories"
            label="Choisir une catégorie"
            @update="modifierType"
            :code-derniere-recherche-type="typeDeRecherche"
          />
          à proximité de chez moi
        </h1>
        <p>Redonnez vie à vos objets et trouvez les nouveaux en seconde main</p>

        <section
          class="fr-my-6w background--white fr-px-2w fr-py-3w flex flex-space-between align-items--center flex-wrap gap--small"
        >
          <h2 class="fr-h4 fr-mb-0" id="recherche-par-adresse-label">Recherche par adresse</h2>
          <ServiceBarreDeRechercheAdresse
            v-model:recherche="recherche"
            v-model:coordonnees="coordonnees"
            class="fr-col-12 fr-col-md-7"
            labelId="recherche-par-adresse-label"
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
  import { nextTick, ref } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import { useRechercheService } from '@/composables/service/useRechercheService';
  import {
    ServiceRechercheLongueVieAuxObjetsPresenterImpl,
    ServiceRechercheLongueVieAuxObjetsViewModel,
    ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import { RecupererServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const serviceListeCarte = ref<InstanceType<typeof ServiceListeCarte>>();
  const viewModel = ref<ServiceRechercheLongueVieAuxObjetsViewModel>();
  const recupererServiceLongueVieAuxObjetsUsecase = new RecupererServiceLongueVieAuxObjetsUsecase(
    new ServiceRechercheLongueVieAuxObjetsAxios(),
  );

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
</script>
