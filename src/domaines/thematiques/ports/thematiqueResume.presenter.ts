import { ResumeThematique } from '@/domaines/actions/ports/actions.repository';

export interface ThematiqueResumeViewModel {
  commune: string;
  listeInformations: {
    to?: RouterLinkParams;
    label: string;
    href?: string;
  }[];
}

export interface RouterLinkParams {
  path?: string;
  name?: string;
  params?: { [key: string]: string };
}

export interface ThematiqueResumePresenter {
  presente(resumeThematique: ResumeThematique): Promise<void>;
}
