import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { LoginComponent } from './views/login/login.component';
import { AuthGuard } from './services/shared/auth.guard'
import { PermissionsGuard } from './services/shared/permissions.guard'

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: '',
    children: [
      {
        path: 'article',
        loadChildren: () => import('./views/post-view/post-view.module').then(m => m.PostViewModule)
      }
    ]
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    canActivate: [AuthGuard],
    canActivateChild: [PermissionsGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./views/posts/posts.module').then(m => m.PostsModule),
        data: {
          title: 'Posts'
        }
      },
      {
        path: 'settings',
        loadChildren: () => import('./views/settings/settings.module').then(m => m.SettingsModule),
        data: {
          title: 'Settings'
        }
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', useHash: false }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
