import { useRoute, useRouter } from 'vue-router';

export function useQueryParamsReplacer() {
  const route = useRoute();
  const router = useRouter();

  return async (params: Record<string, string>) => {
    await router.replace({
      name: route.name,
      query: { ...route.query, ...params },
    });
  };
}
