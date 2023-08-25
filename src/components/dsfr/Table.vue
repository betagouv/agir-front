<template lang="">
  <div class="fr-table">
    <p>{{ toto }}</p>
    <table>
      <caption>Résumé du tableau (accessibilité)</caption>
      <thead>
        <tr>
          <th scope="col">Titre</th>
          <th scope="col">Titre</th>
          <th scope="col">Titre</th>
          <th scope="col">Titre</th>
          <th scope="col">Titre</th>
        </tr>
      </thead>
        <tbody>
            <tr>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
            </tr>
            <tr>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
            </tr>
            <tr>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
            </tr>
            <tr>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
            </tr>
            <tr>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
                <td>Donnée</td>
            </tr>
        </tbody>
    </table>
</div>
</template>

<script setup lang="ts">
  defineProps<{
    toto: unknown
  }>();
</script>