<template>
  <section>
    <h2 class="fr-h3 fr-mb-1w">Quelle est votre adresse ?</h2>
    <p class="fr-mb-3w">Nous en avons besoin pour localiser votre compteur</p>

    <form @submit.prevent>
      <div class="fr-mb-4w">
        <label for="adresse" class="fr-mb-2w">Votre adresse <span class="fr-hint-text">Obligatoire</span></label>
        <BarreDeRechercheAdresse
          class="fr-mt-1w"
          label-id="adresse"
          v-model:adresse="adresse"
          v-model:coordonnees="coordonnees"
          v-model:recherche="recherche"
        />
        <EnregistreurAdressePrincipale
          v-if="adresse && coordonnees && avecAdressePrivee"
          :adresse="adresse"
          :coordonnees="coordonnees"
          @enregistrementNouvelleAdresse="avecAdressePrivee = false"
        />
      </div>

      <InputText
        class="fr-mb-4w"
        required
        name="nom-de-famille"
        label="Nom de famille (du titulaire du contrat électrique)"
        :model-value="nomDeFamille"
        autocomplete="family-name"
        description="Obligatoire"
      />

      <button
        class="fr-btn fr-btn--tertiary fr-btn--icon-left fr-mb-3w"
        :class="affichagePRM ? 'fr-icon-eye-off-fill' : 'fr-icon-settings-5-fill'"
        @click="toggleAffichagePRM"
        v-text="
          !affichagePRM ? 'Je préfère renseigner mon numéro de compteur' : 'Masquer le champ du numéro de compteur'
        "
      />

      <template v-if="affichagePRM">
        <InputText
          label="Numéro de PRM"
          description="Il s’agit d’une suite de 14 chiffres qui identifie le logement sur le réseau électrique"
          :model-value="numeroCompteurInput"
          name="prm"
        />

        <section class="accordeon-prm">
          <Accordeon name-id="accordeon-prm" class="fr-mb-3w">
            <template #titre>
              <span class="fr-icon-information-line fr-pr-1w" aria-hidden="true" />
              Où trouver le numéro de PRM&nbsp;?
            </template>

            <template #contenu>
              <div class="fr-grid-row fr-grid-row--gutters">
                <section class="fr-col-12 fr-col-md-6 flex fr-pr-2w">
                  <img src="/facture-linky-exemple.webp" class="fr-pt-1w fr-mr-2w" alt="" />
                  <div>
                    <h4 class="fr-mb-1w">Sur votre facture</h4>
                    <p>Vous trouverez votre numéro de PRM sur votre facture</p>
                  </div>
                </section>

                <section class="fr-col-12 fr-col-md-6 flex fr-pr-2w left-border">
                  <img src="/compteur-linky-exemple.webp" class="fr-pt-1w fr-mr-2w" alt="" />
                  <div>
                    <h4 class="fr-mb-1w">Sur votre compteur Linky</h4>
                    <p>
                      Faire défiler les affichages du compteur (appui sur la touche +) jusqu’à lire la valeur du “numéro
                      de PRM”
                    </p>
                  </div>
                </section>
              </div>
            </template>
          </Accordeon>
        </section>
      </template>

      <InputCheckboxUnitaire
        class="fr-mb-4w"
        id="cguWW"
        label="En activant le suivi de ma consommation, je déclare sur l’honneur être titulaire du compte électrique ou être
          mandaté par celui-ci. J’autorise Watt Watchers à recueillir mon historique de consommation d’électricité sur 3
          ans (demi-heure, journée et puissance maximum quotidienne), ainsi qu’à analyser mes consommations."
        :model-value="acceptationCguWw"
      />

      <button class="fr-btn" @click="localiserMonCompteur" :aria-controls="MODALE_ID" data-fr-opened="false">
        Localiser mon compteur
      </button>
    </form>
  </section>

  <Teleport to="body">
    <Modale :id="MODALE_ID" :is-footer-actions="true" :radius="false" labelId="label-id" size="s">
      <template v-slot:contenu>
        <template v-if="estEnTentativeConnexion"><BallLoader text="Localisation de votre compteur..." /></template>
        <template v-else-if="numeroCompteurInput">
          <div class="flex flex-center fr-mb-2w">
            <img src="/prise-fonctionnelle.svg" alt="" class="margin-x-auto" />
          </div>
          <h1 id="label-id" class="fr-modal__title">Connexion établie</h1>
          <p class="fr-mb-1w">Ces informations sont-elles correctes ?</p>
          <div class="recapitulatif">
            <ul class="text--bold list-style-none fr-p-2w">
              <li class="fr-mb-1w">Mr. NOM</li>
              <li class="text--normal fr-mb-1w">
                <span class="fr-tag fr-icon-map-pin-2-fill fr-tag--icon-left">à Commune</span>
              </li>
              <li>Compteur #{{ numeroCompteurInput }}</li>
            </ul>
          </div>
        </template>
        <template v-else>
          <div class="flex flex-center fr-mb-2w">
            <img src="/prise-non-fonctionnelle.svg" alt="" class="margin-x-auto" />
          </div>
          <h1 id="label-id" class="fr-modal__title">La connexion a échouée</h1>
          <p class="fr-mb-1w">Nous n’avons pas trouvé de compteur relié aux informations que nous vous avez données.</p>
        </template>
      </template>
      <template v-slot:footer>
        <template v-if="estEnTentativeConnexion"></template>
        <template v-else-if="numeroCompteurInput">
          <ul
            class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
          >
            <li>
              <button class="fr-btn">Continuer</button>
            </li>
            <li>
              <button :aria-controls="MODALE_ID" class="fr-btn fr-btn--secondary">Modifier le numéro</button>
            </li>
          </ul>
        </template>
        <template v-else>
          <ul
            class="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg fr-btns-group--icon-left"
          >
            <li>
              <button class="fr-btn">Renseigner mon numéro de compteur</button>
            </li>
            <li>
              <button :aria-controls="MODALE_ID" class="fr-btn fr-btn--secondary">Retour</button>
            </li>
          </ul>
        </template>
      </template>
    </Modale>
  </Teleport>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import BarreDeRechercheAdresse from '@/components/custom/Form/BarreDeRechercheAdresse.vue';
  import EnregistreurAdressePrincipale from '@/components/custom/Form/EnregistreurAdressePrincipale.vue';
  import Modale from '@/components/custom/Modale/Modale.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';
  import Accordeon from '@/components/dsfr/Accordeon.vue';
  import InputCheckboxUnitaire from '@/components/dsfr/InputCheckboxUnitaire.vue';
  import InputText from '@/components/dsfr/InputText.vue';
  import {
    BarreDeRecherchePresenterImpl,
    BarreDeRechercheViewModel,
  } from '@/domaines/logement/adapters/barreDeRecherche.presenter.impl';
  import { LogementRepositoryAxios } from '@/domaines/logement/adapters/logement.repository.axios';
  import { RecupererAdressePourBarreDeRechercheUsecase } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
  import { AdresseBarreDeRecherche, Coordonnees } from '@/shell/coordonneesType.js';
  import { utilisateurStore } from '@/store/utilisateur';

  const utilisateur = utilisateurStore().utilisateur;
  const MODALE_ID = 'localisation-compteur-modal';

  const recherche = ref<string>('');
  const coordonnees = ref<Coordonnees>();
  const adresse = ref<AdresseBarreDeRecherche>();
  const nomDeFamille = ref<string>(utilisateur.nom);
  const acceptationCguWw = ref<boolean>(false);

  const avecAdressePrivee = ref<boolean>(false);
  const estEnTentativeConnexion = ref<boolean>(true);
  const affichagePRM = ref<boolean>(false);
  const numeroCompteurInput = ref<string>('');

  const logementRepository = new LogementRepositoryAxios();
  const recupererAdressePourBarreDeRechercheUsecase = new RecupererAdressePourBarreDeRechercheUsecase(
    logementRepository,
  );

  onMounted(async () => {
    await recupererAdressePourBarreDeRechercheUsecase.execute(
      utilisateur.id,
      new BarreDeRecherchePresenterImpl(async (barreDeRechercheViewModel: BarreDeRechercheViewModel) => {
        coordonnees.value = barreDeRechercheViewModel.coordonnees;
        recherche.value = barreDeRechercheViewModel.recherche;
      }),
    );
  });

  function localiserMonCompteur() {
    estEnTentativeConnexion.value = true;

    setTimeout(() => {
      estEnTentativeConnexion.value = false;
      numeroCompteurInput.value = '283918274';
    }, 1000);
  }

  function toggleAffichagePRM() {
    affichagePRM.value = !affichagePRM.value;
  }
</script>

<style scoped>
  .recapitulatif {
    background-color: #f7f7fc;
  }

  .accordeon-prm img {
    height: 7.5rem;
  }

  .accordeon-prm h4 {
    font-size: 1.1rem;
  }

  .left-border {
    position: relative;
    padding-left: 1rem;
  }

  .left-border::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    height: 50%;
    width: 1px;
    background-color: #e0e0e0;
    transform: translate(-50%, -50%);
  }
</style>
