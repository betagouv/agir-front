<template>
  <h3>📒 {{ empreinteViewModel?.bilan }}</h3>
  <br>
  <br>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementEmpreinteUsecase } from "@/empreinte/chargementEmpreinte.usecase.ts";
import { EmpreinteRepositoryAxios } from "@/empreinte/adapters/empreinteRepository.axios.ts";
import { ChargementEmpreintePresenterImpl, EmpreinteViewModel } from "@/empreinte/adapters/chargementEmpreinte.presenter.impl.ts";
//import {useRoute} from "vue-router";
import store from "@/store";
import {EvaluerEmpreinteUsecase} from "@/empreinte/evaluerEmpreinte.usecase.ts";
import {EvaluerEmpreintePresenterImpl, EvaluerEmpreinteViewModel} from "@/empreinte/adapters/evaluerEmpreinte.presenter.impl.ts";

export default defineComponent({
  name: "Empreinte",
  setup() {

    const empreinteViewModel = ref<EmpreinteViewModel>()

    /*function mapValuesEvaluer(viewModel: EvaluerEmpreinteViewModel) {
      console.log(viewModel);
    }*/
    function mapValueBilan(viewModel: EmpreinteViewModel) {
      empreinteViewModel.value = viewModel;
    }

    const empreinteRepositoryAxios = new EmpreinteRepositoryAxios();

    const chargementEmpreinte = () => {
      const chargementEmpreinteUsecase = new ChargementEmpreinteUsecase(empreinteRepositoryAxios)
      chargementEmpreinteUsecase.execute('Denis', new ChargementEmpreintePresenterImpl(mapValueBilan))
    }

    onMounted(chargementEmpreinte);

    /*const evaluerEmpreinte = () => {
      const username = store.getters["utilisateur/getUtilisateur"];
      const evaluerEmpreinteUsecase = new EvaluerEmpreinteUsecase(empreinteRepositoryAxios)
      evaluerEmpreinteUsecase.execute(username,'', new EvaluerEmpreintePresenterImpl(mapValuesEvaluer))
    };
    function handleReponse(event) {
      const reponse = event.target.value;
      console.log(event.target);
      checkedResponses.set(idQuestion, reponse)
      console.log(checkedResponses);
    }*/

    return {
      empreinteViewModel,
      //evaluerEmpreinte,
      //handleReponse
    }
  },

})
</script>

<style scoped>
.quiz-question-container {
  width: 100%;
}

</style>