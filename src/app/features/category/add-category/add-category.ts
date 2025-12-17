import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AddCategoryRequest } from '../models/category.models';
import { CategoryService } from '../services/category-service';

@Component({
  selector: 'app-add-category',
  imports: [ReactiveFormsModule],
  templateUrl: './add-category.html',
  styleUrl: './add-category.css',
})
export class AddCategory {
  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.categoryService.addCategoryStatus() === 'success') {
        this.categoryService.addCategoryStatus.set('idle');
        this.router.navigateByUrl('/admin/categories');
      }

      if (this.categoryService.addCategoryStatus() === 'error') {
        console.error('Add Category Request Failed');
      }
    });
  }

  private categoryService = inject(CategoryService);
  // 1) Import ReactiveFormsModule
  // 2) FormGroups -> FormControls

  addCategoryFormGroup = new FormGroup({
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
    return this.addCategoryFormGroup.controls.name;
  }

  get urlHandleFormControl() {
    return this.addCategoryFormGroup.controls.urlHandles;
  }

  onSubmit() {
    const addCategoryFormValue = this.addCategoryFormGroup.getRawValue();

    const addCategoryRequestDto: AddCategoryRequest = {
      name: addCategoryFormValue.name,
      urlHandles: addCategoryFormValue.urlHandles,
    };

    this.categoryService.addCategory(addCategoryRequestDto);
  }
}
