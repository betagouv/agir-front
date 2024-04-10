import { QuestionApiModel } from '@/kyc/adapters/question.repository.axios';

export class InjectKYC {
  avecKYC(kyc: QuestionApiModel): QuestionApiModel {
    return kyc;
  }
}
