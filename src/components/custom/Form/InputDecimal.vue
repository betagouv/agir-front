<template>
  <div class="fr-mb-1w">
    <label :class="`fr-label fr-mb-1v ${label.cssModifier}`" :for="id">
      {{ label.wording }}
    </label>
    <span v-if="description" id="description" v-text="description" class="fr-mb-1w display-block fr-text--sm" />
    <span id="input-format" class="fr-hint-text text--bold">Nombre uniquement (décimales autorisées)</span>
  </div>

  <slot name="complement" />
  <span v-if="unite" id="unite" class="fr-sr-only"> exprimé en {{ unite.libelleLong ?? unite.abreviation }}</span>

  <div class="flex align-items--center">
    <input
      :id="id"
      v-model="internalValue"
      :name="id"
      :aria-describedby="getAriaDescribedBy"
      class="fr-input fr-col-8 fr-col-md-3"
      inputmode="decimal"
      step="0.01"
      type="number"
    />
    <div v-if="unite">
      <span class="fr-ml-1w">
        {{ unite.abreviation }}
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, watch } from 'vue';

  const props = defineProps<{
    id: string;
    label: { wording: string; cssModifier?: string };
    defaultValue?: string;
    unite?: { abreviation: string; libelleLong: string };
    modelValue: string | undefined;
    description?: string;
  }>();

  const emit = defineEmits<{
    (e: 'update:modelValue', value: string): void;
  }>();

  const getAriaDescribedBy = computed(() => {
    const describedBy = ['input-format'];
    if (props.description) describedBy.push('description');
    if (props.unite) describedBy.push('unite');
    return describedBy.join(' ');
  });

  const internalValue = ref(props.defaultValue || '');

  watch(internalValue, newValue => {
    emit('update:modelValue', newValue.toString() as string);
  });
</script>
