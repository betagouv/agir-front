<template>
  <fieldset class="mosaic fr-mb-2w">
    <legend class="fr-h4">{{ legende }}</legend>
    <div class="fr-grid-row fr-grid-row--gutters">
      <label v-for="option in localOptions" :key="option.label" class="fr-col-6 fr-col-md-3 position--relative">
        <input
          :id="`${option.value}-${name}`"
          :checked="option.checked"
          :name="name"
          :value="option.value"
          type="checkbox"
          @change="updateValue($event, option)"
        />
        <img
          alt=""
          aria-hidden="true"
          class="text--bleu mosaic__checkbox"
          :src="option.checked ? '/ic-check-mosaic.svg' : '/ic-unchecked-mosaic.svg'"
        />

        <span class="mosaic__label border">
          <span class="text--3xl fr-mb-1w" v-if="option.emoji" aria-hidden="true">{{ option.emoji }}</span>
          {{ option.label }}
        </span>
      </label>
    </div>
  </fieldset>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  interface Option {
    label: string;
    value: string | boolean;
    checked?: boolean;
    emoji?: string;
    picto?: string;
  }
  const props = defineProps<{
    legende: string;
    name: string;
    options: Option[];
  }>();

  const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>();

  const checkedNames = ref<Set<string>>(
    new Set(props.options.filter(option => option.checked).map(option => String(option.value))),
  );

  const localOptions = ref(props.options.map(opt => ({ ...opt })));

  const updateValue = (event: Event, option: Option) => {
    const input = event.target as HTMLInputElement;
    option.checked = input.checked;

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
    border: 2px solid var(--blue-france-sun-113-625);
    background-color: #f9f9ff;
  }

  .mosaic__checkbox {
    display: block;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    height: 1.25rem;
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
