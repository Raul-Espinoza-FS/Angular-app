import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';
import { PostService } from 'src/app/services/posts/post.service';
import { AuthService } from 'src/app/services/shared/auth.service';
import { SettingsService } from 'src/app/services/shared/settings.service';

@Component({
  templateUrl: 'post-view.component.html',
  styleUrls: ['post-view.component.scss']
})
export class PostViewComponent {
  public user;
  public post = null;
  public post_id;

  constructor(private authService: AuthService, private route: Router, private settings: SettingsService, private routeParams: ActivatedRoute, private postService: PostService) { }

  public logout() {
    this.authService.logout().subscribe(
      {
        complete: () => {
          setTimeout(function () {
            location.reload();
          });
        }
      }
    )
  }

  async loadPost(post_id) {
    this.post = await lastValueFrom(this.postService.getPost(post_id));
  }

  ngOnInit() {
    this.user = this.settings.user;
    let post_id = this.routeParams.snapshot.paramMap.get('id');
    this.loadPost(post_id);
  }

}
