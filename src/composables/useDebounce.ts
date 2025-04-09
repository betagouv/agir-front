import { ref, onBeforeUnmount } from 'vue';

export function useDebouncedFn<T extends (...args: never[]) => void>(fn: T, delay = 300) {
  const timeout = ref<ReturnType<typeof setTimeout> | null>(null);

  const cancel = () => {
    if (timeout.value) {
      clearTimeout(timeout.value);
      timeout.value = null;
    }
  };

  const debounced = (...args: Parameters<T>) => {
    cancel();
    timeout.value = setTimeout(() => {
      fn(...args);
    }, delay);
  };

  onBeforeUnmount(() => {
    cancel();
  });

  return {
    debounced,
    cancel,
  };
}
