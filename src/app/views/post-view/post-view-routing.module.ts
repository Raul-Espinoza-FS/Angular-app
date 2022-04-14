import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { P404Component } from '../error/404.component';

import { PostViewComponent } from './post-view.component';

const routes: Routes = [
    {
        path: ':id',
        component: PostViewComponent,
    },
    { path: '**', component: P404Component }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostViewRoutingModule { }
