import {Component, Input, OnChanges, OnInit, SimpleChanges} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap/modal";
import {CategoriesService} from "../categories.service";
import {ProductsService} from "../products.service";


import {FormBuilder, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-product-editor',
  templateUrl: './product-editor.component.html',
  styleUrls: ['./product-editor.component.css']
})
export class ProductEditorComponent implements OnInit, OnChanges {

  @Input() dialog: ModalDirective;
  @Input() currentCategory: string = 'all';
  @Input() currentProduct: any = {};

  public categories: any = {};
  public categoriesArr = [];

  cForm: FormGroup;

  constructor(private  categoriesSrv: CategoriesService, private  productsSrv: ProductsService, private  fb: FormBuilder) {
    this.reinitForm();
  }

  reinitForm() {
    const defaultCategory = (this.currentCategory !== 'all') ? this.currentCategory : 'empty'; //Категория по умолчанию для нового товара
    this.cForm = this.fb.group({

      '_id': [this.currentProduct['_id'] || '', []],
      'name': [this.currentProduct['name'] || '', Validators.required],
      'categoryId': [this.currentProduct['categoryId'] || defaultCategory, []],
      'buyingPrice': [this.currentProduct['buyingPrice'] || '', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d{1,}((\.|\,)\d{1,}){0,1}$/i)
      ])],
      'sellingPrice': [this.currentProduct['sellingPrice'] || '', Validators.compose([
        Validators.required,
        Validators.pattern(/^\d{1,}((\.|\,)\d{1,}){0,1}$/i)
      ])]
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['currentProduct']) {

      this.reinitForm();
    }
  }


  ngOnInit() {

    this.categoriesSrv.checkCategoriesUpdate.subscribe((res) => {
      this.categories = res;
      let keys = [];
      for (let key in this.categories) {
        keys.push(this.categories[key]);
      }
      this.categoriesArr = keys;

    });

    this.reinitForm();
  }

  onSubmit(value: any) {
    if (!this.cForm.valid) {
      //Дернуть все контролы чтобы высветились ошибки
      for (let control in this.cForm.controls) {
        this.cForm.get(control).markAsTouched();
      }
      return;
    }

    value['buyingPrice'] = String(value['buyingPrice']).replace(',', '.');
    value['sellingPrice'] = String(value['sellingPrice']).replace(',', '.');


    this.productsSrv.saveProduct(value).subscribe((res) => {
      this.productsSrv.getProducts(this.currentCategory).subscribe();
      this.reinitForm();
      this.dialog.hide();

    });


  }

  closeDlg() {
    this.reinitForm();
    this.dialog.hide();
  }

}
