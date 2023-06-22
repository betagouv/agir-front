<template>
  <h3>📒 {{ empreinteViewModel?.bilan }}</h3>
  <br>
  <br>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementEmpreinteUsecase } from "@/empreinte/chargementEmpreinte.usecase";
import { EmpreinteRepositoryAxios } from "@/empreinte/adapters/empreinteRepository.axios";
import { ChargementEmpreintePresenterImpl, EmpreinteViewModel } from "@/empreinte/adapters/chargementEmpreinte.presenter.impl";
import store from "@/store";

export default defineComponent({
  name: "Empreinte",
  setup() {

    const empreinteViewModel = ref<EmpreinteViewModel>()

    function mapValueBilan(viewModel: EmpreinteViewModel) {
      empreinteViewModel.value = viewModel;
    }

    const empreinteRepositoryAxios = new EmpreinteRepositoryAxios();

    const chargementEmpreinte = () => {
      const username = store.getters["utilisateur/getUtilisateur"];
      const chargementEmpreinteUsecase = new ChargementEmpreinteUsecase(empreinteRepositoryAxios)
      chargementEmpreinteUsecase.execute(username, new ChargementEmpreintePresenterImpl(mapValueBilan))
    }

    onMounted(chargementEmpreinte);

    return {
      empreinteViewModel,
    }
  },

})
</script>

<style scoped>

</style>