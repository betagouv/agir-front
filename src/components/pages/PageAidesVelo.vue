<template>
  <div class="fr-container fr-pb-6w">
    <FilDAriane :page-courante="titrePage" />
    <CarteSkeleton v-if="isLoadingGlobal" />

    <div v-else-if="!simulationAidesVeloViewModel">Problème de chargement</div>
    <AidesResultat
      v-else
      :is-loading="isLoading"
      :simulation-aides-view-model="simulationAidesVeloViewModel"
      :titre="titrePage"
      sous-titre="Les aides vélo disponibles"
      titre-categorie-aide="Acheter un vélo neuf"
    >
      <template v-slot:serviceSelect>
        <ServiceSelect
          id="état-vélo"
          :options="OptionsEtatVelo"
          label="Choisir l'état du vélo"
          @update="updateEtatDuVelo"
        />
      </template>
      <template v-slot:asideResultatAides>
        <div class="background--white border border-radius--md fr-p-3w fr-mb-3w">
          <h2 class="fr-h5">Paramètres</h2>
          <form class="fr-mb-1w" @submit.prevent="simulerAideVelo">
            <div class="fr-grid-col justify-content--start">
              <BoutonsRadio
                v-model="estEnSituationDeHandicap"
                :default-value="estEnSituationDeHandicap"
                :options="[
                  { label: 'Oui', value: true },
                  { label: 'Non', value: false },
                ]"
                col="fr-col"
                legende="Êtes-vous en situation de handicap ?"
                legende-size="m"
                name="situation-handicap"
                options-size="md"
                orientation="horizontal"
              />
              <InputNumberVertical
                v-model="prixDuVelo"
                :default-value="prixDuVelo"
                :min-value="0"
                label="Prix du vélo (€)"
                name="prix-du-velo"
                size="md"
              />
              <div class="fr-mt-2v">
                <span class="fr-text--sm fr-text--bold">À titre indicatif, voici quelques prix moyens</span>
                <ul class="fr-text--sm fr-m-0">
                  <li class="fr-p-0">
                    Vélo mécanique :
                    <button class="text--underline" @click="updatePrixDuVelo(250)">250 €</button>
                  </li>
                  <li class="fr-p-0">
                    Vélo pliant standard :
                    <button class="text--underline" @click="updatePrixDuVelo(500)">500 €</button>
                  </li>
                  <li class="fr-p-0">
                    Vélo électrique standard :
                    <button class="text--underline" @click="updatePrixDuVelo(2000)">2 000 €</button>
                  </li>
                  <li class="fr-p-0">
                    Vélo cargo électrique :
                    <button class="text--underline" @click="updatePrixDuVelo(7000)">7 000 €</button>
                  </li>
                </ul>
              </div>
            </div>
            <button class="fr-btn fr-btn--secondary fr-mt-3w" @click.prevent="simulerAideVelo">Valider</button>
          </form>
        </div>
        <AsideAideVelo
          :code-postal="codePostal"
          :nombre-de-parts-fiscales="nombreDePartsFiscales"
          :revenu-fiscal="revenuFiscal"
          :ville="commune"
        />
      </template>
    </AidesResultat>
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import AidesResultat from '@/components/custom/Aides/AidesResultat.vue';
  import AsideAideVelo from '@/components/custom/Aides/AidesVeloAside.vue';
  import BoutonsRadio from '@/components/custom/Form/BoutonsRadio.vue';
  import InputNumberVertical from '@/components/custom/Form/InputNumberVertical.vue';
  import ServiceSelect from '@/components/custom/Service/ServiceSelect.vue';
  import CarteSkeleton from '@/components/custom/Skeleton/CarteSkeleton.vue';
  import FilDAriane from '@/components/dsfr/FilDAriane.vue';
  import { SimulerAideVeloPresenterImpl } from '@/domaines/aides/adapters/simulerAideVelo.presenter.impl';
  import { SimulerAideVeloRepositoryAxios } from '@/domaines/aides/adapters/simulerAideVelo.repository.axios';
  import { SimulationAideResultatViewModel } from '@/domaines/aides/ports/simulationAideResultat';
  import SimulerAideVeloUsecase, { EtatVelo, OptionsEtatVelo } from '@/domaines/aides/simulerAideVelo.usecase';
  import { LogementPresenterImpl } from '@/domaines/logement/adapters/logement.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { RecupererInformationLogementUseCase } from '@/domaines/logement/recupererInformationLogement.usecase';
  import { ProfileUtilisateurPresenterImpl } from '@/domaines/profileUtilisateur/adapters/profileUtilisateur.presenter.impl';
  import {
    ChargerProfileUtilisateurUsecase,
    ProfileUtilisateurRepositoryAxiosImpl,
  } from '@/domaines/profileUtilisateur/chargerProfileUtilisateur.usecase';
  import { utilisateurStore } from '@/store/utilisateur';

  const titrePage = 'Acheter un vélo';
  const simulationAidesVeloViewModel = ref<SimulationAideResultatViewModel>();
  const codePostal = ref<string>('');
  const commune = ref<string>('');
  const revenuFiscal = ref<number | null>(0);
  const nombreDePartsFiscales = ref<number>(0);
  const prixDuVelo = ref<number>(1000);
  const etatDuVelo = ref<EtatVelo>('neuf');
  const estEnSituationDeHandicap = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const isLoadingGlobal = ref<boolean>(true);
  const { id: idUtilisateur } = utilisateurStore().utilisateur;

  const recupererInformationLogementUseCase = new RecupererInformationLogementUseCase(new LogementRepositoryAxios());
  const chargerProfileUtilisateurUsecase = new ChargerProfileUtilisateurUsecase(
    new ProfileUtilisateurRepositoryAxiosImpl(),
  );

  onMounted(async () => {
    await simulerAideVelo();
    await recupererInformationLogementUseCase.execute(
      idUtilisateur,
      new LogementPresenterImpl(viewModel => {
        codePostal.value = viewModel.codePostal;
        commune.value = viewModel.commune_utilisee_dans_le_compte;
      }),
    );
    await chargerProfileUtilisateurUsecase.execute(
      idUtilisateur,
      new ProfileUtilisateurPresenterImpl(viewModel => {
        revenuFiscal.value = viewModel.revenuFiscal;
        nombreDePartsFiscales.value = viewModel.nombreDePartsFiscales;
      }),
    );

    isLoadingGlobal.value = false;
  });

  const simulerAideVelo = async () => {
    isLoading.value = true;
    const simulerAideVeloUsecase = new SimulerAideVeloUsecase(new SimulerAideVeloRepositoryAxios());
    await simulerAideVeloUsecase.execute(
      prixDuVelo.value,
      etatDuVelo.value,
      estEnSituationDeHandicap.value,
      idUtilisateur,
      new SimulerAideVeloPresenterImpl(mapResultatAidesVelo),
    );
  };

  const mapResultatAidesVelo = (viewModels: SimulationAideResultatViewModel) => {
    simulationAidesVeloViewModel.value = viewModels;
    isLoading.value = false;
  };

  const updatePrixDuVelo = (prix: number) => {
    prixDuVelo.value = prix;
  };

  const updateEtatDuVelo = async (etat: string) => {
    etatDuVelo.value = etat as EtatVelo;
    await simulerAideVelo();
  };
</script>
