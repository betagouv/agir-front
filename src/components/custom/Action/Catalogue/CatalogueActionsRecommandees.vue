<template>
  <div class="fr-grid-row fr-grid-row--gutters fr-mt-2w">
    <section v-for="action in actions" :key="action.code" :class="cardClasses">
      <div v-if="!loadingActions[action.code]" class="fr-card fr-card--horizontal relative">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h2 class="fr-card__title" v-html="action.titre"></h2>
            <ul class="fr-card__desc list-style-none fr-p-0 flex gap--small flex-wrap">
              <li v-if="action.nombreDePersonnes" class="text--bleu fr-icon-team-line fr-pb-0">
                <span class="text--gris fr-pl-1w" v-html="action.nombreDePersonnes" />&nbsp;
              </li>
              <li v-if="action.aidesDisponibles" class="text--bleu fr-icon-money-euro-circle-line fr-pb-0">
                <span class="text--gris fr-pl-1w" v-html="action.aidesDisponibles" />
              </li>
            </ul>
          </div>
          <div class="fr-card__footer">
            <ul
              class="fr-btns-group fr-btns-group--inline fr-btns-group--sm fr-btns-group--icon-left flex-space-between"
            >
              <li>
                <button
                  class="fr-btn fr-btn--tertiary-no-outline fr-icon-refresh-line fr-icon--sm fr-btn--icon-left fr-mx-0"
                  @click="supprimerCarte(action.url.params.type, action.code)"
                >
                  Proposez moi autre chose
                </button>
              </li>

              <li>
                <router-link class="fr-btn" :to="action.url">Découvrir</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div
        v-else
        class="fr-card fr-card--horizontal relative flex flex-center items-center justify-center flex-column p-4 full-width"
      >
        <div class="fr-card__body">
          <div class="fr-card__content">
            <span class="text--center text--bold" aria-live="polite" role="status">Chargement...</span>
            <div class="ball-loader fr-my-3w fr-mx-auto" />
          </div>
        </div>
      </div>
    </section>
    <section v-if="actions.length === 0" class="width-70 text--center fr-my-4w">
      <h3 class="fr-h3 fr-mb-2w">C'est tout, pour le moment</h3>
      <p class="fr-mb-4w">
        Chaque mois, J’agis s’enrichit en nouveautés pour vous proposer toujours plus d’actions qui vous correspondent.
        En attendant, découvrez notre
        <router-link class="text--bleu" :to="{ name: RouteActionsName.CATALOGUE_ACTION }">
          catalogue complet d’actions
        </router-link>
        ou recommencez l’expérience.
      </p>

      <div class="flex flex-center gap--small">
        <button class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-refresh-line" @click="resetParcours">
          Recommencer le parcours
        </button>
        <router-link
          class="fr-btn fr-btn--icon-left fr-icon-refresh-line"
          :to="{ name: RouteThematiquesName.THEMATIQUE_V2, params: { id: redirection.id } }"
        >
          Explorer "{{ redirection.label }}"
        </router-link>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { ActionViewModel } from '@/domaines/actions/ports/actions.presenter';
  import { ThematiquesRepositoryAxios } from '@/domaines/thematiques/adapters/thematiques.repository.axios';
  import { ClefThematiqueAPI, MenuThematiques } from '@/domaines/thematiques/MenuThematiques';
  import { SupprimerActionDesActionsRecommandeesUsecase } from '@/domaines/thematiques/supprimerActionDesActionsRecommandees.usecase';
  import { RouteActionsName } from '@/router/actions/routes';
  import { RouteThematiquesName } from '@/router/thematiques/routes';
  import { utilisateurStore } from '@/store/utilisateur';

  const props = defineProps<{
    actions: ActionViewModel[];
    cardClasses: string;
    thematiqueId: string;
    rafraichirActions: () => Promise<void>;
    resetParcours: () => Promise<void>;
  }>();

  const loadingActions = ref<{ [key: string]: boolean }>({});

  async function supprimerCarte(actionType: string, actionId: string) {
    loadingActions.value[actionId] = true;
    const supprimerAction = new SupprimerActionDesActionsRecommandeesUsecase(new ThematiquesRepositoryAxios());
    await supprimerAction.execute(utilisateurStore().utilisateur.id, props.thematiqueId, actionType, actionId);

    setTimeout(async () => {
      await props.rafraichirActions();
      delete loadingActions.value[actionId];
    }, 500);
  }

  const ordreThematique = [
    ClefThematiqueAPI.alimentation,
    ClefThematiqueAPI.transports,
    ClefThematiqueAPI.logement,
    ClefThematiqueAPI.consommation,
  ];
  const redirection = computed(() => {
    const indexActuel = ordreThematique.indexOf(props.thematiqueId as ClefThematiqueAPI);
    const prochainIndex = (indexActuel + 1) % ordreThematique.length;
    const prochaineThematique = ordreThematique[prochainIndex];

    const { url, labelDansLeMenu } = MenuThematiques.getThematiqueData(prochaineThematique);
    return { id: url, label: labelDansLeMenu };
  });
</script>

<style scoped>
  .width-70 {
    width: 70%;
    margin: 0 auto;
  }
</style>
