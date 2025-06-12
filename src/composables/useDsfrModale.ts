export function useDsfrModale(modalId: string) {
  function ouvrirModale() {
    const modalElement = document.getElementById(modalId);
    if (modalElement && window.dsfr) {
      window.dsfr(modalElement).modal.disclose();
    }
  }

  function fermerModale() {
    const modalElement = document.getElementById(modalId);
    if (modalElement && window.dsfr) {
      window.dsfr(modalElement).modal.conceal();
    }
  }

  return {
    ouvrirModale,
    fermerModale,
  };
}
