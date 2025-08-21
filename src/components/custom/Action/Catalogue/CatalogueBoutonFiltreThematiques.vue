<template>
  <button
    ref="boutonThematique"
    type="button"
    id="menu-thematiques-bouton"
    aria-haspopup="true"
    :aria-expanded="menuThematiqueOuvert"
    aria-controls="menu-thematiques"
    @click="toggleThematiquesMenu"
    class="position--relative text--left full-width flex flex-space-between align-items--center fr-p-2w"
  >
    <span>
      <span class="fr-text--lg fr-mb-1w text--normal text--bleu display-block">Thématiques</span>
      <span class="flex align-items--center" v-html="filtreResume" />
    </span>

    <span
      class="text--bleu"
      :class="{
        'fr-icon-arrow-down-s-line': !menuThematiqueOuvert,
        'fr-icon-arrow-up-s-line': menuThematiqueOuvert,
      }"
    />
  </button>

  <div
    id="menu-thematiques"
    ref="menuThematique"
    v-show="menuThematiqueOuvert"
    role="menu"
    tabindex="-1"
    aria-labelledby="menu-thematiques-bouton"
    class="popup-filtre-thematique shadow background--white fr-p-2w flex"
    @keyup.esc="fermerMenu"
  >
    <InputCheckbox id="thematiques" :options="filtres" @update="updateThematiques">
      <template #label>
        <span class="fr-text--lg fr-mb-0 text--normal text--bleu display-block">Thématiques</span>
      </template>
    </InputCheckbox>
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick, computed } from 'vue';
  import InputCheckbox from '@/components/dsfr/InputCheckbox.vue';

  const props = defineProps<{ filtres: { id: string; label: string; checked: boolean }[] }>();

  const emit = defineEmits<{ (event: 'updateThematiques', value: string[]): void }>();
  const updateThematiques = (thematiques: string[]) => emit('updateThematiques', thematiques);

  const menuThematique = ref<HTMLDivElement>();
  const boutonThematique = ref<HTMLButtonElement>();
  const menuThematiqueOuvert = ref<boolean>(false);
  const filtreResume = computed(() => {
    const filtresSelectionne = props.filtres.filter(filtre => filtre.checked);

    if (filtresSelectionne.length === 0 || filtresSelectionne.length === props.filtres.length) {
      return 'Toutes';
    } else if (filtresSelectionne.length === 1) {
      return filtresSelectionne[0].label;
    } else {
      return `${filtresSelectionne[0].label} <span class="fr-tag fr-tag--custom-bleu fr-tag--sm fr-ml-1w">+${filtresSelectionne.length - 1}</span>`;
    }
  });

  async function toggleThematiquesMenu() {
    menuThematiqueOuvert.value = !menuThematiqueOuvert.value;

    if (menuThematiqueOuvert.value) {
      await nextTick();
      menuThematique.value?.querySelector<HTMLInputElement>('input')?.focus();
    }
  }

  function fermerMenu() {
    menuThematiqueOuvert.value = false;
    boutonThematique.value?.focus();
  }

  function gererClicEnDehors(event: MouseEvent | FocusEvent) {
    if (!menuThematiqueOuvert.value) return;

    const target = event.target as Node;
    if (
      menuThematique.value &&
      boutonThematique.value &&
      !menuThematique.value.contains(target) &&
      !boutonThematique.value.contains(target)
    ) {
      menuThematiqueOuvert.value = false;
    }
  }

  onMounted(() => {
    document.addEventListener('mousedown', gererClicEnDehors);
    document.addEventListener('focusin', gererClicEnDehors);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', gererClicEnDehors);
    document.removeEventListener('focusin', gererClicEnDehors);
  });
</script>

<style scoped>
  .popup-filtre-thematique {
    position: absolute;
    z-index: 501;
    width: inherit;
  }
</style>
