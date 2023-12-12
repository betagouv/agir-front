<template>
  <div class="fr-container fr-py-6w">
    <div class="background--white border border-radius--md fr-col-lg-6 fr-p-3w fr-mx-auto">
      <h1>👋 Bonjour et bienvenue !</h1>
      <h2 class="fr-h4">Obtenez une 1ère estimation de votre impact en moins d’1 minute !</h2>
      <p>
        Pour pouvoir vous accompagner, commençons par un tour d’horizon des usages qui ont un fort impact
        environnemental.<br />
        C’est une estimation très large que nous aurons l’occasion d’affiner plus tard.<br />
        Mais il faut bien commencer quelque part !
      </p>
      <router-link :to="{ name: 'onboarding' }" class="fr-btn fr-btn--lg">Commencer l'estimation</router-link>
    </div>
  </div>
</template>
