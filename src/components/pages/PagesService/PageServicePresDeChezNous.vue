<template>
  <div class="fr-container">
    <ServiceSkeletonConditionnel
      :is-loading="isLoading"
      :view-model-existe="serviceRecherchePresDeChezNousViewModel !== undefined"
      :message-erreur="serviceErreur"
    >
      <PageServiceTemplate
        v-if="serviceRecherchePresDeChezNousViewModel?.aside"
        :aside="serviceRecherchePresDeChezNousViewModel.aside"
      >
        <div v-if="serviceRecherchePresDeChezNousViewModel.aucunResultat" class="text--center">
          <img alt="" height="250" src="/service_aucun_resultat.svg" />
          <p class="fr-text--lg"><span aria-hidden="true">😢 </span>Aucun résultat n’est encore disponible pour votre localisation</p>
        </div>
        <div v-else>
          <h1 class="fr-h2 fr-mb-1w">
            <ServiceSelect
              id="categories"
              :options="serviceRecherchePresDeChezNousViewModel.categories"
              label="Choisir une catégorie"
              @update="updateType"
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
            <ServiceBarreDeRechercheAdresse
              v-model="coordonnees"
              class="fr-col-12 fr-col-md-7"
              labelId="recherche-par-adresse-label"
            />
          </section>
          <section v-if="serviceRecherchePresDeChezNousViewModel.favoris">
            <ServiceFavoris
              :services-recherche-favoris-view-model="serviceRecherchePresDeChezNousViewModel.favoris"
              titre="Mes lieux favoris"
            />
          </section>
          <section>
            <h2 class="fr-h3">Suggestions</h2>
            <ServiceListeCarte
              :suggestions-service-view-model="
                (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                  .suggestions
              "
            />
            <button
              v-if="
                (serviceRecherchePresDeChezNousViewModel as ServiceRecherchePresDeChezNousViewModelAvecResultats)
                  .plusDeResultatsDisponibles
              "
              class="fr-link text--underline"
              @click="chargerPlusDeResultats()"
            >
              Voir plus de résultats
            </button>
          </section>
        </div>
      </PageServiceTemplate>
    </ServiceSkeletonConditionnel>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref, watch } from 'vue';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import {
    ServiceRecherchePresDeChezNousPresenterImpl,
    ServiceRecherchePresDeChezNousViewModel,
    ServiceRecherchePresDeChezNousViewModelAvecResultats,
  } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.presenter.impl';
  import { ServiceRecherchePresDeChezNousAxios } from '@/domaines/serviceRecherche/presDeChezNous/adapters/serviceRecherchePresDeChezNous.repository.axios';
  import { RecupererServicePresDeChezNousUsecase } from '@/domaines/serviceRecherche/presDeChezNous/recupererServicePresDeChezNous.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const coordonnees = ref<{ latitude: number; longitude: number }>();
  const serviceRecherchePresDeChezNousViewModel = ref<ServiceRecherchePresDeChezNousViewModel>();

  const usecase = new RecupererServicePresDeChezNousUsecase(new ServiceRecherchePresDeChezNousAxios());

  const serviceErreur = ref<string | null>(null);
  let nombreMaxResultats = 9;
  const typeDeRecherche = ref<string>('');

  watch(coordonnees, () => {
    nombreMaxResultats = 9;
    lancerRecherche();
  });

  async function lancerRecherche() {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecherche.value,
      nombreMaxResultats,
      new ServiceRecherchePresDeChezNousPresenterImpl(
        vm => (serviceRecherchePresDeChezNousViewModel.value = vm),
        error => (serviceErreur.value = error),
      ),
      coordonnees.value,
    );

    isLoading.value = false;
  }

  onMounted(async () => {
    await lancerRecherche();
  });

  const chargerPlusDeResultats = () => {
    nombreMaxResultats += 9;
    lancerRecherche();
  };

  const updateType = (type: string) => {
    nombreMaxResultats = 9;
    typeDeRecherche.value = type;
    lancerRecherche();
  };
</script>
