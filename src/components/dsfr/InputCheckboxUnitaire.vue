<template>
  <div class="fr-checkbox-group fr-checkbox-group--sm">
    <input
      name="checkboxes-hint-el-sm-1"
      id="checkboxes-hint-el-sm-1"
      type="checkbox"
      aria-describedby="checkboxes-hint-el-sm-1-messages"
    />
    <label class="fr-label" for="checkboxes-hint-el-sm-1">
      {{ label }}
      <span v-if="description" class="fr-hint-text">{{ description }}</span>
    </label>
    <div class="fr-messages-group" id="checkboxes-hint-el-sm-1-messages" aria-live="assertive"></div>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    id: string;
    label: string;
    description?: string;
  }>();
</script>
