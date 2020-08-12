import { Component } from '@angular/core';
import { NgForm, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

import { PostsService } from '../posts.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent {
  constructor(
    public postsService: PostsService,
    public authService: AuthService
  ) {}

  onAddPost(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.postsService.addPost(
      form.value.title,
      form.value.price,
      form.value.content
    );
    form.resetForm();
  }
}
