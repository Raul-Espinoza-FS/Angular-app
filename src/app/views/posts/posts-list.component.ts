import { Component, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/services/posts/post.service';
import { lastValueFrom } from 'rxjs';
import { SettingsService } from 'src/app/services/shared/settings.service';
import { ToastrService } from 'ngx-toastr';

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

    // Permissions 
    editPostPermission = false;
    deletePostPermission = false;
    createPostPermission = false;

    constructor(private postService: PostService, private routeParams: ActivatedRoute, private router: Router,
        private settingsService: SettingsService, private toastr: ToastrService
    ) {
        this.editPostPermission = this.settingsService.can('edit_article');
        this.deletePostPermission = this.settingsService.can('delete_article');
        this.createPostPermission = this.settingsService.can('create_article');
    }

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

    async deletePost(post_id) {
        let postsResponse = await lastValueFrom(this.postService.deletePost(post_id));
        this.toastr.success('', 'Post Deleted');
        this.loadPosts(this.currentPage, this.itemsPerPage, this.direction);
    }
}
