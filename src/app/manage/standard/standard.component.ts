import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { data } from 'jquery';
import Swal from 'sweetalert2';
import { ManageService } from '../manage.service';
import { Std } from './standard.model';
declare var require: any
declare var $: any;

declare interface DataTable {
  headerRow: string[];
  footerRow: string[];
  dataRows: any[];
}
@Component({
  selector: 'app-standard',
  templateUrl: './standard.component.html',
  styleUrls: ['./standard.component.css']
})
export class StandardComponent implements OnInit {
  public StdModel: Std = new Std;
  public STD: Std[] = [];
  public editStd: Std[] = [];
  public standardTable: DataTable;
  islist: boolean;
  constructor(
    private manageService: ManageService,
    private apiService: ApiService) {
    this.getStdList();
  }

  ngOnInit(): void {

  }


  addStdList() {
    this.StdModel.isactive = true;
    this.manageService.saveStdList(this.StdModel).subscribe((response) => {
      this.apiService.showNotification('top', 'right', 'Standard Added Successfully.', 'success');
      // this.StdModel = {};
      this.getStdList();
      this.islist = false;

    })
  }
  getStdList() {
    this.manageService.getStdList().subscribe((data: any) => {
      this.STD = data;
      this.islist = true;
      for (let i = 0; i < this.STD.length; i++) {
        this.STD[i].index = i + 1;
      }

      // this.StdModel.stdname=null;
    });
  }
  removeStandard(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You want to delete! If you delete Standard than all the subjects and questions will be deleted",
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
        this.manageService.removeStdList(id).subscribe((req) => {
          this.apiService.showNotification('top', 'right', 'Standard removed Successfully.', 'success');

        })
        Swal.fire(
          {
            title: 'Deleted!',
            text: 'Your standard has been deleted.',
            icon: 'success',
            customClass: {
              confirmButton: "btn btn-success",
            },
            buttonsStyling: false
          }
        )
        this.getStdList();
      }
    })

  }
  editStandard(data) {
    this.editStd = data;

  }
  updateStandardList(data) {

    this.manageService.updateStdList(data).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Standard updated Successfully.', 'success');
    })

  }
}
