import { Component, OnInit, TemplateRef } from '@angular/core';
import { PostService } from 'src/app/services/posts/post.service';
import { lastValueFrom } from 'rxjs';

@Component({
    templateUrl: 'dashboard.component.html',
    styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    postsList: Array<any> = [];
    constructor(private postService: PostService) { }

    async loadPosts() {
        let postsResponse = await lastValueFrom(this.postService.getPosts(1, 20, 'desc'));
        this.postsList = postsResponse.data;
    }

    ngOnInit(): void {
       this.loadPosts();
    }
}
