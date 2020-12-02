import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../servicios/http.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {


  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpService,
  ) {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    const resultado = this.http.register({ email: this.form.value.username, password: this.form.value.password });
    resultado.subscribe(x => console.log(x));
  }

}
