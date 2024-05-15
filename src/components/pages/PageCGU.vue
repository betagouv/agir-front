<template>
  <PageConformite :type="PageConformiteType.CGU" />
</template>
<script setup>
  import PageConformite from '@/components/custom/PageConformite/PageConformite.vue';
  import { PageConformiteType } from '@/domaines/conformites/recupererPageConformite.usecase.ts';
</script>
