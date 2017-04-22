import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Subject, BehaviorSubject} from 'rxjs';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/observable/of';


@Injectable()
export class CategoriesService {

  public checkCategoriesUpdate: Subject<any> = new BehaviorSubject<any>({});

  public categories: any = {};


  constructor(private http: Http) {
  }

  public getCategories() {
    return this.http.get('/api/categories').map((res: Response) => {
      this.categories = res.json();

      this.checkCategoriesUpdate.next(this.categories); //Emit to recievers -  Category list chnged
      return this.categories;
    }).catch(this.handleError);
  }

  public delete(id) {

    return this.http.delete('/api/categories/'+id).map((res:Response) => {
      delete this.categories[id];
      this.checkCategoriesUpdate.next(this.categories); //Emit to recievers -  Category list chnged
      res.json();
    })
  }

  public create(category)
  {
    return this.http.post('/api/categories', category).map((res: Response) => {
      return this.getCategories().subscribe();
    }).catch(this.handleError);
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
