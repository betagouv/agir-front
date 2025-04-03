<template>
  <fieldset class="fr-fieldset">
    <legend
      class="fr-fieldset__legend--regular fr-fieldset__legend"
      v-text="legend"
      :title="`${legend}, notation sur ${total} étoiles`"
    />

    <div class="fr-fieldset__element fr-fieldset__element--inline" v-for="index in total" :key="index">
      <input
        type="radio"
        name="rating"
        :value="index"
        :id="`rating${index}`"
        :aria-label="`${index} étoile(s)`"
        @change.prevent="modifierNote(index)"
        @focus="setFocus(index)"
        @blur="unsetFocus()"
        class="fr-sr-only"
      />
      <label :for="`rating${index}`" aria-hidden="true" :class="etoileFocalise === index ? 'outline' : ''">
        <span
          class="fr-icon-star-fill text--bleu"
          :class="index > notation ? 'fr-icon-star-line text--gris' : 'fr-icon-star-fill text--bleu'"
        />
      </label>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  import { ref } from 'vue';

  defineProps<{
    legend: string;
    total: number;
  }>();

  const notation = defineModel<number>('notation', { default: 0 });
  const etoileFocalise = ref<number | null>(notation.value ?? 0);

  function modifierNote(note: number) {
    notation.value = note;
  }

  function setFocus(index: number) {
    etoileFocalise.value = index;
  }

  function unsetFocus() {
    etoileFocalise.value = null;
  }
</script>
