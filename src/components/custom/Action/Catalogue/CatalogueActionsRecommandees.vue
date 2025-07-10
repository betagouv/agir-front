<template>
  <div tabindex="-1" ref="catalogueRootRef">
    <section>
      <BallLoader v-if="estEnRefresh" text="Nous préparons vos recommandations personnalisées..." ref="ballLoaderRef" />
      <template v-else>
        <ListeCartesActions :actions="actions" :card-classes="cardClasses" />
        <div v-if="actions.length !== 0" class="flex flex-center fr-mt-3w fr-mb-1w">
          <button
            class="fr-btn fr-btn--tertiary-no-outline fr-icon-refresh-line fr-icon--sm fr-btn--icon-left fr-mx-0"
            @click="supprimerCarte"
          >
            Proposez moi autre chose
          </button>
        </div>
      </template>
    </section>
    <section v-if="actions.length === 0" class="width-70 text--center fr-my-4w">
      <img alt="" class="fr-mb-3w" src="/etagere-vide.webp" width="170" />
      <h3 class="fr-h3 fr-mb-2w">C'est tout, pour le moment</h3>
      <p class="fr-mb-4w">
        Chaque mois, J’agis s’enrichit en nouveautés pour vous proposer toujours plus d’actions qui vous correspondent.
        En attendant, découvrez notre
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
  </div>
</template>

<script lang="ts" setup>
  import { computed, nextTick, ref } from 'vue';
  import ListeCartesActions from '@/components/custom/Action/Catalogue/ListeCartesActions.vue';
  import BallLoader from '@/components/custom/Thematiques/BallLoader.vue';
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

  const estEnRefresh = ref<boolean>(false);
  const catalogueRootRef = ref<HTMLDivElement>();
  const ballLoaderRef = ref<InstanceType<typeof BallLoader>>();

  defineExpose({
    focus: () => {
      catalogueRootRef.value?.focus();
    },
  });

  async function supprimerCarte() {
    estEnRefresh.value = true;
    for (const action of props.actions) {
      const supprimerAction = new SupprimerActionDesActionsRecommandeesUsecase(new ThematiquesRepositoryAxios());
      await supprimerAction.execute(
        utilisateurStore().utilisateur.id,
        props.thematiqueId,
        action.url.params.type,
        action.code,
      );
    }
    await nextTick();
    ballLoaderRef.value?.focus();

    setTimeout(async () => {
      await props.rafraichirActions();
      estEnRefresh.value = false;
      await nextTick();
      catalogueRootRef.value?.focus();
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

  .fr-card__content {
    padding-bottom: 2.5rem !important;
  }
</style>
