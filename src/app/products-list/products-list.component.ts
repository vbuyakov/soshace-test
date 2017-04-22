import {Component, EventEmitter, OnInit, Output} from "@angular/core";
import {ProductsService} from "../products.service";


@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public productsArr = [];
  @Output() deleteHandler = new EventEmitter();
  @Output() editHandler = new EventEmitter();

  constructor(private productsSrv: ProductsService) {
  }

  ngOnInit() {
    this.productsSrv.checkProductsUpdate.subscribe((res) => {
      this.productsArr = res;
    });
  }

  edit(item) {
    this.editHandler.emit(item);
  }

  delete(item) {
    this.deleteHandler.emit(item);
  }

  formatId(id: string) {

    if (id.length <= 6) return id;
    return id.substr(0, 2) + '...' + id.substr(id.length-4, 4);

  }


}
