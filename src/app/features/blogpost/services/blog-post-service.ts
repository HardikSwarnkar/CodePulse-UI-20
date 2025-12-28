import { inject, Injectable, signal } from '@angular/core';

import { HttpClient, httpResource, HttpResourceRef } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { AddBlogpostRequest, Blogpost } from '../models/blogpost.models';

@Injectable({
  providedIn: 'root',
})
export class BlogPostService {
  private http = inject(HttpClient);
  private apiBaseUrl = environment.apiBaseUrl;

  createBlogpost(data: AddBlogpostRequest): Observable<Blogpost> {
    return this.http.post<Blogpost>(`${this.apiBaseUrl}/api/BlogPost`, data);
  }

  getAllBlogposts(): HttpResourceRef<Blogpost[] | undefined> {
    return httpResource<Blogpost[]>(() => ({
      url: `${this.apiBaseUrl}/api/BlogPost`,
    }));
  }
}
