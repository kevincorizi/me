import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ExperienceComponent } from './experience/experience.component';
import { ProjectsComponent } from './projects/projects.component';

const SEO_KEYWORDS: string[] = [
  'kevin',
  'corizi',
  'kevin corizi',
  'software',
  'engineer',
  'developer',
  'angular',
  'fullstack',
  'web development',
  'frontend',
  'front end',
  'web design',
  'website design',
  'web developer',
  'website creator',
  'portfolio',
];

export const ROUTES: Routes = [
  {
    path: '',
    component: AboutComponent,
    data: {
      title: 'Kevin Corizi - Home',
      description:
        "Hi, I'm Kevin! I'm a software engineer passionate about web development and making beautiful things happen. Check out my portfolio!",
      ogTitle: 'Kevin Corizi - Portfolio - Home',
      ogSiteName: 'Kevin Corizi - Portfolio',
      canonical: '/',
      keywords: SEO_KEYWORDS.join(','),
      linkText: 'Home',
      icon: 'home',
    },
  },
  {
    path: 'experience',
    component: ExperienceComponent,
    data: {
      title: 'Kevin Corizi - Experience',
      description: 'What is my work experience so far? Find out here!',
      ogTitle: 'Kevin Corizi - Portfolio - Experience',
      ogSiteName: 'Kevin Corizi - Portfolio',
      canonical: '/experience',
      keywords: SEO_KEYWORDS.join(','),
      linkText: 'Experience',
      icon: 'work',
    },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: {
      title: 'Kevin Corizi - Projects',
      description: 'Check out some of my independently delivered projects!',
      ogTitle: 'Kevin Corizi - Portfolio - Projects',
      ogSiteName: 'Kevin Corizi - Portfolio',
      canonical: '/projects',
      keywords: SEO_KEYWORDS.join(','),
      linkText: 'Projects',
      icon: 'dashboard',
    },
  },
  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
