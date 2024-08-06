import { ClassementGlobal } from '@/domaines/classement/recupererClassement.usecase';

export interface ClassementPresenter {
  presente(question: ClassementGlobal): void;
}
