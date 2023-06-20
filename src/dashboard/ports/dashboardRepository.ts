interface Compteur {
  titre: string;
  valeur: number;
}
interface Quizz {
  id: number;
  titre: string;
}

interface Badge {
  titre: string;
  date: "14/06/2023";
}

interface Empreinte {
  bilan: string;
}
export interface Dashboard {
  compteurs: Compteur[];
  quizz: Quizz[];
  badges: Badge[];
  empreinte: Empreinte;
}
export interface DashboardRepository {
  getDashboard(utilisateur: string): Promise<Dashboard>;
}
