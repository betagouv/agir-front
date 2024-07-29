import { Classement } from '@/domaines/classement/recupererClassement.usecase';

export interface ClassementPresenter {
  presente(question: Classement): void;
}
