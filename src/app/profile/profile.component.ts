import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/api.service';
import { Profile } from './profile.model';
import { ProfileService } from './profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public profileModel: Profile = new Profile;
  public addProfileModel: Profile = new Profile;
  public profile: Profile[] = [];
  openMember: boolean = false;
  constructor(
    private profileService: ProfileService,
    private apiService: ApiService
  ) {
    this.getProfileDetails();
    this.getAllAdminList();
  }

  ngOnInit(): void {
  }
  getProfileDetails() {
    this.profileService.getProfileList(localStorage.getItem('UserId')).subscribe((data: any) => {
      this.profileModel = data[0];
      debugger
    });
  }
  updateProfile() {
    this.profileService.updateProfileData(this.profileModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Profile updated Successfully.', 'success');
    })
  }
  addMembers() {
    this.openMember = true;
  }
  addNewMembers() {
    debugger
    this.addProfileModel.isactive = true;
    this.addProfileModel.role='Sub-Admin';
    this.profileService.saveNewTeamMembers(this.addProfileModel).subscribe((data: any) => {
      this.profile = data;
      this.apiService.showNotification('top', 'right', 'Added New Member Successfully.', 'success');
      this.getAllAdminList();
    })
  }
  getAllAdminList() {
    this.profileService.getAllSubAdminList().subscribe((data: any) => {
      this.profile = data;
      debugger
    });
  }
}
