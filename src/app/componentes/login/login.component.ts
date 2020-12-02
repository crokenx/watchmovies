import { HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
    private router: Router
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitForm() {
    const resultado = this.http.login({
      email: this.form.value.username,
      password: this.form.value.password,
    });
    resultado.subscribe((token) => {
      localStorage.setItem('token', token.token);
      const resultado = this.http.me();
      resultado.subscribe((user) =>
        localStorage.setItem('user', JSON.stringify(user))
      );
      this.router.navigate(['home']);
    });
  }
}
