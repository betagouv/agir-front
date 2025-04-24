import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCoordonneesQueryParams } from '@/composables/useCoordonneesQueryParams';
import { Coordonnees } from '@/shell/coordonneesType';

export function useRechercheService(lancerRecherche: () => Promise<void>, typeParDefaut: string) {
  const route = useRoute();
  const router = useRouter();
  const serviceErreur = ref<string | null>(null);
  const pageEstEnChargement = ref<boolean>(false);
  const cartesSontEnChargement = ref<boolean>(false);

  const adresseDepuisQueryParams = route.query.adresse as string;
  const latDepuisQueryParams = parseFloat(route.query.latitude as string);
  const lngDepuisQueryParams = parseFloat(route.query.longitude as string);
  const coordonnesDepuisQueryParams: Coordonnees | undefined =
    !isNaN(latDepuisQueryParams) && !isNaN(lngDepuisQueryParams)
      ? { latitude: latDepuisQueryParams, longitude: lngDepuisQueryParams }
      : undefined;
  const typeDepuisQueryParams: string = route.query?.type as string;
  const nombreDeResultatsDepuisQueryParams: number = parseInt(route.query?.nombre as string);

  const recherche = ref<string>(adresseDepuisQueryParams ?? '');
  const coordonnees = ref<Coordonnees | undefined>(coordonnesDepuisQueryParams);
  const typeDeRecherche = ref<string>(typeDepuisQueryParams ?? typeParDefaut);
  const nombreDeResultats = ref<number>(
    isNaN(nombreDeResultatsDepuisQueryParams) ? 9 : nombreDeResultatsDepuisQueryParams,
  );

  useCoordonneesQueryParams(coordonnees, recherche);

  onMounted(async () => {
    pageEstEnChargement.value = true;
    await lancerRecherche();
    pageEstEnChargement.value = false;
  });

  watch(
    () => coordonnees.value,
    async () => {
      cartesSontEnChargement.value = true;
      await lancerRecherche();
      cartesSontEnChargement.value = false;
    },
  );

  const chargerPlusDeCartes = async () => {
    cartesSontEnChargement.value = true;

    nombreDeResultats.value += 9;
    await router.replace({
      name: route.name,
      query: { ...route.query, nombre: nombreDeResultats.value },
    });
    await lancerRecherche();

    cartesSontEnChargement.value = false;
  };

  const modifierType = async (type: string) => {
    cartesSontEnChargement.value = true;
    nombreDeResultats.value = 9;

    typeDeRecherche.value = type;
    await router.replace({
      name: route.name,
      query: { ...route.query, nombre: nombreDeResultats.value, type },
    });
    await lancerRecherche();

    cartesSontEnChargement.value = false;
  };

  return {
    recherche,
    typeDeRecherche,
    coordonnees,
    nombreDeResultats,
    chargerPlusDeCartes,
    modifierType,
    serviceErreur,
    pageEstEnChargement,
    cartesSontEnChargement,
  };
}
