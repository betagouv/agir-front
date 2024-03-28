<template>
  <div :class="`fr-table ${tableauDoubleLegende && 'tableauDoubleLegende'}`">
    <table>
      <caption :class="titreStyle">
        {{
          titre
        }}
      </caption>
      <thead>
        <tr>
          <th v-for="titreColonne in titresDonnees" :key="titreColonne" scope="col">{{ titreColonne }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(donnee, index) in donnees" :key="index">
          <td v-for="(data, index2) in donnee" :key="index2">
            {{ data }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import '@gouvfr/dsfr/dist/component/table/table.min.css';

  defineProps<{
    titre: string;
    titresDonnees: string[];
    donnees: (string | number)[][];
    tableauDoubleLegende?: boolean;
    titreStyle?: string;
  }>();
</script>

<style scoped>
  .tableauDoubleLegende td:first-child {
    font-weight: 700;
  }
</style>
