import { Ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { Coordonnees } from '@/shell/coordonneesType';

export function useCoordonneesQueryParams(coordonnees: Ref<Coordonnees | undefined>, recherche: Ref<string>) {
  const route = useRoute();
  const router = useRouter();

  watch(coordonnees, async nouvelleCoordonnees => {
    await router.replace({
      query: {
        ...route.query,
        latitude: nouvelleCoordonnees?.latitude?.toString(),
        longitude: nouvelleCoordonnees?.longitude?.toString(),
        adresse: recherche.value,
      },
    });
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
}
