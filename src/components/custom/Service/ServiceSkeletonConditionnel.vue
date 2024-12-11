<template>
  <ServiceSkeleton v-if="isLoading" />
  <slot v-else-if="viewModelExiste" />
  <p v-else>
    {{
      messageErreur
        ? messageErreur
        : 'Le service prend plus de temps que prévu à répondre. Merci de recharger la page ou réessayer plus tard.'
    }}
  </p>
</template>

<script setup lang="ts">
  import ServiceSkeleton from '@/components/custom/Service/ServiceSkeleton.vue';

  defineProps<{ viewModelExiste: boolean; isLoading: boolean; messageErreur?: string | null }>();
</script>
