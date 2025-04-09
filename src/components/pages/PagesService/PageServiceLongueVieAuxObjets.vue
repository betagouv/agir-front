<template>
  <div class="fr-container">
    <FilDAriane
      :page-hierarchie="
        useRoute().params.thematiqueId
          ? [
              {
                label: `${MenuThematiques.getFromUrl(useRoute().params.thematiqueId as string).labelDansLeMenu}`,
                url: `/thematique/${useRoute().params.thematiqueId}`,
              },
            ]
          : []
      "
      page-courante="Service : Longue vie aux objets"
    />

    <ServiceSkeletonConditionnel
      :is-loading="isLoading"
      :view-model-existe="serviceRechercheLongueVieAuxObjetsViewModel !== undefined"
      :message-erreur="serviceErreur"
    >
      <h1 class="fr-h2">
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

      <section class="fr-my-3w">
        <h2 class="fr-h3 fr-mb-2w">Recherche par adresse</h2>
        <p class="fr-mb-2w">Envie d'un résultat plus précis&nbsp;?</p>
        <ServiceBarreDeRechercheAdresse v-model="coordonnees" class="fr-col-12 fr-col-md-7" />
      </section>

      <PageServiceTemplate
        v-if="serviceRechercheLongueVieAuxObjetsViewModel?.aside"
        :aside="serviceRechercheLongueVieAuxObjetsViewModel.aside"
      >
        <div
          v-if="
            (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelSansResultats)
              .aucunResultat
          "
          class="text--center"
        >
          <img alt="" height="250" src="/service_aucun_resultat.svg" />
          <p class="fr-text--lg">😢 Aucun résultat n’est encore disponible pour votre localisation</p>
        </div>
        <div v-else>
          <section
            v-if="
              serviceRechercheLongueVieAuxObjetsViewModel &&
              (serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats)
                .favoris
            "
          >
            <ServiceFavoris
              :services-recherche-favoris-view-model="
                (
                  serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
                ).favoris!
              "
              titre="Mes lieux favoris"
            />
          </section>
          <section>
            <h2 class="fr-h3">Suggestions</h2>
            <ServiceListeCarte
              :suggestions-service-view-model="
                (
                  serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
                ).suggestions
              "
            />
            <ServiceSkeletonCartes v-if="isLoadingMore" />
            <button
              v-if="
                (
                  serviceRechercheLongueVieAuxObjetsViewModel as ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats
                ).plusDeResultatsDisponibles
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
  import { useRoute } from 'vue-router';
  import PageServiceTemplate from '@/components/custom/Service/PageServiceTemplate.vue';
  import ServiceBarreDeRechercheAdresse from '@/components/custom/Service/ServiceBarreDeRechercheAdresse.vue';
  import ServiceFavoris from '@/components/custom/Service/ServiceFavoris.vue';
  import ServiceListeCarte from '@/components/custom/Service/ServiceListeCarte.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import ServiceSkeletonCartes from '@/components/custom/Service/ServiceSkeletonCartes.vue';
  import ServiceSkeletonConditionnel from '@/components/custom/Service/ServiceSkeletonConditionnel.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import {
    ServiceRechercheLongueVieAuxObjetsPresenterImpl,
    ServiceRechercheLongueVieAuxObjetsViewModel,
    ServiceRechercheLongueVieAuxObjetsViewModelAvecResultats,
    ServiceRechercheLongueVieAuxObjetsViewModelSansResultats,
  } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.presenter.impl';
  import { ServiceRechercheLongueVieAuxObjetsAxios } from '@/domaines/serviceRecherche/longueVieAuxObjets/adapters/serviceRechercheLongueVieAuxObjets.repository.axios';
  import { RecupererServiceLongueVieAuxObjetsUsecase } from '@/domaines/serviceRecherche/longueVieAuxObjets/recupererServiceLongueVieAuxObjets.usecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { utilisateurStore } from '@/store/utilisateur';

  const isLoading = ref<boolean>(true);
  const coordonnees = ref<{ latitude: number; longitude: number }>();
  const isLoadingMore = ref<boolean>(false);
  const serviceRechercheLongueVieAuxObjetsViewModel = ref<ServiceRechercheLongueVieAuxObjetsViewModel>();

  const usecase = new RecupererServiceLongueVieAuxObjetsUsecase(new ServiceRechercheLongueVieAuxObjetsAxios());

  const serviceErreur = ref<string | null>(null);
  let nombreMaxResultats = 9;
  const typeDeRecherche = ref<string>('vos_objets');

  onMounted(() => {
    lancerRecherche();
  });

  watch(coordonnees, () => {
    lancerRecherche();
  });

  async function lancerRecherche(): Promise<void> {
    await usecase.execute(
      utilisateurStore().utilisateur.id,
      typeDeRecherche.value,
      nombreMaxResultats,
      new ServiceRechercheLongueVieAuxObjetsPresenterImpl(
        vm => {
          serviceRechercheLongueVieAuxObjetsViewModel.value = vm;
        },
        error => (serviceErreur.value = error),
      ),
      coordonnees.value,
    );
    isLoading.value = false;
  }

  const chargerPlusDeResultats = async () => {
    isLoadingMore.value = true;
    nombreMaxResultats += 9;
    await lancerRecherche();
    isLoadingMore.value = false;
  };

  const updateType = (type: string) => {
    nombreMaxResultats = 9;
    typeDeRecherche.value = type;
    lancerRecherche();
  };
</script>
