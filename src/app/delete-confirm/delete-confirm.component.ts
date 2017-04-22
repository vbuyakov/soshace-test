import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";
import {ModalDirective} from "ngx-bootstrap/modal";
@Component({
  selector: 'app-delete-confirm',
  templateUrl: './delete-confirm.component.html',
  styleUrls: ['./delete-confirm.component.css']

})
export class DeleteConfirmComponent implements OnInit {

  @Output() deleteItem = new EventEmitter();
  @Input() dialog: ModalDirective;
  @Input() confirmData: any;
  public dlgTitle: string = '';
  public dlgBody: string = '';


  constructor() {
  }

  ngOnInit() {
  }


  confirmDelete() {
    this.deleteItem.emit({type: this.confirmData.type, id: this.confirmData.id});
    this.dialog.hide();
  }

  closeDlg() {
    this.dialog.hide();
  }


}
