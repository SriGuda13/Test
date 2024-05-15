import { Component, OnInit } from '@angular/core';
import { ProfileServiceService } from '../../services/profile-service.service';
import { Profile } from '../../models/profileModel';
import { response } from 'express';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile-component',
  standalone: true,
  imports: [],
  templateUrl: './profile-component.component.html',
  styleUrl: './profile-component.component.css'
})
export class ProfileComponentComponent implements OnInit {

  profiles: Profile[] = [];
  profileForm: FormGroup;

  constructor(private profileService: ProfileServiceService,private formBuilder: FormBuilder) {
    //Initialize the form with validators
    this.profileForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      lastName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]*$')]],
      technology: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]*$')]],
      noOfYearsOfExperience: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    })
    }

  ngOnInit(): void {
    this.getProfiles()    
  }

  getProfiles(): void{
    this.profileService.getProfiles().subscribe(profiles => {
      this.profiles = profiles;
      console.log(profiles);
    })
  }

  getProfileById(id: number): void {
    this.profileService.getProfileById(id).subscribe(profile => {
      console.log(profile)
    })
  }

  addProfile(): void {
    //Mark all fields as touched to trigger validation
    Object.values(this.profileForm.controls).forEach(controls => {
      controls.markAsTouched();
    })

    //Check if the form is valid
    if(this.profileForm.valid){
      //Extract profile data from the form
      const profileData: Profile = this.profileForm.value;

      //Call the addProfile method from the service
      this.profileService.addProfile(profileData).subscribe(response => {
        console.log('Profile added Successfully', response);
        //Reload profiles after adding thye new one
        this.getProfiles();
        //Resest Form
        this.profileForm.reset({
          id: 0,
          firstName: '',
          lastName: '',
          technology: '',
          noOfYearsExperience: 0
        });
      });
    }
  }
}
