<template>
  <div class="main-container">
    <div class="fr-container fr-m-auto">
      <div class="fr-grid-row fr-grid-row--gutters fr-grid-row--center fr-grid-row--middle">
        <div class="fr-col-10 fr-col-md-8 login-container fr-p-3w fr-p-md-9w">
          <h1>Agir !</h1>
          <h2>L’accompagnement personnalisé pour réduire votre empreinte écologique</h2>
          <ul>
            <li>Mesurez les impacts de vos usages au quotidien</li>
            <li>Simulez des aides pertinentes adaptées à votre situation</li>
            <li>Testez vos connaissances</li>
          </ul>
          <form id="login-8199" @submit.prevent="login">
            <fieldset id="login-8199-fieldset" class="fr-fieldset">
              <div class="fr-fieldset__element fr-mt-5v">
                <fieldset id="credentials" class="fr-fieldset">
                  <legend id="credentials-legend" class="fr-sr-only">identifiants</legend>
                  <div class="fr-fieldset__element">
                    <label class="fr-label" for="username-8196"> Identifiant </label>
                    <input
                      id="username-8196"
                      v-model="username"
                      aria-required="true"
                      autocapitalize="off"
                      autocomplete="username"
                      autocorrect="off"
                      class="fr-input"
                      name="username"
                      type="text"
                    />
                  </div>
                </fieldset>
              </div>
              <div class="fr-fieldset__element">
                <button id="button-8202" class="fr-btn">Se connecter</button>
              </div>
            </fieldset>
          </form>

          <a href="http://localhost:3000/login" id="france-connect-particulier" class="france-connect-particulier"></a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import router from "@/router";
import { AuthentifierUtilisateurUsecase } from "@/authentification/authentifierUtilisateur.usecase";
import { UtilisateurRepositoryAxios } from "@/authentification/adapters/utilisateur.repository.axios";
import { SessionRepositoryStore } from "@/authentification/adapters/session.repository.store";

export default defineComponent({
  setup() {
    const username = ref("");
    const error = ref("");
    const login = async () => {
      const usecase = new AuthentifierUtilisateurUsecase(new UtilisateurRepositoryAxios(), new SessionRepositoryStore());
      usecase.execute(username.value).then(() => {
        router.push({ name: "coach", state: { utilisateur: username.value } });
      });
    };

    return {
      username,
      error,
      login,
    };
  },
});
</script>

<style scoped>
.login-container {
  box-shadow: 0 6px 18px 0 rgba(0, 0, 18, 0.16);
}

.error {
  color: red;
  margin-top: 10px;
  text-align: center;
}

.main-container {
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 100vh;
  width: 100%;
  background-color: #f7f8f8;
}

.fr-btn {
  width: auto;
}

.france-connect-particulier {
  display: flex;
  background-image: url("/franceconnect-btn.svg") !important;
  background-repeat: no-repeat;
  background-size: 216px 60px;
  width: 216px;
  height: 60px;
  margin: auto auto;
  border: 1px solid #0c419a;
}
</style>
