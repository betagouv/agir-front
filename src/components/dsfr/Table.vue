<template>
  <div class="fr-table">
    <table>
      <caption>{{ titre }}</caption>
      <thead>
        <tr>
          <th v-for="(titreColonne) in titresDonnees" :key="titreColonne" scope="col">{{ titreColonne }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(donnee, index) in donnees" :key="index">
          <td v-for="(data, index2) in donnee" :key="index2">
            {{data}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  defineProps<{
    titre: string
    titresDonnees: string[]
    donnees: (string | number)[][]
  }>();
</script>
