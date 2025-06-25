import { onMounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useCoordonneesQueryParams } from './useCoordonneesQueryParams';
import { useQueryParamsReplacer } from '@/composables/useQueryParamsReplacer';
import { Coordonnees } from '@/shell/coordonneesType';

export function useRechercheService(lancerRecherche: () => Promise<void>, typeParDefaut: string) {
  const route = useRoute();
  const queryParamsReplacer = useQueryParamsReplacer();

  const serviceErreur = ref<string | null>(null);
  const pageEstEnChargement = ref(false);
  const cartesSontEnChargement = ref(false);

  const recherche = ref('');
  const coordonnees = ref<Coordonnees | undefined>();
  const typeDeRecherche = ref(typeParDefaut);
  const nombreDeResultats = ref(9);

  function initialiserDepuisQuery() {
    recherche.value = (route.query.adresse as string) ?? '';

    const lat = parseFloat(route.query.latitude as string);
    const lng = parseFloat(route.query.longitude as string);
    coordonnees.value = !isNaN(lat) && !isNaN(lng) ? { latitude: lat, longitude: lng } : undefined;

    typeDeRecherche.value = (route.query.type as string) ?? typeParDefaut;

    const nombre = parseInt(route.query.nombre as string);
    nombreDeResultats.value = isNaN(nombre) ? 9 : nombre;
  }

  const chargerPlusDeCartes = async () => {
    cartesSontEnChargement.value = true;

    nombreDeResultats.value += 9;
    await queryParamsReplacer({ nombre: nombreDeResultats.value.toString() });
    await lancerRecherche();

    cartesSontEnChargement.value = false;
  };

  const modifierType = async (type: string) => {
    cartesSontEnChargement.value = true;

    typeDeRecherche.value = type;
    nombreDeResultats.value = 9;

    await queryParamsReplacer({ type, nombre: nombreDeResultats.value.toString() });
    await lancerRecherche();

    cartesSontEnChargement.value = false;
  };

  initialiserDepuisQuery();

  useCoordonneesQueryParams(coordonnees, recherche);

  onMounted(async () => {
    if (!coordonnees.value) {
      pageEstEnChargement.value = true;
      await lancerRecherche();
      pageEstEnChargement.value = false;
    }
  });

  watch(coordonnees, async () => {
    cartesSontEnChargement.value = true;
    await lancerRecherche();
    cartesSontEnChargement.value = false;
  });

  return {
    recherche,
    coordonnees,
    typeDeRecherche,
    nombreDeResultats,
    serviceErreur,
    pageEstEnChargement,
    cartesSontEnChargement,
    chargerPlusDeCartes,
    modifierType,
  };
}
