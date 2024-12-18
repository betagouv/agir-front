<!-- TODO: articles pour dechets, climat, loisir et services_societaux ET nombre_aides_dechet, nombre_aides_climat -->
<!-- TODO: dernières propriétés : nombreArticlesLocaux, nombreArticlesTotal, nombreDefiEnCours, nombreDefiRealises -->
<!-- TODO: où vont les chiffres des aides ? -->
<!-- TODO: supprimer tous les "nvx parcours" ? -->
<!-- TODO: skeleton -->

<template>
  <section class="fr-container fr-my-6w">
    <form
      @submit.prevent="lancerRecherche"
      class="flex flex-column flex-center gap--small fr-mb-8w text--center width--fit-content"
    >
      <InputText
        class="fr-mb-0"
        name="codePostal"
        label="Code postal"
        description="Saisissez un code postal afin d'obtenir des statistiques"
        v-model="codePostal"
      />
      <button type="submit" class="fr-btn full-width text--center">Valider</button>
    </form>

    <div>
      <CarteSkeleton v-if="isLoading" />
      <template v-else-if="nouveauParcoursViewmodel">
        <section class="propositions text--center">
          <h1 class="fr-h2 fr-mb-3w">
            <span class="text--italic">J'agis</span> en quelques chiffres pour le code postal
            <span class="codePostal">{{ nouveauParcoursViewmodel.codePostal }}</span>
          </h1>

          <p
            v-if="nouveauParcoursViewmodel.nombreInscrits > 1 && nouveauParcoursViewmodel.nombrePointsMoyen > 1"
            class="fr-mb-5w"
          >
            Dans votre commune, {{ nouveauParcoursViewmodel.nombreInscrits }} utilisateurs sont inscrits à J'agis et
            cumulent {{ nouveauParcoursViewmodel.nombrePointsMoyen }} points en moyenne.
          </p>

          <p
            v-if="nouveauParcoursViewmodel?.nombreInscrits === 1 && nouveauParcoursViewmodel.nombrePointsMoyen > 0"
            class="fr-mb-5w"
          >
            Dans votre commune, un unique utilisateur est inscrit à J'agis et il cumule
            {{ nouveauParcoursViewmodel.nombrePointsMoyen }} points.
          </p>

          <div class="fr-grid-row fr-grid-row--gutters">
            <CarteDecouverte
              v-for="proposition in nouveauParcoursViewmodel.propositions"
              :key="proposition.titre"
              :lien-bouton="proposition.lien"
              :titre-emoji="proposition.emoji"
              :titre-texte="proposition.titre"
            >
              <div v-if="proposition.contenu.length > 0">
                <p class="fr-m-0">Les services :</p>
                <ul>
                  <li v-for="item in proposition.contenu" :key="item" v-html="item"></li>
                </ul>
              </div>

              <div v-if="proposition.aides.length > 0 && proposition.nombreDAides > 0">
                <p v-if="proposition.aides.length === proposition.nombreDAides" class="fr-m-0">
                  Les <span class="text--bold">aides</span> disponibles :
                </p>
                <p v-else class="fr-m-0">
                  Quelques <span class="text--bold">aides</span> parmi les {{ proposition.nombreDAides }} disponibles :
                </p>

                <ul>
                  <li v-for="article in proposition.aides" :key="article.id">
                    {{ article.titre }}
                  </li>
                </ul>
              </div>

              <div v-if="proposition.articles.length > 0">
                <p class="fr-m-0">Quelques <span class="text--bold">articles</span> :</p>
                <ul>
                  <li v-for="article in proposition.articles" :key="article.id">
                    <router-link :to="`/article/previsualisation/${article.id}`">{{ article.titre }}</router-link>
                  </li>
                </ul>
              </div>

              <p
                v-if="
                  proposition.contenu.length === 0 &&
                  proposition.articles.length === 0 &&
                  proposition.aides.length === 0
                "
              >
                Aucun contenu disponible pour l'instant !
              </p>
            </CarteDecouverte>
          </div>
        </section>
      </template>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CarteDecouverte from '@/components/custom/NouveauParcours/CarteDecouverte.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import { NouveauParcoursPresenterImpl } from '@/domaines/nouveauParcours/adapters/nouveauParcours.presenter.impl';
  import { NouveauParcoursRepositoryAxios } from '@/domaines/nouveauParcours/adapters/nouveauParcours.repository.axios';
  import { NouveauParcoursViewModel } from '@/domaines/nouveauParcours/ports/nouveauParcours.presenter';
  import { RecuperationDonneesNouveauParcoursUsecase } from '@/domaines/nouveauParcours/recuperationDonneesNouveauParcours.usecase';

  const isLoading = ref<boolean>(false);
  const nouveauParcoursViewmodel = ref<NouveauParcoursViewModel>();

  const codePostal = ref<string>('');

  function lancerRecherche() {
    isLoading.value = true;
    const usecase = new RecuperationDonneesNouveauParcoursUsecase(new NouveauParcoursRepositoryAxios());
    usecase
      .execute(codePostal.value, new NouveauParcoursPresenterImpl(vm => (nouveauParcoursViewmodel.value = vm)))
      .finally(() => {
        isLoading.value = false;
      });
  }
</script>

<style scoped>
  .codePostal {
    color: #43904d;
    font-weight: bold;
    font-style: italic;
  }

  .propositions li:first-letter {
    text-transform: capitalize;
  }

  form {
    justify-self: center;
  }

  button {
    justify-content: center;
  }
</style>
