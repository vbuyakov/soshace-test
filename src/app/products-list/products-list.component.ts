import { Component, OnInit, Input, Output } from '@angular/core';
import {ProductsService} from '../products.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

  public products: any = {};
  public categoryFilter: string = 'all';

  constructor(private productsSrv: ProductsService) { }

  ngOnInit() {
    this.productsSrv.checkProductsUpdate.subscribe((res) => {
      this.products = res;
    });
  }

}
