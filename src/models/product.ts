/**
 * Created by Viktor on 21.04.17.
 */
export interface IProduct {
  _id: number;
  name: string;
  categoryId: string;
  buyingPrice: number;
  sellingPrice: number;
}

export class Product {
  public _id: number;
  public name: string;
  public categoryId: string;
  public buyingPrice: number;
  public sellingPrice: number;

  constructor(product?: IProduct) {
    this._id = product && product._id || null;
    this.name = product && product.name || '';
    this.categoryId = product && product.categoryId || '';
    this.buyingPrice = product && product.buyingPrice || 0;
    this.sellingPrice = product && product.sellingPrice || 0;
  }

}
