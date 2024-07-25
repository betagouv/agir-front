import { Classement } from '@/domaines/classement/recupererClassementNational.usecase';

export interface ClassementPresenter {
  presente(question: Classement): void;
}
