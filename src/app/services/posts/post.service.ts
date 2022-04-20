import { Injectable } from '@angular/core';
import { APIBase } from '../APIBase';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PostService extends APIBase {

    constructor(
        http: HttpClient
    ) { super(http); }

    getPosts() {

    }

    getPost() {

    }

    savePost(data: any) : Observable<any> {
        return this.post('posts', data);
    }

    editPost(post_id: number, data: any) : Observable<any> {
        return this.patch('posts' + '/' + post_id, data);
    }
    
    deletePost(post_id: number) : Observable<any> {
        return this.delete('posts' + '/' + post_id);
    }

    saveThumbnail(data: any) : Observable<any> {
        return this.post('thumbnails', data);
    }
}
