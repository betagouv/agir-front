<template>
  <fieldset class="fr-fieldset" :id="id" :aria-labelledby="`${id}-checkboxes-legend`">
    <legend class="fr-fieldset__legend--regular fr-fieldset__legend text--bold" :id="`${id}-checkboxes-legend`">
      {{ label }}
    </legend>
    <div class="fr-fieldset__element" v-for="option in options" :key="option.id">
      <div class="fr-checkbox-group">
        <input
          :name="option.id"
          :id="option.id"
          type="checkbox"
          @change.prevent="onInputChange"
          :checked="option.checked"
        />
        <label class="fr-label" :for="option.id" v-html="cacherEmojisAuxLecteursDecrans(option.label)" />
      </div>
    </div>
  </fieldset>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import cacherEmojisAuxLecteursDecrans from '@/shell/cacherEmojisAuxLecteursDecrans';

  const props = defineProps<{
    id: string;
    label: string;
    options: {
      id: string;
      label: string;
      checked?: boolean;
    }[];
  }>();

  const emit = defineEmits<{ (event: 'update', optionsSelectionnees: string[]): void }>();

  const optionsSelectionnees = ref<string[]>([]);

  onMounted(() => {
    optionsSelectionnees.value = props.options.filter(({ checked }) => checked).map(({ id }) => id);
  });

  const onInputChange = (event: Event) => {
    const { name, checked } = event.target as HTMLInputElement;

    if (checked) {
      optionsSelectionnees.value.push(name);
    } else {
      const index = optionsSelectionnees.value.indexOf(name);
      if (index > -1) {
        optionsSelectionnees.value.splice(index, 1);
      }
    }

    emit('update', optionsSelectionnees.value);
  };
</script>
