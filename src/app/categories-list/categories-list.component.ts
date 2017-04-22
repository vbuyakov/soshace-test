import {Component, EventEmitter, OnInit, Output, Input} from "@angular/core";
import {CategoriesService} from "../categories.service";

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.css']
})
export class CategoriesListComponent implements OnInit {
  public categories: any = {};
  public categoriesArr = [];
  @Output() deleteHandler = new EventEmitter();
  @Output() setCurrentCategoryHandler = new EventEmitter();
  @Input() currentCategory: string = 'all';
  constructor(private  categoriesSrv: CategoriesService) {
  }

  ngOnInit() {
    this.categoriesSrv.checkCategorisUpdate.subscribe((res) => {
      this.categories = res;
      let keys = [];
      for(let key in this.categories) {
        keys.push(this.categories[key]);
      }
      this.categoriesArr = keys;

    });

  }

  deleteCategory(category) {
    this.deleteHandler.emit(category);
  }

  setCurrentCategory(categoryId) {
    this.setCurrentCategoryHandler.emit(categoryId);
  }

}
