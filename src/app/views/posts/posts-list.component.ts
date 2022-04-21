import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/posts/post.service';
import { lastValueFrom } from 'rxjs';

@Component({
    templateUrl: 'posts-list.component.html',
    styleUrls: ['post-list.component.scss']
})
export class PostsListComponent implements OnInit {
    totalItems: number = 0;
    currentPage: number = 1;
    itemsPerPage: number = 20;
    direction: string = 'desc';
    postsList: Array<any> = [];
    isLoaded = false;

    constructor(private postService: PostService, private routeParams: ActivatedRoute, private router: Router) { }

    async ngOnInit() {
        // Get optional parameters and set defaults
        let currentPage = this.routeParams.snapshot.queryParamMap.get('page') ? Number(this.routeParams.snapshot.queryParamMap.get('page')) : this.currentPage;
        let itemsPerPage = this.routeParams.snapshot.queryParamMap.get('perPage') ? Number(this.routeParams.snapshot.queryParamMap.get('perPage')) : this.itemsPerPage;
        let direction = this.routeParams.snapshot.queryParamMap.get('direction') ? this.routeParams.snapshot.queryParamMap.get('direction') : this.direction;

        this.loadPosts(currentPage, itemsPerPage, direction);
    }

    async loadPosts(currentPage, itemsPerPage, direction) {
        let postsResponse = await lastValueFrom(this.postService.getPosts(currentPage, itemsPerPage, direction));

        this.postsList = postsResponse.data;
        this.totalItems = postsResponse.total;

        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
        this.direction = direction;

        this.isLoaded = true;
    }

    pageChanged(event: any): void {
        this.router.navigate(
            [],
            {
                relativeTo: this.routeParams,
                queryParams: { page: event.page },
                queryParamsHandling: 'merge'
            });
        this.loadPosts(event.page, this.itemsPerPage, this.direction);
    }
}
