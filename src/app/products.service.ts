import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

@Injectable()
export class ProductsService {

  constructor(http: Http) {

  }

  public delete(id) {
    console.log('DELETE PRODUCT: ', id);

  }

}
