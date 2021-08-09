import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { Hobby, UserInterface } from '../user-form/user.interface';

@Component({
  selector: 'app-user-form-evaluation',
  templateUrl: './user-form-evaluation.component.html',
  styleUrls: ['./user-form-evaluation.component.scss']
})
export class UserFormEvaluationComponent implements OnInit {
  evalForm!: FormGroup;
  hasEditor = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly formDataService: FormDataService,
  ) { }

  ngOnInit(): void {
    this.getText()
    this.evalForm = this.fb.group({ text: [this.getText()] })
  }
  getText() {
    const userData = this.formDataService.data as UserInterface;
    return `Az én nevem ${userData.name} és ${userData.gender} vagyok ${new Date(userData.birthDate).getFullYear()}-ben születtem, kedvenc hobbi${userData.hobbies.length > 1 ? 'jai' : ''}m a ${this.getHobbiesText(userData.hobbies)}.`
  }

  getHobbiesText(hobbies: Hobby[]) {
    const hobbiesList = hobbies.map((hobby) => {
      return hobby.name === "egyéb" ? hobby.value : hobby.name
    })
    return hobbiesList.join(', ')
  }
  toggleEditor() {
    this.hasEditor = !this.hasEditor
  }
}
