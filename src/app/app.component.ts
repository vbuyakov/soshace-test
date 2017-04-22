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

  public categories: any = {};
  public products: any = {};
  public categoryFilter: string = null;


  constructor(private  productsSrv: ProductsService, private  categoriesSrv: CategoriesService) {
  }

  deleteItem(item: any) {
    switch (item.type) {
      case 'category':
        this.categoriesSrv.delete(item.id);
        break;
      case  'product':
        this.productsSrv.delete(item.id);
        break;
    }

  }

  deleteCategory(category) {
    this.currentModal = this.deleteConfirmModal;
    this.confirmData = {
      type: 'category',
      title: 'Хотите удалить категорию ?',
      descr: 'Все товары в этой категории будут помечены без категории',
      id: category._id
    };
    this.deleteConfirmModal.show();
  }

  deleteProduct(product) {
    this.currentModal = this.deleteConfirmModal;
    this.confirmData = {
      type: 'product',
      title: 'Хотите удалить продукт ?',
      descr: `Точно удалить товар с id ${product._id}`,
      id: product._id
    };
    this.deleteConfirmModal.show();
  }


  closeModal(modal: ModalDirective) {
    modal.hide();
  }

  ngOnInit() {
    console.log('INIT ROOT COMPONENT');
    this.categoriesSrv.checkCategorisUpdate.subscribe((res) => {
      console.log("geted:",res);
      this.categories = res;
    });

    this.categoriesSrv.getCategories().subscribe((res)=>{

    });
  }
}
