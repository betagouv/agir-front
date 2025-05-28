export type NombreAfficheEnFR = string & { readonly __brand: unique symbol };

export class NombreAfficheEnFRBuilder {
  static build(nombre: number, options?: Intl.NumberFormatOptions): NombreAfficheEnFR {
    return nombre.toLocaleString('fr-FR', options ?? { maximumFractionDigits: 0 }) as NombreAfficheEnFR;
  }
}

export type MontantAfficheEnFR = string & { readonly __brand: unique symbol };

export class MontantAfficheEnFRBuilder {
  static build(montant: number): MontantAfficheEnFR {
    return montant.toLocaleString('fr-FR', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0,
    }) as MontantAfficheEnFR;
  }
}
