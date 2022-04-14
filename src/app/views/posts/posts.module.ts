import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostsListComponent } from './posts-list.component';
import { PostsComponent } from './view/posts.component';
import { PostsRoutingModule } from './posts-routing.module';

@NgModule({
    declarations: [PostsListComponent, PostsComponent],
    imports: [
        CommonModule,
        PostsRoutingModule
    ]
})
export class PostsModule { }
