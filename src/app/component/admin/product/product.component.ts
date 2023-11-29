import { Component, OnInit } from '@angular/core';
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
    title: String = '';
    description:String = '';
    price = 0;
    btn: string = 'Add';
    editId: number = 0;
    date: string='';
    expirydate: string='';
    medicines: Product[] = [];
    file = '';
   
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
   
    onSubmit(form: any) {
      const formData = new FormData();
      formData.append('photo', this.file);
      formData.append('id', this.editId.toString());
      formData.append('categoryId', form.value.categoryId);
      formData.append('title', form.value.title);
      formData.append('date', form.value.date);
      formData.append('description', form.value.description);
      formData.append('expiryDate', form.value.expiryDate);
      formData.append('price', form.value.price);
      if (this.editId == 0) {
        this.productService
          .addProduct(formData)
          .subscribe({
            next: (response: any) => {
              this.productService = response.data;
              this.title = '';
              this.description='';
              this.price=0;
            },
            error: (err) => {
              let message: string = err?.error?.error?.message;
              this.error = message.includes(',')
                ? message.split(',')[0]
                : message;
            },
          });
      } else {
        let newProducts = {
          id: this.id,
          title: this.title,
          description: this.description,
          price: this.price,
          categoryId:1,
          date: this.date,
          expirydate: this.expirydate,
        };
        console.log(newProducts);
        
        this.productService.updateProducts(newProducts).subscribe({
          next: (response: any) => {
            this.medicines = response.data;
            this.title = '';
            this.description='';
            this.price=0;
            this.date;
            this.expirydate;
            this.btn = "ADD";
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
   
    onEdit(id: number) {
      this.btn = 'Edit';
      this.id = id;
      this.editId = -1;
      let newCategory = this.medicines.find((o) => o.id == id);
      this.title = newCategory?.title!;
      this.description = newCategory?.description!;
      this.price = newCategory?.price!;
    }
   
    onDelete(id: number | undefined) {
      console.log(id);
      if (id !== undefined) {
        this.productService.deleteProduct(id).subscribe({
          next: (response: any) => {
            this.productService = response.data;
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
    onFileChange(event: any) {
      const fileInput = event.target;
      if (fileInput && fileInput.files.length > 0) {
        this.file = fileInput.files[0];
      }
    }
  }