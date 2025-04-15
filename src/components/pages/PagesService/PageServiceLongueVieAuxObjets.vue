<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel
      :is-loading="pageEstEnChargement"
      :view-model-existe="serviceRechercheLongueVieAuxObjetsViewModel !== undefined"
      :message-erreur="serviceErreur"
    >
      <PageServiceTemplate
        v-if="serviceRechercheLongueVieAuxObjetsViewModel?.aside"
        :aside="serviceRechercheLongueVieAuxObjetsViewModel.aside"
      >
        <h1 class="fr-h2 fr-mb-1w">
          <ServiceSelect
            v-if="serviceRechercheLongueVieAuxObjetsViewModel?.categories"
            id="categories"
            :options="serviceRechercheLongueVieAuxObjetsViewModel.categories"
            label="Choisir une catégorie"
            @update="updateType"
          />
          à proximité de chez moi
        </h1>
        <p>Redonnez vie à vos objets et trouvez les nouveaux en seconde main</p>

        <section
          class="fr-my-6w background--white fr-px-2w fr-py-3w flex flex-space-between align-items--center flex-wrap gap--small"
        >
          <h2 class="fr-h4 fr-mb-0" id="recherche-par-adresse-label">Recherche par adresse</h2>
          <ServiceBarreDeRechercheAdresse
            v-model="coordonnees"
            class="fr-col-12 fr-col-md-7"
            labelId="recherche-par-adresse-label"
          />
        </section>
        <section
          v-if="
            serviceRechercheLongueVieAuxObjetsViewModel &&
            (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats)
              .favoris
          "
        >
          <ServiceFavoris
            :services-recherche-favoris-view-model="
              (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats)
                .favoris!
            "
            titre="Mes lieux favoris"
          />
        </section>
        <section v-if="serviceRechercheLongueVieAuxObjetsViewModel.aucunResultat" class="text--center">
          <img alt="" height="250" src="/service_aucun_resultat.svg" />
          <p class="fr-text--lg">
            <span aria-hidden="true">😢 </span>Aucun résultat n’est encore disponible pour votre localisation
          </p>
        </section>
        <section v-else>
          <h2 class="fr-h3">Suggestions</h2>
          <ServiceListeCarte
            :suggestions-service-view-model="
              (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats)
                .suggestions
            "
          />
          <ServiceSkeletonCartes v-if="cartesSontEnChargement" />
          <button
            v-if="
              (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats)
                .plusDeResultatsDisponibles
            "
            class="fr-link text--underline"
            @click="chargerPlusDeResultats()"
          >
            Voir plus de résultats
          </button>
        </section>
      </PageServiceTemplate>
    </ServiceSkeletonConditionnel>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import { useRechercheLieuService } from '@/composables/useRechercheLieuService';
  import {
    ServiceRechercheLongueVieAuxObjetsPresenterImpl,
    ServiceRechercheLongueVieAuxObjetsViewModel,
    ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import { RecupererServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const coordonnees = ref<{ latitude: number; longitude: number }>();
  const serviceRechercheLongueVieAuxObjetsViewModel = ref<ServiceRechercheLongueVieAuxObjetsViewModel>();
  const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(new ServiceRechercheLongueVieAuxObjetsAxios());

  const serviceErreur = ref<string | null>(null);
  const typeDeRecherche = ref<string>('vos_objets');

  const {
    chargerPlusDeResultats,
    resetNombreDeResultats,
    lancerLaRecherche,
    pageEstEnChargement,
    cartesSontEnChargement,
  } = useRechercheLieuService(lancerLeUseCase, coordonnees);

  async function lancerLeUseCase(limit: number): Promise<void> {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecherche.value,
      limit,
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => {
          serviceRechercheLongueVieAuxObjetsViewModel.value = vm;
        },
        error => (serviceErreur.value = error),
      ),
      coordonnees.value,
    );
  }

  const updateType = (type: string) => {
    resetNombreDeResultats();
    typeDeRecherche.value = type;
    lancerLaRecherche();
  };
</script>
