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
  public profile: Profile[] = [];
  constructor(
    private profileService: ProfileService,
    private apiService: ApiService
  ) {
    this.getProfileDetails();
  }

  ngOnInit(): void {
  }
  getProfileDetails() {
    this.profileService.getProfileList(localStorage.getItem('AdminId')).subscribe((data: any) => {
      this.profileModel = data[0];
    });
  }
  updateProfile() {
    this.profileService.updateProfileData(this.profileModel).subscribe((req) => {
      this.apiService.showNotification('top', 'right', 'Profile updated Successfully.', 'success');
    })
  }

}
