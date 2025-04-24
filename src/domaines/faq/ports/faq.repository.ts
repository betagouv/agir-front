import { TypeAction } from '@/domaines/actions/ports/actions.repository';

export interface FaqRepository {
  envoyerQuestion(idUtilisateur: string, idAction: string, typeAction: TypeAction, question: string): Promise<void>;
}
