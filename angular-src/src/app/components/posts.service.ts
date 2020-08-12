import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) {}

  getPosts() {
    this.http
      .get<{ message: string; posts: any }>('http://localhost:3000/api/posts')
      .pipe(
        map((postData) => {
          return postData.posts.map((post) => {
            return {
              title: post.title,
              price: post.price,
              content: post.content,
              id: post._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.posts = transformedPosts;
        this.postsUpdated.next([...this.posts]);
      });
  }
  //gPLwnVesjqjEiTLI
  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(title: string, price: string, content: string) {
    const post: Post = {
      id: null,
      title: title,
      price: price,
      content: content,
    };

    this.http
      .post<{ message: string; postId: string }>(
        'http://localhost:3000/api/posts',
        post
      )
      .subscribe((responseData) => {
        const id = responseData.postId;
        post.id = id;
        this.posts.push(post);
        this.postsUpdated.next([...this.posts]);
      });
  }

  deletePost(postId: string) {
    this.http
      .delete('http://localhost:3000/api/posts/' + postId)
      .subscribe(() => {
        const updatedPost = this.posts.filter((post) => post.id !== postId);
        this.posts = updatedPost;
        this.postsUpdated.next([...this.posts]);
      });
  }

  findPost(postId: string) {
    this.http
      .get<{ message: string; posts: any }>(
        'http://localhost:3000/api/posts/' + postId
      )
      .pipe(
        map((postData) => {
          const updatedPost = this.posts.filter((post) => post.id !== postId);
          return postData.posts.map((updatedPost) => {
            return {
              title: updatedPost.title,
              price: updatedPost.price,
              content: updatedPost.content,
              id: updatedPost._id,
            };
          });
        })
      )
      .subscribe((tPost) => {
        this.posts = tPost;
        this.postsUpdated.next([...this.posts]);
      });
  }
}
