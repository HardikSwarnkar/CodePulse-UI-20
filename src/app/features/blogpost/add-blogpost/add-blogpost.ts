import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { publish } from 'rxjs';
import { BlogPostService } from '../services/blog-post-service';
import { AddBlogpostRequest } from '../models/blogpost.models';
import { Router } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { CategoryService } from '../../category/services/category-service';

@Component({
  selector: 'app-add-blogpost',
  imports: [ReactiveFormsModule, MarkdownComponent],
  templateUrl: './add-blogpost.html',
  styleUrl: './add-blogpost.css',
})
export class AddBlogpost {
  blogPostService = inject(BlogPostService);
  categoryService = inject(CategoryService);
  router = inject(Router);
  // to fetch categories for blogpost
  private categoriesResponseRef = this.categoryService.getAllCategories();
  categoriesResponse = this.categoriesResponseRef.value;

  addBlogpostForm = new FormGroup({
    title: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(100)],
    }),
    shortDescription: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(10), Validators.maxLength(300)],
    }),
    content: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(50)],
    }),
    featuredImageUrl: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    urlHandle: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
    /* the html is returning date input as string, so commenting this out as we can't assign string to Date type
    publishedDate: new FormControl<Date>(new Date(), {
      nonNullable: true,
      validators: [Validators.required],
    })
      concerting date input to string to make it work
      */
    publishedDate: new FormControl<string>(new Date().toISOString().split('T')[0], {
      nonNullable: true,
      validators: [Validators.required],
    }),
    author: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    isVisible: new FormControl<boolean>(true, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    categories: new FormControl<string[]>([], {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });
  onSubmit() {
    const formRawValue = this.addBlogpostForm.getRawValue();

    const requestDto: AddBlogpostRequest = {
      title: formRawValue.title,
      shortDiscription: formRawValue.shortDescription,
      content: formRawValue.content,
      featuredImageURL: formRawValue.featuredImageUrl,
      urlHandle: formRawValue.urlHandle,
      publishDate: new Date(formRawValue.publishedDate),
      isVisible: formRawValue.isVisible,
      auther: formRawValue.author,
      categories: formRawValue.categories ?? [],
    };
    this.blogPostService.createBlogpost(requestDto).subscribe({
      next: (blogpost) => {
        console.log('Blogpost created successfully:', blogpost);
        this.router.navigate(['/admin/blogposts']);
      },
      error: (error) => {
        console.error('Error creating blogpost:', error);
      },
    });
  }
}
