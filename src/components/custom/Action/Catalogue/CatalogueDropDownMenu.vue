<template>
  <button
    :role="!isButtonMenuItem ? 'button' : 'menuitem'"
    ref="boutonRef"
    type="button"
    :id="`menu-${id}-bouton`"
    aria-haspopup="true"
    :aria-expanded="menuOuvert"
    :aria-controls="`menu-${id}`"
    @click="toggleMenu"
    @keydown.down.prevent="toggleMenu"
    class="position--relative text--left full-width flex flex-space-between align-items--center fr-p-1w"
  >
    <slot name="bouton-contenu" :menu-ouvert="menuOuvert" />

    <span
      class="text--bleu"
      :class="{
        'fr-icon-arrow-down-s-line': !menuOuvert,
        'fr-icon-arrow-up-s-line': menuOuvert,
      }"
    />
  </button>

  <div
    :id="`menu-${id}`"
    ref="menuRef"
    v-show="menuOuvert"
    role="menu"
    tabindex="-1"
    :aria-labelledby="`menu-${id}-bouton`"
    class="dropdown-menu shadow background--white fr-p-2w flex"
    @keyup.esc="fermerMenuEtFocusBouton"
  >
    <slot name="menu-contenu" />
  </div>
</template>

<script setup lang="ts">
  import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue';

  defineProps<{ id: string; isButtonMenuItem?: boolean }>();

  const menuRef = ref<HTMLDivElement>();
  const boutonRef = ref<HTMLButtonElement>();
  const menuOuvert = ref<boolean>(false);

  onMounted(() => {
    document.addEventListener('mousedown', gererClicEnDehors);
    document.addEventListener('focusin', gererClicEnDehors);
  });

  onBeforeUnmount(() => {
    document.removeEventListener('mousedown', gererClicEnDehors);
    document.removeEventListener('focusin', gererClicEnDehors);
  });

  function gererClicEnDehors(event: MouseEvent | FocusEvent) {
    if (!menuOuvert.value) return;

    const target = event.target as Node;
    if (menuRef.value && boutonRef.value && !menuRef.value.contains(target) && !boutonRef.value.contains(target)) {
      menuOuvert.value = false;
    }
  }

  async function toggleMenu() {
    menuOuvert.value = !menuOuvert.value;

    if (menuOuvert.value) {
      await nextTick();
      menuRef.value?.querySelector<HTMLElement>('input,button,a')?.focus();
    }
  }

  function fermerMenuEtFocusBouton() {
    menuOuvert.value = false;
    boutonRef.value?.focus();
  }
</script>

<style scoped>
  .dropdown-menu {
    position: absolute;
    z-index: 501;
    width: inherit;
  }
</style>
