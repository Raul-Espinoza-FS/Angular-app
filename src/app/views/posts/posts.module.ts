import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PostsListComponent } from './posts-list.component';
import { PostsComponent } from './view/posts.component';
import { PostsRoutingModule } from './posts-routing.module';
import { TagInputModule } from 'ngx-chips';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
    declarations: [PostsListComponent, PostsComponent],
    imports: [
        CommonModule,
        PostsRoutingModule,
        ReactiveFormsModule,
        TagInputModule,
        PaginationModule,
        FormsModule
    ]
})
export class PostsModule { }
