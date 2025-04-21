import { Component } from '@angular/core';
import { DataUtils } from '@shared/utils/data.utils';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage {
  constructor() {
    const data = DataUtils.formatDate(new Date());
    console.log(data);
  }
}
