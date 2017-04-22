import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CategoriesListComponent } from './categories-list/categories-list.component';
import { CategoryEditorComponent } from './category-editor/category-editor.component';
import { ProductEditorComponent } from './product-editor/product-editor.component';
import { DeleteConfirmComponent } from './delete-confirm/delete-confirm.component';

import {ProductsService} from './products.service';
import {CategoriesService} from './categories.service';




@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    CategoriesListComponent,
    CategoryEditorComponent,
    ProductEditorComponent,
    DeleteConfirmComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    ProductsService,
    CategoriesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
