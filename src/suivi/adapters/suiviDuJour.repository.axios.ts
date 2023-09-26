import { DernierSuivi, SuiviRepository } from '@/suivi/ports/suivi.repository';
import { ElementSuiviCarbone, Resultat } from '@/suivi/envoyerSuiviDuJour.usecase';
import { AxiosFactory } from '@/axios.factory';

export interface SuiviDuJourGraphDataApiModel {
  date: string;
  valeur: number;
}
export interface SuiviDuJourApiModel {
  date_dernier_suivi: string;
  impact_dernier_suivi: number;
  variation: number;
  dernier_suivi: Map<string, string>;
  moyenne: number;
  derniers_totaux: SuiviDuJourGraphDataApiModel[];
}

function extractedDetailsCarbone(data: Map<string, string>): ElementSuiviCarbone[] {
  const derniersSuivisDetails: ElementSuiviCarbone[] = [];
  delete data['total_impact'];

  for (let i = 0; i < Object.keys(data).length; i += 2) {
    const key1 = Object.keys(data)[i];
    const key2 = Object.keys(data)[i + 1];
    const value1 = data[key1];
    const value2 = data[key2];

    derniersSuivisDetails.push({
      titre: key1,
      valeur: value1,
      impactCarbone: value2,
    });
  }
  return derniersSuivisDetails;
}

function getValeursDesSuivis(listeDesAdditionsCarbone: SuiviDuJourGraphDataApiModel[]): number[] {
  const valeurDesSuivis: number[] = [];

  for (let index = 0; index < listeDesAdditionsCarbone.length; index++) {
    const additionCarbon = listeDesAdditionsCarbone[index];
    valeurDesSuivis.push(additionCarbon.valeur);
  }
  return valeurDesSuivis;
}

function formateDate(date: string): string {
  const inputDate = new Date(date);

  const day = String(inputDate.getUTCDate()).padStart(2, '0');
  const month = String(inputDate.getUTCMonth() + 1).padStart(2, '0');
  const year = String(inputDate.getUTCFullYear());

  return `${day}/${month}/${year}`;
}

function getValeursDesDates(listeDesAdditionsCarbone: SuiviDuJourGraphDataApiModel[]): string[] {
  return listeDesAdditionsCarbone.map(({ date }) => formateDate(date));
}

function calculerTempsEnMinute(temps: string): number {
  const timeParts = temps.split(':');
  const heures = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);

  if (!isNaN(heures) && !isNaN(minutes)) {
    return heures * 60 + minutes;
  }
  return 0;
}

function isTransportEnCommun(valeur: string): boolean {
  return valeur.includes('train') || valeur.includes('metro') || valeur.includes('bus');
}

function getToutesLesValeursDuSuivisAvecLeBonFormat(listeDesValeurs: Map<string, string>): Map<string, string> {
  const listeFinaleDesValeurs: Map<string, string> = new Map();

  listeDesValeurs.forEach((value, key) => {
    if (isTransportEnCommun(key)) {
      listeFinaleDesValeurs.set(key, calculerTempsEnMinute(value).toString());
    } else {
      listeFinaleDesValeurs.set(key, value);
    }
  });
  return listeFinaleDesValeurs;
}

export class SuiviDuJourRepositoryAxios implements SuiviRepository {
  async ajouter(type: string, valeurs: Map<string, string>, utilisateurId: string) {
    const axiosInstance = AxiosFactory.getAxios();
    const jsonObject = { type, ...Object.fromEntries(getToutesLesValeursDuSuivisAvecLeBonFormat(valeurs)) };
    await axiosInstance.post(`/utilisateurs/${utilisateurId}/suivis`, jsonObject, {});
  }

  async recupererDernierSuivi(idUtilisateur: string, type: string): Promise<DernierSuivi | null> {
    const axiosInstance = AxiosFactory.getAxios();
    try {
      const data = await axiosInstance.get(`/utilisateurs/${idUtilisateur}/suivis/last?type=${type}`);
      const mapWithFullValues = new Map<string, string>(Object.entries(data.data));
      const mapWithoutAllValues = new Map<string, string>(Object.entries(data.data));
      mapWithoutAllValues.delete('date');
      const date = mapWithFullValues.get('date') || '';
      return {
        date: date,
        valeurs: mapWithoutAllValues,
      };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  async recupererResultat(idUtilisateur: string): Promise<Resultat | null> {
    const axiosInstance = AxiosFactory.getAxios();
    try {
      const response = await axiosInstance.get<SuiviDuJourApiModel>(`/utilisateurs/${idUtilisateur}/suivi_dashboard`);
      const responseData = response.data;
      const dernierSuiviDetails = extractedDetailsCarbone(responseData.dernier_suivi);

      return {
        impactCarbonDuJour: {
          valeur: responseData.impact_dernier_suivi,
          enHausse: responseData.variation <= 0,
          variation: responseData.variation,
        },
        suivisPrecedent: {
          datesDesSuivis: getValeursDesDates(responseData.derniers_totaux),
          valeursDesSuivis: getValeursDesSuivis(responseData.derniers_totaux),
          moyenneDesSuivis: responseData.moyenne,
        },
        additionCarboneDuJour: dernierSuiviDetails,
      };
    } catch (error) {
      return this.handleAxiosError(error);
    }
  }

  private handleAxiosError(error) {
    if (error && error.status === 404) {
      return null;
    } else {
      throw error;
    }
  }
}
