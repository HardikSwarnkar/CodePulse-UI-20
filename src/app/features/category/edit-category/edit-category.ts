import { Component, effect, inject, input } from '@angular/core';
import { CategoryService } from '../services/category-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UpdateCategoryRequest } from '../models/category.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-category',
  imports: [ReactiveFormsModule],
  templateUrl: './edit-category.html',
  styleUrl: './edit-category.css',
})
export class EditCategory {
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.categoryService.updateCategoryStatus() === 'success') {
        this.categoryService.updateCategoryStatus.set('idle');
        this.router.navigate(['/admin/categories']);
      }
      if (this.categoryService.updateCategoryStatus() === 'error') {
        this.categoryService.updateCategoryStatus.set('idle');
        console.error('Update Category Request Failed');
      }
    });
  }

  id = input<string>();
  private categoryService = inject(CategoryService);

  categoryResourceRef = this.categoryService.getCategoryById(this.id);
  categoryResponse = this.categoryResourceRef.value;

  editCategoryFormGroup = new FormGroup({
    name: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(100)],
    }),
    urlHandles: new FormControl<string>('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(200)],
    }),
  });

  get nameFormControl() {
    return this.editCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() {
    return this.editCategoryFormGroup.controls.urlHandles;
  }

  //effects react to signal changes and perform side effects
  // here we are using effect to patch the form controls when categoryResponse changes
  effectRef = effect(() => {
    this.editCategoryFormGroup.controls.name.patchValue(this.categoryResponse()?.name ?? '');
    this.editCategoryFormGroup.controls.urlHandles.patchValue(
      this.categoryResponse()?.urlHandles ?? ''
    );
  });
  onSubmit() {
    const id = this.id();
    if (this.editCategoryFormGroup.invalid || !id) {
      return;
    }

    const formRawValue = this.editCategoryFormGroup.getRawValue();
    const updateCategoryRequestDto: UpdateCategoryRequest = {
      name: formRawValue.name,
      urlHandles: formRawValue.urlHandles,
    };

    this.categoryService.updateCategory(id, updateCategoryRequestDto);
  }
  onDelete() {
    const id = this.id();
    if (!id) {
      return;
    }
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.router.navigate(['/admin/categories']);
      },
      error: () => {
        console.error('Delete Category Request Failed');
      },
    });
  }
}
