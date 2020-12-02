import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../../servicios/http.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css'],
})
export class BuscadorComponent implements OnInit {
  peliculas: {}[] = [];
  total: number = 5;
  constructor(
    private router: Router,
    private params: ActivatedRoute,
    private http: HttpService
  ) {}

  ngOnInit(): void {
    this.peliculas = [];
    let buscar: string;
    this.params.paramMap.subscribe((params) => {
      buscar = params.get('pelicula');
      this.peliculas = this.http.buscarPelicula(buscar);
    });
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
