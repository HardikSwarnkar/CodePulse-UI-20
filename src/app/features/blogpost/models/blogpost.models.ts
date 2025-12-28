import { Category } from '../../category/models/category.models';

export interface AddBlogpostRequest {
  title: string;
  shortDiscription: string; // ✅ match backend
  content: string;
  featuredImageURL: string; // ✅ match backend
  urlHandle: string; // JSON is case-insensitive
  publishDate: Date; // ✅ match backend
  auther: string; // ✅ match backend
  isVisible: boolean;
  categories: string[];
}

export interface Blogpost {
  id: string;
  title: string;
  shortDiscription: string;
  content: string;
  featuredImageURL: string;
  urlHandle: string;
  publishDate: Date;
  auther: string;
  isVisible: boolean;
  categories: Category[];
}
