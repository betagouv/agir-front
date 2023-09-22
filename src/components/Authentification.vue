<template>
  <form class="fr-col-12 fr-col-lg-6 fr-mx-auto fr-mb-0 background--white fr-p-4w border border-radius--md" @submit.prevent="login">
    <fieldset class="fr-mb-0 fr-fieldset">
      <legend class="fr-fieldset__legend fr-px-0 fr-mx-0 text--center" id="identity-fieldset-legend">
        <h2>Utilisez FranceConnect pour vous connecter ou créer votre compte</h2>
      </legend>
      <p>FranceConnect est la solution proposée par l’État pour sécuriser et simplifier la connexion aux services en ligne.</p>
      <div class="fr-col-12 text--center">
        <BoutonFranceConnect />
      </div>
      <div class="separateur fr-mb-2v">ou</div>
      <div class="fr-col-12">
        <h2 class="text--center">Vous avez déjà un compte</h2>
        <fieldset class="fr-fieldset">
          <div class="fr-fieldset__element">
            <div class="fr-input-group">
              <label class="fr-label" for="user-name-1829"> Nom d'utilisateur </label>
              <input class="fr-input" spellcheck="false" autocomplete="user-name" name="user-name" id="user-name-1829" type="text" v-model="username" />
            </div>
          </div>
        </fieldset>
        <button class="fr-btn display-block text--center full-width" type="submit">Se connecter</button>
      </div>
      <div class="fr-col-12">
        <div class="separateur--full fr-mt-4w"></div>
        <h2 class="text--center fr-mt-6w">Première visite ?</h2>
        <ul class="fr-btns-group">
          <li>
            <button class="fr-btn fr-btn--secondary" @click="goToCreerUnCompte">Créer un compte</button>
          </li>
        </ul>
      </div>
    </fieldset>
  </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import { AuthentifierUtilisateurUsecase } from "@/authentification/authentifierUtilisateur.usecase";
import { UtilisateurRepositoryAxios } from "@/authentification/adapters/utilisateur.repository.axios";
import { SessionRepositoryStore } from "@/authentification/adapters/session.repository.store";
import { sendIdNGC } from "@/bilan/middleware/pendingSimulation";
import BoutonFranceConnect from "@/components/BoutonFranceConnect.vue";

export default defineComponent({
  components: { BoutonFranceConnect },
  setup() {
    const username = ref("");
    const error = ref("");
    const login = async () => {
      const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios(), new SessionRepositoryStore());
      usecase.execute(username.value).then(() => {
        const requestedRoute = sessionStorage.getItem("requestedRoute");
        sessionStorage.removeItem("requestedRoute");
        router.push(requestedRoute || { name: "coach", state: { utilisateur: username.value } });
        sendIdNGC();
      });
    };

    const goToCreerUnCompte = async () => {
      await router.push({ name: "creation-compte" });
    };

    return {
      username,
      error,
      login,
      goToCreerUnCompte,
    };
  },
});
</script>

<style scoped>
.separateur {
  position: relative;
  text-align: center;
  width: 100%;

  &&:before,
  &&:after {
    content: "";
    position: absolute;
    height: 1px;
    width: 45%;
    background-color: #dddddd;
    top: 50%;
  }

  &&:before {
    left: 0;
  }

  &&:after {
    right: 0;
  }
}

.separateur--full {
  position: relative;
  text-align: center;
  width: 100%;

  &&:before,
  &&:after {
    content: "";
    position: absolute;
    height: 1px;
    width: 100%;
    background-color: #dddddd;
    top: 50%;
  }

  &&:before {
    left: 0;
  }

  &&:after {
    right: 0;
  }
}
</style>
