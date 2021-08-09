import { Injectable } from '@angular/core';
import { UserInterface } from './user-form/user.interface';
import * as data from './data.json'

@Injectable({
  providedIn: 'root'
})
export class FormDataService {
  private formData!: UserInterface;;

  constructor() { }

  public get data(): UserInterface {

    return this.formData ? this.formData : data as UserInterface;
  }

  public setData(data: UserInterface) {
    this.formData = data;
  }
}
