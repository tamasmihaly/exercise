import { Component, OnInit, Sanitizer } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
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
  downloadJsonHref: SafeUrl = "";

  constructor(
    private readonly fb: FormBuilder,
    private readonly formDataService: FormDataService,
    private readonly sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.getText()
    this.evalForm = this.fb.group({ text: [this.getText()] })
  }
  getText() {
    const userData = this.formDataService.data as UserInterface;
    return `Az én nevem ${userData.name} és ${userData.gender} vagyok ${new Date(userData.birthDate).getFullYear()}-ben születtem, kedvenc hobbi${userData.hobbies.length > 1 ? 'ai' : ''}m a ${this.getHobbiesText(userData.hobbies)}.`
  }

  getHobbiesText(hobbies: Hobby[]) {
    const hobbiesList = hobbies.map((hobby) => {
      return hobby.name === "egyéb" ? hobby.value : hobby.name
    })
    return hobbiesList.join(', ')
  }
  toggleEditor() {
    this.hasEditor = !this.hasEditor
    this.evalForm.get('text')?.updateValueAndValidity;
    console.log("🚀 ~ file: user-form-evaluation.component.ts ~ line 35 ~ UserFormEvaluationComponent ~ toggleEditor ~ this.evalForm.get('text')", this.evalForm.get('text')?.value)
  }

  generateDownloadJsonUri() {
    var json = JSON.stringify(this.evalForm.get('text')?.value);
    var uri = this.sanitizer.bypassSecurityTrustResourceUrl("data:text/json;charset=UTF-8," + encodeURIComponent(json));
    console.log("🚀 ~ file: user-form-evaluation.component.ts ~ line 47 ~ UserFormEvaluationComponent ~ generateDownloadJsonUri ~ uri", uri)
    this.downloadJsonHref = uri;
  }
}
