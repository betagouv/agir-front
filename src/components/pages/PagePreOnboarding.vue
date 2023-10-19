<template>
  <div class="fr-container">
    <div class="background--white border border-radius--md fr-col-lg-6 fr-p-3w fr-mx-auto">
      <h1>👋 Bonjour et bienvenue !</h1>
      <h2 class="fr-h4">Obtenez une 1ère estimation de votre impact en moins d’1 minute !</h2>
      <p>
        Pour pouvoir vous accompagner, commençons par un tour d’horizon des usages qui ont un fort impact
        environnemental.<br />
        C’est une estimation très large que nous aurons l’occasion d’affiner plus tard.<br />
        Mais il faut bien commencer quelque part !
      </p>
      <router-link :to="{ name: 'onboarding' }" class="fr-btn fr-mb-2w">Commencer l'estimation</router-link>
      <p class="fr-text--sm fr-mb-0">
        Vous avez déjà fait une simulation sur <img src="/logo_ngc.png" alt="Nos gestes climat" />
      </p>
      <a
        href="https://nosgestesclimat.fr/"
        target="_blank"
        class="fr-link fr-text--sm"
        rel="noopener"
        title="Site Nos Gestes Climat - ouvre une nouvelle fenêtre"
      >
        Récupérez mes réponses depuis <strong>Nos Gestes Climat</strong> pour gagner du temps
      </a>
    </div>
  </div>
</template>
