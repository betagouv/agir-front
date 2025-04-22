import { onMounted, Ref, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Coordonnees } from '@/shell/coordonneesType';

export function useRechercheLieuService(
  lancerUsecase: (limit: number) => Promise<void>,
  coordonnees: Ref<Coordonnees | undefined>,
) {
  const route = useRoute();
  const router = useRouter();
  const pageEstEnChargement = ref<boolean>(true);
  const cartesSontEnChargement = ref<boolean>(false);
  let nombreMaxResultats = 9;

  async function lancerLaRecherche() {
    await lancerUsecase(nombreMaxResultats);
  }

  onMounted(async () => {
    const lat = parseFloat(route.query.latitude as string);
    const lng = parseFloat(route.query.longitude as string);
    if (!isNaN(lat) && !isNaN(lng)) {
      coordonnees.value = { latitude: lat, longitude: lng };
    } else {
      await lancerLaRecherche();
    }
    pageEstEnChargement.value = false;
  });

  watch(coordonnees, async nouvelleCoordonnees => {
    cartesSontEnChargement.value = true;
    nombreMaxResultats = 9;
    await router.push({
      query: {
        ...route.query,
        latitude: nouvelleCoordonnees?.latitude.toString(),
        longitude: nouvelleCoordonnees?.longitude.toString(),
      },
    });
    await lancerLaRecherche();
    cartesSontEnChargement.value = false;
  });

  watch(
    () => route.query.latitude && route.query.longitude,
    () => {
      const lat = parseFloat(route.query.latitude as string);
      const lng = parseFloat(route.query.longitude as string);
      if (isNaN(lat) || isNaN(lng)) {
        coordonnees.value = undefined;
        return;
      }

      if (lat === coordonnees.value?.latitude && lng === coordonnees.value?.longitude) {
        return;
      }
      coordonnees.value = { latitude: lat, longitude: lng };
    },
  );

  const chargerPlusDeResultats = async () => {
    cartesSontEnChargement.value = true;
    nombreMaxResultats += 9;
    await lancerLaRecherche();
    cartesSontEnChargement.value = false;
  };

  const resetNombreDeResultats = () => {
    nombreMaxResultats = 9;
  };

  return {
    chargerPlusDeResultats,
    resetNombreDeResultats,
    lancerLaRecherche,
    pageEstEnChargement,
    cartesSontEnChargement,
  };
}
