import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostsListComponent } from './posts-list.component';
import { PostsComponent } from './view/posts.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Posts'
        },
        children: [
            {
                path: '',
                component: PostsListComponent,
                data: {
                    title: null
                }
            },
            {
                path: 'create',
                component: PostsComponent,
                data: {
                    title: 'Create',
                    permissions: [
                        'create_article'
                    ]
                }
            },
            {
                path: 'edit/:id',
                component: PostsComponent,
                data: {
                    title: 'Edit',
                    permissions: [
                        'edit_article'
                    ]
                }
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PostsRoutingModule { }
