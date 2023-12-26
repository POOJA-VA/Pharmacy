import { Component, OnInit } from "@angular/core";
import { Category } from "src/app/model/category";
import { CategoryService } from "src/app/service/category.service";

@Component({
  selector: "app-category",
  templateUrl: "./category.component.html",
})
export class CategoryComponent implements OnInit{
  error: string = "";
  INITIAL_CATEGORY: Category = { id: 0, title: "" };

  emitterValue=false;

  categories: Category[] = [];
  categoryModel: Category = this.INITIAL_CATEGORY;

  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe({
      next: (response: any) => {
        this.categories = response.data;
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }

  onSubmit(form: any) {
    console.log(form.value);
    console.log(this.categoryModel);
    if (this.categoryModel.id === 0) {
      this.categoryService
        .postCategory({ title: this.categoryModel.title })
        .subscribe({
          next: (response: any) => {
            this.categories = response.data;
            this.categoryModel = this.INITIAL_CATEGORY;
          },
          error: (err) => {
            let message: string = err?.error?.error?.message;
            this.error = message.includes(",")
              ? message.split(",")[0]
              : message;
          },
        });
    } else {
      this.categoryService.putCategory(this.categoryModel).subscribe({
        next: (response: any) => {
          this.categories = response.data;
          this.categoryModel = this.INITIAL_CATEGORY;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(",")
              ? message.split(",")[0]
              : message;
        },
      });
    }
  }

  getCategory(category: Category) {
    // console.log(category);
    this.categoryModel = category;
  }

  onEdit(category: Category) {
    this.categoryModel = { ...category };
  }

  onDelete(id: number | undefined) {
    console.log(id);
    if (id !== undefined) {
      this.categoryService.deleteCategory(id).subscribe({
        next: (response: any) => {
          this.categories = response.data;
        },
        error: (err) => {
          let message: string = err?.error?.error?.message;
          this.error =
            message != null && message.includes(",")
              ? message.split(",")[0]
              : message;
        },
      });
    }
  }

  change():boolean{
    return  this.emitterValue=true;
  }
}