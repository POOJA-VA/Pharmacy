import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/service/product.service';

@Component({
  selector: 'app-admin-product',
  templateUrl: './product.component.html',
})
export class AdminProductComponent implements OnInit {
  constructor(private productService: ProductService) {}
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
  productId: number = 0;

  ngOnInit(): void {
    this.productService.getProducts().subscribe({
      next: (response: any) => {
        this.medicines = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  onSubmit(form: NgForm) {
    // if (this.id == 0) {
    console.log(form.value);
    let formValue: Product = form.value;
    const formData = new FormData();
    formData.append('id', form.value.productId);
    formData.append('photo', this.file);
    formData.append('categoryId', '1');
    formData.append('title', formValue.title);
    formData.append('date', formValue.date);
    formData.append('description', formValue.description);
    formData.append('expirydate', formValue.expirydate);
    formData.append('price', formValue.price.toString());
    console.log(formData, 'check');

    this.productService.addProduct(formData).subscribe({
      next: () => {
        this.title = '';
        this.description = '';
        this.price = 0;
        this.ngOnInit();
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    // }
    //  else {
    //   console.log('ekskkdjm');

    //   const formData = new FormData();
    //   formData.append('photo', this.file);
    //   formData.append('categoryId', '1');
    //   formData.append('id', this.id.toString());
    //   formData.append('title', form.value.title);
    //   formData.append('date', form.value.date);
    //   formData.append('description', form.value.description);
    //   formData.append('expirydate', form.value.expirydate);
    //   formData.append('price', form.value.price.toString());
    //   console.log(formData, 'check');
    //   this.productService.updateProducts(formData).subscribe({
    //     next: (response: any) => {
    //       this.medicines = response.data;
    //       this.title = '';
    //       this.description = '';
    //       this.price = 0;
    //       this.date;
    //       this.expirydate;
    //       this.photo;
    //       this.btn = 'ADD';
    //     },
    //     error: (err) => {
    //       let message: string = err?.error?.error?.message;
    //       this.error =
    //         message != null && message.includes(',')
    //           ? message.split(',')[0]
    //           : message;
    //     },
    //   });
    // }
  }

  onEdit(id: number) {
    this.productId = id;
    this.btn = 'Edit';
    this.id = id;
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