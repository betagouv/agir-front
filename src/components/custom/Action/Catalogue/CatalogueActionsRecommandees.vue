<template>
  <section class="fr-grid-row fr-grid-row--gutters">
    <div v-for="action in actions" :key="action.code" :class="cardClasses">
      <div class="fr-card fr-enlarge-link fr-card--horizontal fr-card--sm relative">
        <div class="fr-card__body">
          <div class="fr-card__content">
            <h3 class="fr-card__title">
              <router-link :to="action.url">
                <span class="text--black" v-html="action.titre" />
              </router-link>
            </h3>
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
              <li></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <button
      class="fr-btn fr-btn--tertiary-no-outline fr-icon-refresh-line fr-icon--sm fr-btn--icon-left fr-mx-0"
      @click="supprimerCarte"
    >
      Proposez moi autre chose
    </button>
  </section>
  <section v-if="actions.length === 0" class="width-70 text--center fr-my-4w">
    <img alt="" class="fr-mb-3w" src="/etagere-vide.webp" width="170" />
    <h3 class="fr-h3 fr-mb-2w">C'est tout, pour le moment</h3>
    <p class="fr-mb-4w">
      Chaque mois, J’agis s’enrichit en nouveautés pour vous proposer toujours plus d’actions qui vous correspondent. En
      attendant, découvrez notre
      <router-link :to="{ name: RouteActionsName.CATALOGUE_ACTION }" class="text--bleu">
        catalogue complet d’actions
      </router-link>
      ou recommencez l’expérience.
    </p>

    <div class="flex flex-center gap--small">
      <button class="fr-btn fr-btn--secondary fr-btn--icon-left fr-icon-refresh-line" @click="resetParcours">
        Recommencer le parcours
      </button>
      <router-link
        :to="{ name: RouteThematiquesName.THEMATIQUE, params: { id: redirection.id } }"
        class="fr-btn fr-btn--icon-left fr-icon-refresh-line"
      >
        Explorer "{{ redirection.label }}"
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
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

  async function supprimerCarte() {
    for (const action of props.actions) {
      const supprimerAction = new SupprimerActionDesActionsRecommandeesUsecase(new ThematiquesRepositoryAxios());
      await supprimerAction.execute(
        utilisateurStore().utilisateur.id,
        props.thematiqueId,
        action.url.params.type,
        action.code,
      );
    }
    setTimeout(async () => {
      await props.rafraichirActions();
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
