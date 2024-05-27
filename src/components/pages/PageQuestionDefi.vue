<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane :page-courante="`Défi : ${defiViewModel?.libelle}`" />
    <h1 class="fr-h2">Relevez le défi !</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <div class="fr-grid-row fr-grid-row--gutters" v-else-if="!isLoading && defiViewModel">
      <div class="fr-col-8">
        <div class="background--white border fr-p-4w border-radius--md">
          <span class="display-block fr-mb-2w fr-mr-1w fr-tag background--bleu-ecume-hover">Action</span>
          <span class="display-block fr-text--bold fr-mb-1w fr-text--sm text--black">{{
            defiViewModel.thematique
          }}</span>
          <form @submit.prevent="validerLaReponse" v-if="!reponseAEteDonnee">
            <BoutonRadio
              col=""
              legende-size="l"
              :legende="defiViewModel.libelle"
              name="defi"
              orientation="horizontal"
              :options="
                defiViewModel.reponses_possibles.map((reponsePossible: ReponsePossible) => ({
                  label: reponsePossible.label,
                  value: reponsePossible.id,
                }))
              "
              :description="defiViewModel.description"
              v-model="reponse"
              :default-value="reponse ? reponse.toString() : undefined"
            />

            <div v-if="reponse === 'pas_envie' || reponse === 'abondon'">
              <div class="fr-grid-row align-items--center fr-mb-2w">
                <img height="48" src="/ic_cible.svg" alt="" />
                <p class="fr-h4 fr-ml-4v fr-mb-0">Cette action ne vous convient pas ?</p>
              </div>
              <label class="fr-label" for="explication">
                On ne vise pas toujours juste ! Dites-nous pourquoi en quelques mots et nous affinerons nos
                recommandations à l’avenir. (facultatif)</label
              >
              <textarea class="fr-input fr-mb-4w" v-model="explication" id="explication" name="explication" />
            </div>

            <button class="fr-btn fr-btn--lg fr-mb-4w" title="Valider" :disabled="isButtonDisabled">Valider</button>
          </form>

          <DefiFin v-if="reponseAEteDonnee" :defi="defiViewModel" :reponse="reponse" />
        </div>
        <div class="background--white border fr-mt-3w fr-p-4w border-radius--md">
          <div v-if="defiViewModel.afficherNombreDePersonnes">
            <img height="48" src="/ic_users.svg" alt="" />
            <p class="fr-h2 fr-mb-0">Rejoignez {{ prenomsAleatoires }} et plein d’autres !</p>
            <p>{{ defiViewModel?.nombreDePersonnes }} personnes ont déjà relevé le défi... Et vous ?</p>
          </div>

          <div class="background-bleu-alt-light border-radius--md fr-p-2w fr-mb-2w">
            <h2 class="fr-h6">
              <span class="fr-icon-arrow-right-s-last-line text--bleu-minor" aria-hidden="true"></span>
              Bonnes astuces pour réaliser ce défi
            </h2>
            <p class="fr-mb-0 cms__content" v-html="defiViewModel.astuces"></p>
          </div>
        </div>
      </div>
      <div class="fr-col-4">
        <CarteInfo>
          <p class="fr-text--bold">
            <span class="fr-icon-question-line" aria-hidden="true"></span>
            Pourquoi ce défi ?
          </p>
          <p class="fr-mb-0 cms__content" v-html="defiViewModel.pourquoi"></p>
        </CarteInfo>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import DefiFin from '@/components/custom/Defi/DefiFin.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { DefiPresenterImpl, DefiViewModel, ReponsePossible } from '@/domaines/defi/adapters/defi.presenter.impl';
  import { DefiRepositoryAxios } from '@/domaines/defi/adapters/defi.repository.axios';
  import { EnvoyerReponseDefiUsecase } from '@/domaines/defi/envoyerReponseDefi.usecase';
  import { RecupererDefiUsecase } from '@/domaines/defi/recupererDefiUsecase';
  import { ToDoListEventBusImpl } from '@/domaines/toDoList/toDoListEventBusImpl';
  import { utilisateurStore } from '@/store/utilisateur';

  const listePrenoms = [
    'Colette',
    'Arnaud',
    'Gilles',
    'Clément',
    'Elsa',
    'Hombeline',
    'Alice',
    'Isabelle',
    'Valérie',
    'Gregory',
    'Zohra',
    'Martine',
    'Daniel',
    'Stephane',
    'Audrey',
    'Pierre',
    'Dominique',
    'Thibaut',
    'Sylvie',
    'Cédric',
    'Bernard',
    'Keryan',
    'Romuald',
    'Mélanie',
    'Jeanne',
    'Claire',
    'Nina',
    'Alix',
    'Wilfried',
    'Géraldine',
    'Christophe',
  ];
  const route = useRoute();
  const questionId = Array.isArray(route.params.id) ? route.params.id[0] : route.params.id;

  const isLoading = ref<boolean>(true);
  const defiViewModel = ref<DefiViewModel>();
  const reponse = ref<string>('');
  const explication = ref<string>('');
  const reponseAEteDonnee = ref<boolean>(false);
  const aDejaRepondu = ref<boolean>(false);

  const utilisateurId = utilisateurStore().utilisateur.id;

  const isButtonDisabled = computed(() => {
    return reponse.value === 'todo';
  });

  const obtenirPrenomsAleatoires = (count, max) => {
    const indices: number[] = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * (max + 1));
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const prenomsAleatoires = computed(() =>
    obtenirPrenomsAleatoires(3, listePrenoms.length - 1)
      .map(index => listePrenoms[index])
      .join(', '),
  );

  onMounted(async () => {
    const recupereQuestionUsecase = new RecupererDefiUsecase(new DefiRepositoryAxios());
    await recupereQuestionUsecase.execute(
      questionId,
      utilisateurId,
      new DefiPresenterImpl((viewModel: DefiViewModel) => {
        defiViewModel.value = viewModel;
        reponse.value = viewModel.reponse;
        explication.value = viewModel.explicationRefus || '';
      }),
    );
    isLoading.value = false;
  });

  const validerLaReponse = async () => {
    const envoyerReponseUsecase = new EnvoyerReponseDefiUsecase(
      new DefiRepositoryAxios(),
      ToDoListEventBusImpl.getInstance(),
    );
    await envoyerReponseUsecase.execute(utilisateurId, questionId, reponse.value, explication.value);

    if (defiViewModel.value?.reponse) {
      aDejaRepondu.value = true;
    }
    reponseAEteDonnee.value = true;
  };
</script>
