interface Window {
  dsfr: (element: HTMLElement | null) => {
    modal: {
      disclose: () => void;
      conceal: () => void;
    };
  };
}
