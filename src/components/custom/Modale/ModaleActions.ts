export default class ModaleActions {
  constructor(private modaleId: string) {}

  open() {
    const dialog = document.getElementById(this.modaleId);
    window.dsfr(dialog).modal.disclose();
  }
}
