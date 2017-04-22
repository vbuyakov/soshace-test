import {Component, OnInit, ViewChild} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap/modal";
import {ProductsService} from "./products.service";
import {CategoriesService} from "./categories.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SOSHACE Test App';

  currentModal: ModalDirective;
  confirmData: any;

  @ViewChild('deleteConfirmModal') public deleteConfirmModal: ModalDirective;
  @ViewChild('addCategoryDlgModal') public addCategoryDlgModal: ModalDirective;
  public categories: any = {};
  public products: any = {};
  public categoryFilter: string = 'all';


  constructor(private  productsSrv: ProductsService, private  categoriesSrv: CategoriesService) {
  }

  deleteItem(item: any) {
    switch (item.type) {
      case 'category':
        if (item._id == this.categoryFilter) {
          this.categoryFilter = 'empty';
        }
        this.categoriesSrv.delete(item._id).subscribe(res => {
          this.reloadProducts();
        });

        break;
      case  'product':
        this.productsSrv.delete(item.id);
        break;
    }

  }

  createCategoryDlg() {
    this.currentModal = this.addCategoryDlgModal;
    this.addCategoryDlgModal.show();
  }

  deleteCategoryDlg(category) {
    this.currentModal = this.deleteConfirmModal;
    this.confirmData = {
      type: 'category',
      title: 'Хотите удалить категорию ?',
      descr: 'Все товары в этой категории будут помечены без категории',
      _id: category._id
    };
    this.deleteConfirmModal.show();
  }

  deleteProductDlg(product) {
    this.currentModal = this.deleteConfirmModal;
    this.confirmData = {
      type: 'product',
      title: 'Хотите удалить продукт ?',
      descr: `Точно удалить товар с id ${product._id}`,
      _id: product._id
    };
    this.deleteConfirmModal.show();
  }


  closeModal(modal: ModalDirective) {
    modal.hide();
  }


  setCategoryFilter(categoryId) {
    this.categoryFilter = categoryId;
  }

  reloadProducts() {

  }

  ngOnInit() {
    this.categoriesSrv.checkCategorisUpdate.subscribe((res) => {
      this.categories = res;
    });

    this.categoriesSrv.getCategories().subscribe((res) => {
    });
  }
}
