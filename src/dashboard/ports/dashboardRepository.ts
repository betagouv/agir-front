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
export interface Dashboard {
  compteur: Compteur;
  quizz: Quizz[];
  badges: Badge[];
}
export interface DashboardRepository {
  getDashboard(utilisateur: string): Promise<Dashboard>;
}
