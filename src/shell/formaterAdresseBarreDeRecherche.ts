import { AdresseHistorique } from '@/domaines/adresses/recupererHistoriqueAdresse.usecase';
import { Adresse } from '@/domaines/logement/recupererAdressePourBarreDeRecherche.usecase';
import { AdresseBarreDeRecherche } from '@/shell/coordonneesType';

type DifferentsTypeAdresse = AdresseBarreDeRecherche | AdresseHistorique | Adresse;

function estAdresseHistorique(adresse: DifferentsTypeAdresse): adresse is AdresseHistorique {
  return 'numero_rue' in adresse;
}

function estAdresseBarreDeRecherche(adresse: DifferentsTypeAdresse): adresse is AdresseBarreDeRecherche {
  return 'numeroEtRue' in adresse;
}

export default function formaterAdresse(adresse: DifferentsTypeAdresse): string {
  if (estAdresseHistorique(adresse)) {
    return `${adresse.numero_rue} ${adresse.rue}, ${adresse.commmune} (${adresse.code_postal})`;
  } else if (estAdresseBarreDeRecherche(adresse)) {
    return `${adresse.numeroEtRue}, ${adresse.commune} (${adresse.codePostal})`;
  } else {
    return `${adresse.numeroRue} ${adresse.rue}, ${adresse.commune_label} (${adresse.codePostal})`;
  }
}
