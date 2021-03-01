import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../posts.model';
import { PostsService } from '../posts.servicet';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {
  // posts = [
  //   { title: 'First Post', content: 'This is First post' },
  //   { title: 'Second Post', content: 'This is Second post' },
  //   { title: 'Third Post', content: 'This is Third post' },
  // ]
  posts: Post[] = [];
  private postSub: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.postsService.getPosts();
    this.postSub = this.postsService.getPostUpdateListner()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  onDelete(postId: string) {
    this.postsService.deletePost(postId);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }

}
