import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { lastValueFrom } from 'rxjs';

import { PostService } from 'src/app/services/posts/post.service';
@Component({
    templateUrl: 'posts.component.html',
    styleUrls: ['posts.component.scss']
})
export class PostsComponent implements OnInit {

    mode: string = 'new';
    postId: any = null;
    previewImageUrl: string = null;
    tagsList = new FormControl(null);

    postForm = new FormGroup({
        title: new FormControl(null, Validators.required),
        content: new FormControl(null, Validators.required),
        thumbnail_id: new FormControl(null, Validators.required),
        tags: new FormControl(null, Validators.required),
    });


    avatarForm = new FormGroup({
        thumbnail: new FormControl([null]),
    });

    constructor(private postService: PostService, private toastr: ToastrService, private router: Router, private routeParams: ActivatedRoute) { }

    ngOnInit(): void {
        let post_id = this.routeParams.snapshot.paramMap.get('id');
        if (post_id && post_id !== '0') {
            // Edit a post
            this.mode = 'edit';
            this.postId = post_id;
            this.toggleForm(false);
            this.loadPost(post_id);
        }
        else {
            // Create a new post
            this.mode = 'new';
        }
    }

    toggleForm(mode) {
        if (mode) {
            this.postForm.enable();
            this.avatarForm.enable();
            this.tagsList.enable();
        }
        else {
            this.postForm.disable();
            this.avatarForm.disable();
            this.tagsList.disable();
        }
    }

    async loadPost(id) {
        let postResponse = await lastValueFrom(this.postService.getPost(id));
        this.postForm.patchValue({
            title: postResponse.title,
            content: postResponse.content,
            thumbnail_id: postResponse.thumbnail_id,
            tags: postResponse.tags,
        });
        let tagObject = [];
        postResponse.tags.split(',').forEach(tag => {
            tagObject.push({
                display: tag,
                value: tag,
            })
        });
        this.tagsList.setValue(tagObject);

        this.previewImageUrl = postResponse.thumbnail.url;

        this.toggleForm(true);
    }

    onItemChanged() {
        let tags: Array<string> = [];
        this.tagsList.value.forEach((item) => {
            tags.push(item.value);
        });
        this.postForm.patchValue({
            tags: tags.join()
        });
    }

    resetPreview() {
        this.previewImageUrl = null;
        this.tagsList.reset();
    }

    showPreview(event) {
        // Update the value on the form
        const file = (event.target as HTMLInputElement).files[0];

        // Update the forms
        this.avatarForm.patchValue({
            thumbnail: file
        });
        this.avatarForm.get('thumbnail').updateValueAndValidity();
        this.postForm.patchValue({
            thumbnail_id: 0
        });
        this.postForm.get('thumbnail_id').updateValueAndValidity();


        // File Preview
        const reader = new FileReader();
        reader.onload = () => {
            this.previewImageUrl = reader.result as string;
        }
        reader.readAsDataURL(file)
    }

    async savePost() {

        // Upload the image only if it was edited
        if (this.postForm.get('thumbnail_id').value == 0) {
            let thumbnailData = new FormData();
            thumbnailData.append('thumbnail', this.avatarForm.get('thumbnail')?.value);
            let thumbnailResponse = await lastValueFrom(this.postService.saveThumbnail(thumbnailData));
            // Save the post
            this.postForm.patchValue({
                thumbnail_id: thumbnailResponse.thumbnail_id
            })
        }

        if (this.mode == 'new') {
            let postResponse = await lastValueFrom(this.postService.savePost(this.postForm.value));
            this.toastr.success('ID: ' + postResponse.post_id, 'Post Created');

            this.router.navigate(['/posts']);
        }
        else if (this.mode == 'edit') {
            let postResponse = await lastValueFrom(this.postService.editPost(this.postId, this.postForm.value));
            this.toastr.success('', 'Post Edited');
        }
    }

}
