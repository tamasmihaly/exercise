import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormDataService } from '../form-data.service';
import { UserInterface } from './user.interface';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  userForm!: FormGroup;
  userEntity: UserInterface;
  hasOther: boolean = false;
  showSidenav: boolean = false;
  hobbiesList: string[] = ['biciklizés', 'sátorozás', 'grillezés', 'sütés', 'egyéb']

  constructor(
    private readonly fb: FormBuilder,
    private readonly formDataService: FormDataService,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar) {
    this.userEntity = this.formDataService.data;
  }

  public ngOnInit(): void {
    this.initForm(this.userEntity);
    this.loadOtherState();
    this.userForm.get('hobbies')?.valueChanges.subscribe(
      data => {
        const otherControl = this.userForm.get('other');
        if (data.indexOf('egyéb') > -1) {
          this.hasOther = true;
          otherControl?.setValidators(Validators.required);

        } else {
          this.hasOther = false;
          otherControl?.setValidators(null)
        }
        otherControl?.updateValueAndValidity()
      }

    )
  }

  private initForm(entity: UserInterface): void {
    this.userForm = this.fb.group({
      name: [entity?.name, Validators.required],
      other: [entity?.other, entity?.other ? Validators.required : null],
      email: [entity?.email, [Validators.required, Validators.email]],
      birthDate: [new Date(entity?.birthDate), Validators.required],
      gender: [entity?.gender, Validators.required],
      hobbies: [entity?.hobbies.map(hobby => hobby.name), Validators.required],
    })

  }

  public getFormData(): void {
    const form: FormGroup = this.userForm;
    const data: UserInterface = {
      name: form.get('name')?.value,
      email: form.get('email')?.value,
      birthDate: form.get('birthDate')?.value?.getTime(),
      gender: form.get('gender')?.value,
      hobbies: (form.get('hobbies')?.value as string[]).map(hobby => {
        return {
          name: hobby,
          value: hobby === 'egyéb' ? form.get('other')?.value : null
        }
      }),
      other: form.get('other')?.value
    }
    this.formDataService.setData(data);
    this.snackBar.open('Elmentve', 'Bezár', { duration: 2000 });
    this.router.navigate(['/user-form/evaluation'])
  }

  loadOtherState() {
    this.hasOther = this.userForm?.get('hobbies')?.value.indexOf('egyéb') > -1
  }

}
