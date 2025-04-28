import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useQueryParamsReplacer } from '@/composables/useQueryParamsReplacer';

export function useTypeQueryParams(lancerRecherche: () => Promise<void>, typeParDefaut: string) {
  const route = useRoute();
  const queryParamsReplacer = useQueryParamsReplacer();

  const pageEstEnChargement = ref(false);
  const cartesSontEnChargement = ref(false);

  const categorie = ref<string>((route.query.type as string) ?? typeParDefaut);
  const nombreDepuisQueryParams = parseInt(route.query.nombre as string);
  const nombreDeResultats = ref<number>(isNaN(nombreDepuisQueryParams) ? 9 : nombreDepuisQueryParams);

  onMounted(async () => {
    pageEstEnChargement.value = true;
    await lancerRecherche();
    pageEstEnChargement.value = false;
  });

  const chargerPlusDeCartes = async () => {
    cartesSontEnChargement.value = true;

    nombreDeResultats.value += 9;
    await queryParamsReplacer({ nombre: nombreDeResultats.value.toString() });
    await lancerRecherche();

    cartesSontEnChargement.value = false;
  };

  const modifierType = async (type: string) => {
    cartesSontEnChargement.value = true;

    categorie.value = type;
    nombreDeResultats.value = 9;

    await queryParamsReplacer({ type, nombre: nombreDeResultats.value.toString() });
    await lancerRecherche();

    cartesSontEnChargement.value = false;
  };

  return {
    categorie,
    nombreDeResultats,
    pageEstEnChargement,
    cartesSontEnChargement,
    chargerPlusDeCartes,
    modifierType,
  };
}
