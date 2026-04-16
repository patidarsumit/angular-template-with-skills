import { Routes } from '@angular/router';

import { AppLayout } from './layout/app-layout/app-layout';
import { EmptyPage } from './pages/empty-page/empty-page';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: EmptyPage, title: 'Dashboard' },
      { path: 'analytics', component: EmptyPage, title: 'Analytics' },
      { path: 'projects', component: EmptyPage, title: 'Projects' },
      { path: 'team', component: EmptyPage, title: 'Team' },
      { path: 'resources', component: EmptyPage, title: 'Resources' },
      { path: 'settings', component: EmptyPage, title: 'Settings' },
      { path: 'documents', component: EmptyPage, title: 'Documents' },
      { path: 'calendar', component: EmptyPage, title: 'Calendar' },
      { path: 'messages', component: EmptyPage, title: 'Messages' },
    ],
  },
  { path: '**', redirectTo: '' },
];
