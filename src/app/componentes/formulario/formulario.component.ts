import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpService } from '../../servicios/http.service';
//librerias externas
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css'],
})
export class FormularioComponent implements OnInit {
  peliculas: Object;
  form: FormGroup;
  isRated: boolean = false;
  total: number = 5;

  constructor(private fb: FormBuilder, private http: HttpService) {
    this.form = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
      duracion: ['', Validators.required],
      categorias: ['', Validators.required],
      trailer: ['', Validators.required],
      estreno: ['', Validators.required],
      imagen: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const peliculas = this.http.getPeliculas();
    peliculas.subscribe((respuesta) => {
      this.peliculas = respuesta;
    });
  }

  submitForm() {
    const form = new FormData();
    const user = JSON.parse(localStorage.getItem('user'));

    const formulario = () => {
      return new Promise((resolve, reject) => {
        for (let [index, [key, value]] of Object.entries(
          Object.entries(this.form.value)
        )) {
          form.append(key, this.form.value[key]);
          if (parseInt(index) == Object.keys(this.form.value).length - 1) {
            resolve();
          }
        }
      });
    };

    const image = () => {
      return new Promise((resolve, reject) => {
        if (
          (<HTMLInputElement>document.getElementById('image')).files.length == 0
        ) {
          resolve(console.log('sin imagen'));
        } else if (
          (<HTMLInputElement>document.getElementById('image')).files.length > 0
        ) {
          form.append(
            'image',
            (<HTMLInputElement>document.getElementById('image')).files[0]
          );
          resolve(console.log('si tiene imagen'));
        }
        // resolve(this.form.addControl('image', new FormControl((<HTMLInputElement>document.getElementById('image')).files[0])));
      });
    };

    formulario()
      .then(() => {
        image();
      })
      .then(() => {
        this.http.agregarPelicula(form).subscribe((respuesta) => {
          const peliculas = this.http.getPeliculas();
          peliculas.subscribe((respuesta) => {
            this.peliculas = respuesta;
          });
        });
      });
  }

  rating(event: number, _id: string) {
    //ingresar el rating de la pelicual a base de datos en mongo db
    console.log('valor rating', event, _id);
    this.isRated = !this.isRated;
  }

  onRate(
    $event: {
      oldValue: number;
      newValue: number;
      starRating: StarRatingComponent;
    },
    _id: string
  ) {
    console.log('evento completo', $event, _id);
    //alert(`Old Value:${$event.oldValue},
    //New Value: ${$event.newValue},
    //Checked Color: ${$event.starRating.checkedcolor},
    //Unchecked Color: ${$event.starRating.uncheckedcolor}`);
    this.http
      .ratingPelicula($event.newValue, _id)
      .subscribe((response) => console.log(response));
  }
}
