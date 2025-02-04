<template>
  <div class="fr-container fr-mb-6w">
    <FilDAriane
      :page-courante="`Défi : ${defiViewModel?.libelle}`"
      :page-hierarchie="
        useRoute().params.thematiqueId && useRoute().params.missionId
          ? [
              {
                label: `${MenuThematiques.getFromUrl(useRoute().params.thematiqueId as string).labelDansLeMenu}`,
                url: `/thematique/${useRoute().params.thematiqueId}`,
              },
              {
                label: `Mission`,
                url: `/thematique/${useRoute().params.thematiqueId}/mission/${useRoute().params.missionId}`,
              },
            ]
          : []
      "
    />
    <h1 class="fr-h2">Relevez le défi !</h1>
    <div v-if="isLoading">Chargement en cours ...</div>
    <div v-else-if="!isLoading && defiViewModel" class="fr-grid-row fr-grid-row--gutters">
      <div class="fr-col-sm-8">
        <div class="background--white border fr-p-4w border-radius--md">
          <div class="flex align-items--center gap--small fr-mb-2w">
            <span class="display-block fr-tag background--bleu-ecume-hover text--xs">Action</span>
            <ThematiqueTag :tag="defiViewModel.thematiqueTag" />
          </div>
          <form v-if="!reponseAEteDonnee" @submit.prevent="validerLaReponse">
            reponse ->{{ reponse }} : {{ defiViewModel.reponses_possibles[0].id }}
            <BoutonRadio
              v-model="reponse"
              :default-value="reponse"
              :description="defiViewModel.description"
              :legende="defiViewModel.libelle"
              :options="
                defiViewModel.reponses_possibles.map((reponsePossible: ReponsePossible) => ({
                  label: reponsePossible.label,
                  value: reponsePossible.id,
                }))
              "
              col=""
              legende-size="l"
              name="defi"
              orientation="horizontal"
            />

            <div v-if="reponse === 'pas_envie' || reponse === 'abondon'">
              <div class="fr-grid-row align-items--center fr-mb-2w gap--small">
                <img alt="" height="48" src="/ic_cible.svg" />
                <p class="fr-h4 fr-mb-0">Cette action ne vous convient pas ?</p>
              </div>
              <label class="fr-label" for="explication">
                On ne vise pas toujours juste ! Dites-nous pourquoi en quelques mots et nous affinerons nos
                recommandations à l’avenir. (facultatif)</label
              >
              <textarea id="explication" v-model="explication" class="fr-input fr-mb-4w" name="explication" />
            </div>

            <button class="fr-btn fr-btn--lg fr-mb-2w" title="Valider">Valider</button>
          </form>

          <DefiFin v-if="reponseAEteDonnee" :defi="defiViewModel" :reponse="reponse" />
        </div>
        <div
          v-if="defiViewModel.astuces || defiViewModel.afficherNombreDePersonnes"
          class="background--white border fr-mt-3w fr-p-4w border-radius--md"
        >
          <div v-if="defiViewModel.afficherNombreDePersonnes">
            <img alt="" height="48" src="/ic_users.svg" />
            <p class="fr-h2 fr-mb-0">Rejoignez {{ prenomsAleatoires }} et plein d’autres !</p>
            <p>{{ defiViewModel?.nombreDePersonnes }} personnes ont déjà relevé le défi... Et vous ?</p>
          </div>

          <div v-if="defiViewModel.astuces" class="background-bleu-alt-light border-radius--md fr-p-2w fr-mb-2w">
            <h2 class="fr-h6">
              <span aria-hidden="true" class="fr-icon-arrow-right-s-last-line text--bleu-minor"></span>
              Bonnes astuces pour réaliser ce défi
            </h2>
            <p class="fr-mb-0 cms__content" v-html="defiViewModel.astuces"></p>
          </div>
        </div>
      </div>
      <div v-if="defiViewModel.pourquoi" class="fr-col-sm-4">
        <CarteInfo>
          <p class="fr-text--bold">
            <span aria-hidden="true" class="fr-icon-question-line"></span>
            Pourquoi ce défi ?
          </p>
          <p class="fr-mb-0 cms__content" v-html="defiViewModel.pourquoi"></p>
        </CarteInfo>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue';
  import { useRoute } from 'vue-router';
  import BoutonRadio from '@/components/custom/BoutonRadio.vue';
  import CarteInfo from '@/components/custom/CarteInfo.vue';
  import DefiFin from '@/components/custom/Defi/DefiFin.vue';
  import ThematiqueTag from '@/components/custom/Thematiques/ThematiqueTag.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { DefiPresenterImpl, DefiViewModel, ReponsePossible } from '@/domaines/defi/adapters/defi.presenter.impl';
  import { DefiRepositoryAxios } from '@/domaines/defi/adapters/defi.repository.axios';
  import { EnvoyerReponseDefiUsecase } from '@/domaines/defi/envoyerReponseDefi.usecase';
  import { RecupererDefiUsecase } from '@/domaines/defi/recupererDefiUsecase';
  import { MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
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
  const reponseInitiale = ref<string>('');

  const utilisateurId = utilisateurStore().utilisateur.id;

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
        reponse.value =
          defiViewModel.value?.reponses_possibles.filter(r => r.id === defiViewModel.value?.reponse).length > 0
            ? defiViewModel.value?.reponse
            : defiViewModel.value?.reponses_possibles[0].id;
        explication.value = viewModel.explicationRefus || '';
      }),
    );

    isLoading.value = false;
    reponseInitiale.value = reponse.value;
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
