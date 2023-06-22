<template>
  <div v-if="!isLoading" class="fr-grid-row fr-grid-row--gutters dashboard-container">
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3" v-for="item in compteurViewModel" :key="item.titre">
      <Compteur :compteur-view-model="item" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3" v-for="item in quizViewModel" :key="item.id">
      <QuizCarte :quiz-view-model="item" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3" v-for="item in badgeViewModel" :key="item.titre">
      <BadgeCarte :badge-view-model="item" />
    </div>
    <div class="fr-col-12 fr-col-md-4 fr-col-lg-3">
      <div class="fr-tile fr-enlarge-link fr-tile--horizontal fr-tile--vertical-md dashboard-card-item" id="tile-6538">
        <div class="fr-tile__body card-item-container">
          <h3 class="fr-tile__desc">Mon empreinte carbone</h3>
          <div class="fr-tile__desc">
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAADpElEQVR4nO2ZW4hOURTHf+M2aVwaRXJLEUJeJHlh3O9EeOJFknvJGFFKiiKEXBLKJU9CRIlQDA9yl9yl5F6j3EZuozXWqe043+dc9vc5H/tX/5rOWbP3Xuusc9be6wOHw+FwOBwOh8PhcCSiGBgErAbOAw+B90A18AKoBDYCw4AG/EM0ASqA50BNSL0ClgJNKXBGAS8jOO7XM2AiBUgdTefvCZw3tR6oSwE5v8uS46b2BQRhgAbnqmbaZ82aS8A6oJ+uJ69szIHznjboHEOAayH/54ra5+2d/57DAIiOx5xDglcvl8431nJWk2IdyWUQKlLgYBjJN8M6DSLW+b8t2ZBZZWAKnIqia7arw6oUOBVVfW0GoDvQDWgOlAAdgQUpcDKb1pJjtqbAyWy6aNvhusBwYAVwEviUAiez6anN095i4HEKnIqiL7Z2fk9iLuCN9gBEr0Mekc9qL+FDzDkfAEuA3kCzJI4X6dYyziJk8XO0QWK+PhPUSb99FTDZdxAq0X7B1wjzTrNV+uoBu2M6/007PpnoDLw17KVb1DOL/dQIc8/FEmsTvHfbjXH6AAeAg0ZQOgE3DPvlhv1MzYZHesz1OBFhfmnB3dEDlWRh26jOj0542uuh43QFPvoyY6+vcsi1lmo/wjevONJG741NsB55hXYArcM4X5KwvSX/67ElhP0tw/50wP2Veq/UwhFcXrsxfwrAwoSTXDDGqgxhf8ywN78LniT1PaoSrs3LuHmZnK+f8OmLThnj3Qxhv19tizM8Yen0eMQtxUFBCMyE/hYGl76dx7EQ9rKb9HgWcF8+nh7vjOsvNFtHAjP094eor0MrfwBWWwhAtVH7p4ewl/6Cx44MdV1o77su1cX7ZgldYnwjzGpVyzlLKTbu53C1gThlXJcULg/YCPVS+w6+e5eNYM4KyJxN+vcytXkaozp4VaaW+5YCcNnoyUkXaRIwxfgFqIXvTHHYWIM8yW3aeyg1Ank3w1yftEQWa9mMutbZZHjHkmqzbqWDmB9gL73GIIo0VYPmqNRNFXo6jbNOswpZDYDoDDBUn3xT7c4cyGJ/CCjTzrOcPgfrGEG25zW7GgF7EqxRdozWX4F8SILTELiecBypBtY/gvlQqW5tFxkKOmX+SZL1Bdn0DOJ2jHHumQOUpcCxfOuofyuc9p+9bOu3/kF5ChaVL8nP7O1sH4cLSTtz1RCpKQC9CXr6JmtSsMhcavwv3jocDofD4XA4HA7+R34ALZiWih+IJQYAAAAASUVORK5CYII="
              alt="impact-logo"
            />
          </div>
          <br />
          <h4 class="fr-tile__title">{{ getImpactValue || "N/A" }}</h4>
        </div>
      </div>
    </div>
  </div>
  <div v-else v-for="element in 5" class="fr-grid-row fr-grid-row--gutters dashboard-container">
    <CarteSkeleton />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { ChargementDashboardUsecase } from "@/dashboard/chargementDashboard.usecase";
import { ChargementDashboardPresenterImpl } from "@/dashboard/adapters/chargementDashboard.presenter.impl";
import { DashboardRepositoryAxios } from "@/dashboard/adapters/dashboardRepository.axios";
import { BadgeViewModel, CompteurViewModel, DashboardViewModel, QuizzViewModel, EmpreinteViewModel } from "@/dashboard/ports/chargementDashboard.presenter";
import Compteur from "@/components/Compteur.vue";
import QuizCarte from "@/components/QuizCarte.vue";
import BadgeCarte from "@/components/BadgeCarte.vue";
import store from "@/store";
import Quizz from "@/components/Quiz.vue";
import CarteSkeleton from "@/components/CarteSkeleton.vue";

export default defineComponent({
  name: "Dashboard",
  components: { CarteSkeleton, Quizz, BadgeCarte, QuizCarte, Compteur },
  computed: {
    getImpactValue() {
      if (this.empreinteViewModel) {
        return parseFloat(this.empreinteViewModel.bilan).toFixed(2);
      }
    },
  },
  setup() {
    const utilisateur = ref<string>();
    const compteurViewModel = ref<CompteurViewModel[]>();
    const badgeViewModel = ref<BadgeViewModel[]>();
    const quizViewModel = ref<QuizzViewModel[]>();
    const empreinteViewModel = ref<EmpreinteViewModel>();
    const isLoading = ref<boolean>(true);
    function mapValues(dashboardViewModel: DashboardViewModel) {
      utilisateur.value = dashboardViewModel.utilisateur;
      compteurViewModel.value = dashboardViewModel.compteurs;
      badgeViewModel.value = dashboardViewModel.badges;
      quizViewModel.value = dashboardViewModel.quizz;
      quizViewModel.value = dashboardViewModel.quizz;
      empreinteViewModel.value = dashboardViewModel.empreinte;
      isLoading.value = false;
    }

    const updateConsumptionValue = async () => {
      isLoading.value = true;
      const chargementDashboardUsecase = new ChargementDashboardUsecase(new DashboardRepositoryAxios());
      const username = store.getters["utilisateur/getUtilisateur"];
      await chargementDashboardUsecase.execute(username, new ChargementDashboardPresenterImpl(mapValues));
    };

    onMounted(updateConsumptionValue);

    return {
      isLoading,
      utilisateur,
      badgeViewModel,
      quizViewModel,
      compteurViewModel,
      empreinteViewModel,
    };
  },
});
</script>

<style scoped>
h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

h3 {
  font-size: 18px;
  margin-right: 10px;
}

p {
  font-size: 24px;
  font-weight: bold;
  position: relative;
}

.dashboard-container {
  margin: 20px;
}

/* Disposition des éléments du dashboard sur les écrans de petite taille */
@media only screen and (max-width: 950px) {
  .dashboard-container {
    margin: 5px;
  }
}

.card-item-container {
  align-items: center;
  text-align: center;
}

.dashboard-card-item {
  border: 2px solid black;
  border-radius: 2px;
}

.fr-tile {
  box-shadow: unset;
}
</style>
