import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from 'src/app/model/category';
import { Product } from 'src/app/model/product';
import { CategoryService } from 'src/app/service/category.service';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html',
})
export class AdminProductComponent implements OnInit {
  constructor(private productService: ProductService,private categoryService : CategoryService) {
    const today = new Date();
    this.minDate = today.toISOString().split('T')[0];
  }
  minDate: string;
  error: string = '';
  id: number = 0;
  title: string = '';
  description: string = '';
  price = 0;
  btn: string = 'Add';
  editId: number = 0;
  date: string = '';
  expirydate: string = '';
  photo: string = '';
  medicines: Product[] = [];
  file = '';
  categories: Category[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        console.log(response.data);
        this.medicines = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.categoryService.getCategories().subscribe({
      next:(response:any)=>{
        this.categories=response.data;
      }
    })
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    let formValue: Product = form.value;
    const formData = new FormData();
    console.log(form.value.id);
    formData.append('id', this.id.toString());
    formData.append('photo', this.file);
    formData.append('categoryId', form.value.categoryId);
    formData.append('title', formValue.title);
    formData.append('date', formValue.date);
    formData.append('description', formValue.description);
    formData.append('price', formValue.price.toString());

    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.id = 0;
        this.title = '';
        this.description = '';
        this.price = 0;
        this.date = '';
        this.photo = '';
        this.ngOnInit();
        form.resetForm();
      },
      error: (err) => {
        console.error(err);
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onEdit(id: number) {
    this.id = id;
    this.btn = 'Edit';
    this.editId = -1;
    let newCategory = this.medicines.find((o) => o.id == id);
    this.title = newCategory?.title!;
    this.description = newCategory?.description!;
    this.price = newCategory?.price!;
  }

  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
  }

  onDelete(id: number | undefined) {
    console.log(id);
    if (id !== undefined) {
      this.productService.deleteProduct(id).subscribe({
        next: (response: any) => {
          this.medicines = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(',')
              ? message.split(',')[0]
              : message;
        },
      });
    }
  }
}
