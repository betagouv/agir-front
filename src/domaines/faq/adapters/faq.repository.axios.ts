import { AxiosFactory, intercept401 } from '@/axios.factory';
import { TypeAction } from '@/domaines/actions/ports/actions.repository';
import { FaqRepository } from '@/domaines/faq/ports/faq.repository';

export class FaqRepositoryAxios implements FaqRepository {
  @intercept401()
  async envoyerQuestion(
    idUtilisateur: string,
    idAction: string,
    typeAction: TypeAction,
    question: string,
  ): Promise<void> {
    const axios = AxiosFactory.getAxios();
    await axios.post(`/utilisateurs/${idUtilisateur}/actions/${typeAction}/${idAction}/question`, {
      question,
    });
  }
}
