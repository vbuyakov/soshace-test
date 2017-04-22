import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject, BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';


@Injectable()
export class CategoriesService {

  public checkCategorisUpdate: Subject<any> = new BehaviorSubject<any>({});

  public categories: any = {};


  constructor(private http: Http) {
  }

  public getCategories() {
    return this.http.get('/api/categories').map((res: Response) => {
      this.categories = res.json();

      this.checkCategorisUpdate.next(this.categories); //Emit to recievers -  Category list chnged
      return this.categories;
    }).catch(this.handleError);
  }

  public delete(id) {
    delete this.categories[id];
    this.checkCategorisUpdate.next(this.categories); //Emit to recievers -  Category list chnged
  }


  handleError(error: Response | any) {


    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
