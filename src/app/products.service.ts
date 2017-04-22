import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {BehaviorSubject, Subject} from "rxjs";
import {Observable} from "rxjs/Rx";
import "rxjs/add/observable/of";


@Injectable()
export class ProductsService {

  public checkProductsUpdate: Subject<any> = new BehaviorSubject<any>({});
  public products: any = {};


  constructor(private http: Http) {

  }

  public getProducts(categoryId: string = 'any') {
    let url =  '/api/products';
    return this.http.get(url).map((res: Response) => {
      this.products = res.json();
      this.checkProductsUpdate.next(this.products); //Emit to recievers -  Category list chnged
      return this.products;
    }).catch(this.handleError);
  }

  public delete(id) {
    return this.http.delete('/api/products/' + id).map((res: Response) => {
      res.json();
    })

  }

  public saveProduct(product) {

    product['categoryId'] = (product['categoryId'] == 'empty') ? null : product['categoryId'];

    if (product._id == '') {
      delete  product['_id'];
      return this.http.post('/api/products', product).map((res: Response) => {
        res.json();
      }).catch(this.handleError);
    } else {

      return this.http.put('/api/products/' + product._id, product).map((res: Response) => {
        res.json();
      }).catch(this.handleError);

    }
  }


  handleError(error: Response | any) {
    let errMsg: string;
    return Observable.throw(errMsg);
  }

}
