export interface AddCategoryRequest {
  name: string;
  urlHandles: string;
}

export interface UpdateCategoryRequest {
  name: string;
  urlHandles: string;
}

export interface Category {
  id: string;
  name: string;
  urlHandles: string;
}
