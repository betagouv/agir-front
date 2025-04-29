<template>
  <fieldset class="mosaic fr-mb-2w">
    <legend class="fr-h4">{{ legende }}</legend>
    <div class="fr-grid-row fr-grid-row--gutters">
      <label v-for="option in options" :key="option.label" class="fr-col-6 fr-col-md-3 position--relative">
        <input
          :id="`${option.value}-${name}`"
          :checked="option.checked"
          :name="name"
          :value="option.value"
          type="checkbox"
          @change="updateValue($event)"
        />
        <img
          alt=""
          aria-hidden="true"
          class="fr-icon-checkbox-circle-fill text--bleu mosaic__checkbox"
          src="/ic-check-mosaic.svg"
        />
        <span class="mosaic__label border">
          <span v-if="option.emoji" aria-hidden="true">{{ option.emoji }}</span>
          {{ option.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const props = defineProps<{
    legende: string;
    name: string;
    options: { label: string; value: string | boolean; checked?: boolean; emoji?: string; picto?: string }[];
  }>();

  const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>();

  const checkedNames = ref<Set<string>>(
    new Set(props.options.filter(option => option.checked).map(option => String(option.value))),
  );

  const updateValue = (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (input.checked) {
      checkedNames.value.add(input.value);
    } else {
      checkedNames.value.delete(input.value);
    }

    emit('update:modelValue', Array.from(checkedNames.value));
  };
</script>

<style scoped>
  .mosaic {
    padding: 0;
    margin: 0;
    border: 0;
  }

  input[type='checkbox'] {
    position: absolute;
    opacity: 0;
  }

  .mosaic__label {
    cursor: pointer;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    text-align: center;
  }

  .mosaic__label:hover {
    font-weight: 700;
    color: var(--blue-france-sun-113-625);
    background-color: #f7f8f8;
  }

  input[type='checkbox']:checked ~ .mosaic__label {
    font-weight: 700;
    color: var(--blue-france-sun-113-625);
    border: 3px solid var(--blue-france-sun-113-625);
    background-color: #f7f8f8;
  }

  .mosaic__checkbox {
    display: none;
  }

  input[type='checkbox']:checked ~ .mosaic__checkbox {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    height: 1.5rem;
  }

  label {
    display: flex;
    flex-direction: column;
  }

  label > .mosaic__label {
    outline: 0 solid #0a76f6;
  }

  label:focus-within > .mosaic__label {
    outline-width: 2px;
  }

  label:not(:has(:focus-visible)) > .mosaic__label {
    outline-width: 0;
  }
</style>
