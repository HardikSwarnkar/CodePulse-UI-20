import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BlogPostService } from '../services/blog-post-service';

@Component({
  selector: 'app-blogpost-list',
  imports: [RouterLink],
  templateUrl: './blogpost-list.html',
  styleUrl: './blogpost-list.css',
})
export class BlogpostList {
  private blogPostService = inject(BlogPostService);

  // ✅ ResourceRef
  resource = this.blogPostService.getAllBlogposts();

  // ✅ Signals come from resource
  isLoading = this.resource.isLoading;
  error = this.resource.error;
  response = this.resource.value;
}
