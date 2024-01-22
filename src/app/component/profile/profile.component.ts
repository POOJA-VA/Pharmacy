import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/model/profile';
import { UserDetail } from 'src/app/model/user-detail';
import { ProfileService } from 'src/app/service/profile.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  username: String = '';
  name?: String = '';
  role: String = '';
  error: string = '';
  profileDetails: Profile[] = [];
  userDetails: UserDetail[] = [];

  constructor(
    private profileService: ProfileService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.username = this.storageService.getLoggedInUser().username;
    this.name = this.storageService.getLoggedInUser().name;
    this.role = this.storageService.getLoggedInUser().role;

    let loggedInUser = this.storageService.getLoggedInUser();
    let userId = loggedInUser.id;
    //console.log(userId);

    this.profileService.getAddress(userId).subscribe({
      next: (profileDetails: any) => {
        let newProfile: Profile[] = profileDetails.data.addressList;
        this.profileDetails = newProfile;
      },
    });
  }

  deleteAddress(deleteId:number){
    this.profileService.deleteAddress(deleteId).subscribe((response)=>console.log(response)
    )
    
  }
  onSubmit() {}
}