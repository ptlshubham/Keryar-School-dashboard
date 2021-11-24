import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import Swal from 'sweetalert2';
import { VisitorService } from '../visitor.service';
import { RegisterVisitor } from '../visitorreg/visitorreg.model';

@Component({
  selector: 'app-visitorlist',
  templateUrl: './visitorlist.component.html',
  styleUrls: ['./visitorlist.component.css']
})
export class VisitorlistComponent implements OnInit {
  public visitorList: RegisterVisitor[];
  public visitorModel: RegisterVisitor = new RegisterVisitor;
  isactive: boolean;
  constructor(
    private VisitorService: VisitorService,
    private apiService: ApiService
  ) {
    this.getAllVisitor();
  }

  ngOnInit(): void {
  }
  getAllVisitor() {
    this.VisitorService.getAllVisitorList().subscribe((data: any) => {
      this.visitorList = data;
      for (let i = 0; i < this.visitorList.length; i++) {
        this.visitorList[i].index = i + 1;
      }
    });
  }
  contactOrNot(data, id) {
    this.visitorModel.id = id;
    this.visitorModel.isactive = data
     
    this.VisitorService.updateVisitorInform(this.visitorModel).subscribe((req) => {
      // this.apiService.showNotification('top', 'right', 'Inform added Successfully.', 'success');
      this.getAllVisitor();
    })
  }
  viewVisitorDetails(data) {
     
    this.visitorModel = data
  }
  removeVisitor(id){
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete!",
      icon: 'warning',
      showCancelButton: true,
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      confirmButtonText: 'Yes',
      buttonsStyling: false
    }).then((result) => {
      if (result.value == true) {
        this.VisitorService.removeVisitor(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Banners Successfully Removed.', 'success');
          
        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your banner has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
      }
    })
    this.getAllVisitor();
  }
}
