<template>
  <div
    ref="menuBar"
    aria-label="Filtrage des actions"
    class="full-width background--white fr-grid-row border-top--bleu"
    role="menubar"
    @keydown="gererEntreesClavier"
  >
    <div :class="filtresColonnes" class="fr-p-2w" data-nouvelle-colonne="true">
      <CatalogueFiltreThematiques
        v-if="filtresViewModel?.filtres"
        :filtres="filtresViewModel.filtres"
        @update-thematiques="updateThematiques"
      />
    </div>

    <div v-if="estConnecte" :class="filtresColonnes" class="fr-p-2w" data-nouvelle-colonne="true">
      <CatalogueFiltreStatut @update-status="updateStatus" />
    </div>

    <div :class="filtresColonnes" class="fr-p-2w" data-nouvelle-colonne="true">
      <div class="flex align-items--center flex-center full-height" role="menuitem" tabindex="-1">
        <InputSearchBar
          id="rechercheParTitre"
          class="full-width"
          name="titreRessource"
          placeholder="Rechercher"
          @submit="rechercherParTitre"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import CatalogueFiltreStatut from '@/components/custom/Action/Catalogue/CatalogueFiltreStatut.vue';
  import CatalogueFiltreThematiques from '@/components/custom/Action/Catalogue/CatalogueFiltreThematiques.vue';
  import InputSearchBar from '@/components/dsfr/InputSearchBar.vue';
  import { ActionsRepositoryAxios } from '@/domaines/actions/adapters/actions.repository.axios';
  import { FiltrerCatalogueActionsUsecase } from '@/domaines/actions/filtrerCatalogueActions.usecase';
  import {
    CatalogueActionsPresenter,
    FiltresCatalogueActionsViewModel,
  } from '@/domaines/actions/ports/catalogueActions.presenter';
  import { utilisateurStore } from '@/store/utilisateur';

  const { catalogueActionsPresenter } = defineProps<{
    catalogueActionsPresenter: CatalogueActionsPresenter;
    filtresViewModel: FiltresCatalogueActionsViewModel;
  }>();

  const isLoading = ref<boolean>(false);
  const idUtilisateur = utilisateurStore().utilisateur.id;
  const estConnecte = utilisateurStore().estConnecte;
  const filtresColonnes = estConnecte ? 'fr-col-12 fr-col-sm-6 fr-col-md-4' : 'fr-col-12 fr-col-sm-6';

  const menuBar = ref<HTMLDivElement>();
  const rechercheTitre = ref<string>('');
  const filtresThematiques = ref<string[]>([]);
  const filtreDejaVu = ref<boolean>(false);
  const filtreDejaRealisees = ref<boolean>(false);
  const filtreRecommandePourMoi = ref<boolean>(false);

  const updateThematiques = async thematiques => {
    filtresThematiques.value = thematiques;
    await filtrerLaRecherche();
  };

  const rechercherParTitre = async titre => {
    rechercheTitre.value = titre;
    await filtrerLaRecherche();
  };

  const updateStatus = async ({ dejaVu, dejaRealisees, recommandePourMoi }) => {
    filtreDejaVu.value = dejaVu;
    filtreDejaRealisees.value = dejaRealisees;
    filtreRecommandePourMoi.value = recommandePourMoi;
    await filtrerLaRecherche();
  };

  async function filtrerLaRecherche() {
    isLoading.value = true;
    const usecase = new FiltrerCatalogueActionsUsecase(new ActionsRepositoryAxios());
    await usecase.execute(
      idUtilisateur,
      filtresThematiques.value,
      rechercheTitre.value,
      filtreDejaVu.value,
      filtreDejaRealisees.value,
      filtreRecommandePourMoi.value,
      catalogueActionsPresenter,
    );
    isLoading.value = false;
  }

  function getAllSubMenus(): HTMLElement[] {
    return menuBar.value
      ? Array.from(menuBar.value.querySelectorAll<HTMLElement>('[data-nouvelle-colonne="true"]'))
      : [];
  }

  function focusFirstMenuItemInSubMenu(subMenu: HTMLElement | null) {
    const firstMenuItem = subMenu?.querySelector<HTMLElement>('[role="menuitem"]');
    if (firstMenuItem) {
      firstMenuItem.click();
      firstMenuItem.focus();
    }
  }

  function focusAdjacentSubMenu(currentSubMenu: HTMLElement, direction: 1 | -1) {
    const allSubMenus = getAllSubMenus();
    const currentIndex = allSubMenus.indexOf(currentSubMenu);
    const nextIndex = (currentIndex + direction + allSubMenus.length) % allSubMenus.length;
    focusFirstMenuItemInSubMenu(allSubMenus[nextIndex]);
  }

  function focusAdjacentMenuItem(currentItem: HTMLElement, items: HTMLElement[], direction: 1 | -1) {
    const currentIndex = items.indexOf(currentItem);
    const nextIndex = (currentIndex + direction + items.length) % items.length;
    items[nextIndex].focus();
  }

  function gererEntreesClavier(e: KeyboardEvent) {
    const target = e.target as HTMLElement;
    const focusedMenuItem = target.closest<HTMLElement>(
      '[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]',
    );
    const currentSubMenu = target.closest<HTMLElement>('[data-nouvelle-colonne="true"]');
    const currentSubMenuItems = currentSubMenu?.querySelectorAll<HTMLElement>(
      ':not(button)[role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]',
    );

    const handlers: Record<string, () => void> = {
      ArrowRight: () => currentSubMenu && focusAdjacentSubMenu(currentSubMenu, 1),
      ArrowLeft: () => currentSubMenu && focusAdjacentSubMenu(currentSubMenu, -1),
      ArrowDown: () =>
        focusedMenuItem &&
        currentSubMenuItems &&
        focusAdjacentMenuItem(focusedMenuItem, Array.from(currentSubMenuItems), 1),
      ArrowUp: () =>
        focusedMenuItem &&
        currentSubMenuItems &&
        focusAdjacentMenuItem(focusedMenuItem, Array.from(currentSubMenuItems), -1),
    };

    if (handlers[e.key]) {
      handlers[e.key]();
      e.preventDefault();
    }
  }
</script>

<style scoped>
  .border-top--bleu {
    border-top: 2px solid var(--blue-france-sun-113-625);
  }
</style>
