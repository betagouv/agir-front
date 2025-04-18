<template>
  <label :class="`fr-label ${label.cssModifier}`" :for="id">
    {{ label.wording }}
    <span class="fr-hint-text">Nombre uniquement</span>
  </label>
  <span v-if="unite" id="unite" class="fr-hint-text fr-sr-only">
    exprimé en {{ unite.libelleLong ?? unite.abreviation }}</span
  >
  <div class="flex align-items--center">
    <input
      :id="id"
      v-model="internalValue"
      :name="id"
      aria-describedby="unite"
      class="fr-input fr-col-8 fr-col-md-3"
      inputmode="numeric"
      pattern="[0-9]*"
      type="text"
    />
    <div v-if="unite">
      <span class="fr-ml-1w">
        {{ unite.abreviation }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch } from 'vue';

  const props = defineProps<{
    id: string;
    label: { wording: string; cssModifier?: string };
    defaultValue?: string;
    unite?: { abreviation: string; libelleLong: string };
    modelValue: string | undefined;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const internalValue = ref(props.defaultValue || '');

  watch(internalValue, newValue => {
    emit('update:modelValue', newValue);
  });
</script>
