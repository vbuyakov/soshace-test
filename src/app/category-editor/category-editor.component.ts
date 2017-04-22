import {Component, Input, OnInit} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap/modal";
import {CategoriesService} from "../categories.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-category-editor',
  templateUrl: './category-editor.component.html',
  styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnInit {
  @Input() dialog: ModalDirective;

  cForm: FormGroup;

  constructor(private  categoriesSrv: CategoriesService, private  fb: FormBuilder) {
    this.reinitForm();
  }

  reinitForm() {
    this.cForm = this.fb.group({
      'name': ['', Validators.required]
    });
  }

  ngOnInit() {
    this.reinitForm();
  }

  onSubmit(value: any) {
    if (!this.cForm.valid) {
      //Дернуть все контролы чтобы высветились ошибки
      for (var control in this.cForm.controls) {
        this.cForm.get(control).markAsTouched();
      }
      return;
    }

    this.categoriesSrv.create({name: value.name}).subscribe((res) => {
      this.reinitForm();
      this.dialog.hide();
    });


  }

  closeDlg() {
    this.reinitForm();
    this.dialog.hide();
  }


}
