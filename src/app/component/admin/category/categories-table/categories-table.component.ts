import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Category } from "src/app/model/category";

@Component({
  selector: "app-categories-table",
  templateUrl: "./categories-table.component.html",
})
export class CategoriesTableComponent {
  @Input() categories: Category[] = [];

  @Output() editEmitter = new EventEmitter<Category>();
  @Output() deleteEmitter = new EventEmitter<number | undefined>();

  onEdit(category: Category) {
    this.editEmitter.emit({ id: category.id, title: category.title});
  }

  onDelete(id: number | undefined) {
    this.deleteEmitter.emit(id);
  }
}